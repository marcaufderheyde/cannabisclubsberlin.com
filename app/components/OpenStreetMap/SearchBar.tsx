'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ClubCard.module.css';
import { Club } from './OpenStreetMap';

interface SearchBarProps {
    clubs: Club[];
    onClubSelect: (clubIndex: number) => void;
    placeholder?: string;
}

interface SearchResult {
    item: Club;
    refIndex: number;
    score: number;
    matches: Array<{
        field: string;
        indices: Array<[number, number]>;
        value: string;
    }>;
}

// Custom fuzzy search implementation
class CustomFuzzySearch {
    private items: Club[];
    private keys: Array<{ name: string; weight: number }>;
    private threshold: number;
    private minMatchCharLength: number;

    constructor(items: Club[], options: {
        keys: Array<{ name: string; weight: number }>;
        threshold: number;
        minMatchCharLength: number;
    }) {
        this.items = items;
        this.keys = options.keys;
        this.threshold = options.threshold;
        this.minMatchCharLength = options.minMatchCharLength;
    }

    search(pattern: string): SearchResult[] {
        if (!pattern.trim() || pattern.length < this.minMatchCharLength) {
            return [];
        }

        const results: SearchResult[] = [];
        const patternLower = pattern.toLowerCase();

        this.items.forEach((item, index) => {
            let totalScore = 0;
            let totalWeight = 0;
            const matches: SearchResult['matches'] = [];

            this.keys.forEach(({ name, weight }) => {
                const fieldValue = (item as any)[name] || '';
                const fieldScore = this.calculateFieldScore(patternLower, fieldValue.toLowerCase());
                
                if (fieldScore > 0) {
                    const indices = this.findMatchIndices(patternLower, fieldValue.toLowerCase());
                    matches.push({
                        field: name,
                        indices,
                        value: fieldValue
                    });
                    
                    totalScore += fieldScore * weight;
                    totalWeight += weight;
                }
            });

                            if (totalWeight > 0) {
                    const averageScore = totalScore / totalWeight;
                    
                    if (averageScore >= this.threshold) {
                        results.push({
                            item,
                            refIndex: index,
                            score: 1 - averageScore, // Invert for sorting (lower is better)
                            matches
                        });
                    }
                }
        });

        // Sort by score (higher is better, but score is inverted so lower is better)
        return results.sort((a, b) => a.score - b.score);
    }

    private calculateFieldScore(pattern: string, text: string): number {
        if (!text) return 0;
        
        // Exact match gets highest score
        if (text === pattern) return 1.0;
        
        // Check if text starts with pattern - extremely high priority
        if (text.startsWith(pattern)) return 0.98;
        
        // Check if text contains pattern as substring - high priority  
        if (text.includes(pattern)) return 0.9;
        
        // For fuzzy matching, be much more strict
        const fuzzyScore = this.fuzzyMatchScore(pattern, text);
        return fuzzyScore >= 0.6 ? fuzzyScore * 0.4 : 0;
    }

    private fuzzyMatchScore(pattern: string, text: string): number {
        if (pattern.length === 0) return 1;
        if (text.length === 0) return 0;
        
        // For very short patterns, require exact substring match
        if (pattern.length <= 3) {
            return text.includes(pattern) ? 0.8 : 0;
        }
        
        // Calculate sequential character matching score
        let matchedChars = 0;
        let patternIndex = 0;
        
        for (let textIndex = 0; textIndex < text.length && patternIndex < pattern.length; textIndex++) {
            if (text[textIndex] === pattern[patternIndex]) {
                matchedChars++;
                patternIndex++;
            }
        }
        
        // Only consider sequential matches, require at least 80% of characters to be found in order
        const sequentialScore = matchedChars / pattern.length;
        return sequentialScore >= 0.8 ? sequentialScore : 0;
    }

    private findMatchIndices(pattern: string, text: string): Array<[number, number]> {
        const indices: Array<[number, number]> = [];
        let lastIndex = 0;
        
        // First, try to find exact pattern match
        let index = text.indexOf(pattern, lastIndex);
        if (index !== -1) {
            indices.push([index, index + pattern.length - 1]);
            return indices;
        }
        
        // If no exact match, find individual character matches
        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            const charIndex = text.indexOf(char, lastIndex);
            if (charIndex !== -1) {
                indices.push([charIndex, charIndex]);
                lastIndex = charIndex + 1;
            }
        }
        
        return indices;
    }
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    clubs, 
    onClubSelect, 
    placeholder = "Search clubs..." 
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [customSearch, setCustomSearch] = useState<CustomFuzzySearch | null>(null);
    
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initialize custom fuzzy search
    useEffect(() => {
        const searchOptions = {
            keys: [
                { name: 'name', weight: 0.7 },
                { name: 'description', weight: 0.3 }
            ],
            threshold: 0.7, // Stricter threshold to filter out weak matches
            minMatchCharLength: 1, // Show results after just 1 character
        };
        
        const searchInstance = new CustomFuzzySearch(clubs, searchOptions);
        setCustomSearch(searchInstance);
    }, [clubs]);

    // Perform search when search term changes
    useEffect(() => {
        if (!customSearch || !searchTerm.trim()) {
            setSearchResults([]);
            setIsDropdownVisible(false);
            setSelectedIndex(-1);
            return;
        }

        const results = customSearch.search(searchTerm).slice(0, 3); // Top 3 results
        setSearchResults(results);
        setIsDropdownVisible(results.length > 0);
        setSelectedIndex(-1);
    }, [searchTerm, customSearch]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isDropdownVisible || searchResults.length === 0) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setSelectedIndex(prev => 
                    prev < searchResults.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                event.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                event.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
                    handleClubSelect(searchResults[selectedIndex].refIndex);
                } else if (searchResults.length > 0) {
                    handleClubSelect(searchResults[0].refIndex);
                }
                break;
            case 'Escape':
                setIsDropdownVisible(false);
                setSelectedIndex(-1);
                searchInputRef.current?.blur();
                break;
        }
    }, [isDropdownVisible, searchResults, selectedIndex]);

    const handleClubSelect = (clubIndex: number) => {
        setSearchTerm('');
        setIsDropdownVisible(false);
        setSelectedIndex(-1);
        onClubSelect(clubIndex);
        searchInputRef.current?.blur();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleInputFocus = () => {
        if (searchResults.length > 0) {
            setIsDropdownVisible(true);
        }
    };

    const handleInputBlur = () => {
        // Delay hiding dropdown to allow for click on results
        setTimeout(() => {
            setIsDropdownVisible(false);
            setSelectedIndex(-1);
        }, 200);
    };

    const highlightMatch = (text: string, matches: SearchResult['matches'], field: string): string => {
        const match = matches.find(m => m.field === field);
        if (!match || match.indices.length === 0) return text;
        
        let result = '';
        let lastIndex = 0;
        
        // Sort indices by start position
        const sortedIndices = match.indices.sort((a, b) => a[0] - b[0]);
        
        sortedIndices.forEach(([start, end]) => {
            result += text.slice(lastIndex, start);
            result += `<mark class="${styles.searchHighlight}">${text.slice(start, end + 1)}</mark>`;
            lastIndex = end + 1;
        });
        
        result += text.slice(lastIndex);
        return result;
    };

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchInputContainer}>
                <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder={placeholder}
                    className={styles.searchInput}
                />
                <div className={styles.searchIcon}>🔍</div>
            </div>
            
            {isDropdownVisible && (
                <div ref={dropdownRef} className={styles.searchDropdown}>
                    {searchResults.map((result, index) => (
                        <div
                            key={result.item.slug}
                            className={`${styles.searchResultItem} ${
                                index === selectedIndex ? styles.searchResultSelected : ''
                            }`}
                            onClick={() => handleClubSelect(result.refIndex)}
                            onMouseEnter={() => setSelectedIndex(index)}
                        >
                            <div className={styles.searchResultName}>
                                <span 
                                    dangerouslySetInnerHTML={{ 
                                        __html: highlightMatch(
                                            result.item.name, 
                                            result.matches, 
                                            'name'
                                        ) 
                                    }}
                                />
                            </div>
                            {/* <div className={styles.searchResultDescription}>
                                <span 
                                    dangerouslySetInnerHTML={{ 
                                        __html: highlightMatch(
                                            result.item.description || '', 
                                            result.matches, 
                                            'description'
                                        ) 
                                    }}
                                />
                            </div> */}
                            {/* <div className={styles.searchResultScore}>
                                Match: {Math.round((1 - result.score) * 100)}%
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 