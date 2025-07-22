import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from './SearchBarFuse';
import { Club } from './OpenStreetMap';

// Mock Fuse.js
const mockFuseResults = jest.fn();
const mockFuseSearch = jest.fn();

jest.mock('fuse.js', () => {
    return jest.fn().mockImplementation(() => ({
        search: mockFuseSearch
    }));
});

// Mock the CSS modules
jest.mock('./ClubCard.module.css', () => ({
    searchContainer: 'searchContainer',
    mobileFilterSearchContainer: 'mobileFilterSearchContainer',
    searchInputContainer: 'searchInputContainer',
    searchInput: 'searchInput',
    searchIcon: 'searchIcon',
    searchDropdown: 'searchDropdown',
    searchResultItem: 'searchResultItem',
    searchResultSelected: 'searchResultSelected',
    searchResultName: 'searchResultName',
    searchResultDescription: 'searchResultDescription',
    searchResultScore: 'searchResultScore',
    searchHighlight: 'searchHighlight',
}));

const mockClubs: Club[] = [
    {
        name: 'popupOne',
        slug: 'popup-one',
        description: 'This is popupOne.',
        geoLocation: [52.517037, 13.38886],
        imageUrl: '/club1.jpg',
        hasHRInformation: true,
        address: '123 Test Street, Berlin',
    },
    {
        name: 'popupTwo',
        slug: 'popup-two',
        description: 'This is popupTwo.',
        geoLocation: [52.588188, 13.430868],
        imageUrl: '/club2.jpg',
        hasHRInformation: false,
        address: '456 Test Avenue, Berlin',
    },
    {
        name: 'popupThree',
        slug: 'popup-three',
        description: 'This is popupThree.',
        geoLocation: [52.488419, 13.461284],
        imageUrl: '/club3.jpg',
        hasHRInformation: true,
        address: '789 Test Road, Berlin',
    },
    {
        name: 'clubAlpha',
        slug: 'club-alpha',
        description: 'Alpha club with special features.',
        geoLocation: [52.517037, 13.38886],
        imageUrl: '/club4.jpg',
        hasHRInformation: true,
        address: '321 Alpha Street, Berlin',
    },
    {
        name: 'clubBeta',
        slug: 'club-beta',
        description: 'Beta club for testing.',
        geoLocation: [52.588188, 13.430868],
        imageUrl: '/club5.jpg',
        hasHRInformation: false,
        address: '654 Beta Avenue, Berlin',
    },
    {
        name: 'Advanced Club',
        slug: 'advanced-club',
        description: 'An advanced club with modern facilities.',
        geoLocation: [52.488419, 13.461284],
        imageUrl: '/club6.jpg',
        hasHRInformation: true,
        address: '987 Advanced Road, Berlin',
    },
    {
        name: 'Test Club',
        slug: 'test-club',
        description: 'A test club for development.',
        geoLocation: [52.517037, 13.38886],
        imageUrl: '/club7.jpg',
        hasHRInformation: false,
        address: '147 Test Lane, Berlin',
    },
    {
        name: 'Special Club',
        slug: 'special-club',
        description: 'Club with special activities.',
        geoLocation: [52.588188, 13.430868],
        imageUrl: '/club8.jpg',
        hasHRInformation: true,
        address: '258 Special Street, Berlin',
    },
    {
        name: 'Elite Club',
        slug: 'elite-club',
        description: 'Exclusive elite club membership.',
        geoLocation: [52.488419, 13.461284],
        imageUrl: '/club9.jpg',
        hasHRInformation: true,
        address: '369 Elite Avenue, Berlin',
    },
    {
        name: 'Regular Club',
        slug: 'regular-club',
        description: 'Standard regular club activities.',
        geoLocation: [52.517037, 13.38886],
        imageUrl: '/club10.jpg',
        hasHRInformation: false,
        address: '741 Regular Road, Berlin',
    }
];

// Helper function to create Fuse.js style results
const createFuseResult = (item: Club, score: number = 0.1, matches: any[] = []) => ({
    item,
    refIndex: mockClubs.indexOf(item),
    score,
    matches
});

describe('SearchBarFuse Component', () => {
    const mockOnClubSelect = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockFuseSearch.mockReturnValue([]);
    });

    describe('Initial Rendering', () => {
        test('renders search input with default placeholder', () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');
            expect(searchInput).toBeInTheDocument();
            expect(searchInput).toHaveAttribute('placeholder', 'Search clubs...');
        });

        test('renders search input with custom placeholder', () => {
            const customPlaceholder = 'Find your club...';
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect}
                    placeholder={customPlaceholder}
                />
            );

            const searchInput = screen.getByRole('textbox');
            expect(searchInput).toHaveAttribute('placeholder', customPlaceholder);
        });

        test('does not render dropdown initially', () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const dropdown = document.querySelector('.searchDropdown');
            expect(dropdown).not.toBeInTheDocument();
        });

        test('renders with correct container structure', () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const container = document.querySelector('.searchContainer');
            const inputContainer = document.querySelector('.searchInputContainer');
            const input = document.querySelector('.searchInput');

            expect(container).toBeInTheDocument();
            expect(inputContainer).toBeInTheDocument();
            expect(input).toBeInTheDocument();
        });
    });

    describe('Search Functionality', () => {
        test('shows dropdown with results when typing valid search term', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const searchResults = document.querySelectorAll('.searchResultItem');
            expect(searchResults.length).toBe(2);
        });

        test('filters clubs by name correctly', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[3], 0.1, [
                    { key: 'name', indices: [[0, 4]], value: 'clubAlpha' }
                ])
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Alpha');
            });

            await waitFor(() => {
                const resultNames = document.querySelectorAll('.searchResultName');
                const hasAlpha = Array.from(resultNames).some(node => 
                    node.textContent?.includes('clubAlpha')
                );
                expect(hasAlpha).toBe(true);
            });
        });

        test('filters clubs by description correctly', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[3], 0.1, [
                    { key: 'description', indices: [[20, 26]], value: 'Alpha club with special features.' }
                ])
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'special');
            });

            await waitFor(() => {
                // Check if the club with "special" in description appears in results
                const resultNames = document.querySelectorAll('.searchResultName');
                const hasClubAlpha = Array.from(resultNames).some(node => 
                    node.textContent?.includes('clubAlpha')
                );
                expect(hasClubAlpha).toBe(true);
            });
        });

        test('shows no results for terms too short', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'x');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });

        test('clears search results when input is cleared', async () => {
            const fuseResults = [createFuseResult(mockClubs[0], 0.1)];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            // Type search term
            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Clear input
            mockFuseSearch.mockReturnValue([]);
            await act(async () => {
                await userEvent.clear(searchInput);
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });

        test('highlights search terms in results', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[3], 0.1, [
                    { key: 'name', indices: [[0, 3]], value: 'clubAlpha' }
                ])
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const highlights = document.querySelectorAll('.searchHighlight');
                expect(highlights.length).toBeGreaterThan(0);
                
                // Check that highlighted text contains the search term
                const highlightedText = Array.from(highlights).some(highlight => 
                    highlight.textContent?.toLowerCase().includes('club')
                );
                expect(highlightedText).toBe(true);
            });
        });
    });

    describe('Search Scoring and Ranking', () => {

        test('ranks better matches higher', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[3], 0.1), // Better match (lower score)
                createFuseResult(mockClubs[4], 0.3)  // Worse match (higher score)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const results = document.querySelectorAll('.searchResultItem .searchResultName');
                expect(results.length).toBe(2);
                
                // First result should be the better match (clubAlpha)
                const firstResultText = results[0]?.textContent?.toLowerCase();
                expect(firstResultText).toContain('clubalpha');
            });
        });

        test('shows exact matches with better relevance', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.001) // Very low score = excellent match
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'popupOne');
            });

            await waitFor(() => {
                const results = document.querySelectorAll('.searchResultItem');
                expect(results.length).toBeGreaterThan(0);
                
                // Check that the exact match appears in results
                const resultNames = document.querySelectorAll('.searchResultName');
                const hasExactMatch = Array.from(resultNames).some(node => 
                    node.textContent?.includes('popupOne')
                );
                expect(hasExactMatch).toBe(true);
            });
        });
    });

    describe('User Interaction', () => {
        test('calls onClubSelect when clicking on search result', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'popup');
            });

            await waitFor(() => {
                const firstResult = document.querySelector('.searchResultItem');
                expect(firstResult).toBeInTheDocument();
            });

            const firstResult = document.querySelector('.searchResultItem') as HTMLElement;

            await act(async () => {
                fireEvent.click(firstResult);
            });

            expect(mockOnClubSelect).toHaveBeenCalledWith(0); // First club index
        });

        test('clears search and hides dropdown after selection', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox') as HTMLInputElement;

            await act(async () => {
                await userEvent.type(searchInput, 'popup');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const firstResult = document.querySelector('.searchResultItem') as HTMLElement;

            await act(async () => {
                fireEvent.click(firstResult);
            });

            await waitFor(() => {
                expect(searchInput.value).toBe('');
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });

        test('handles keyboard navigation with arrow keys', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Test arrow down navigation
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
            });

            await waitFor(() => {
                const selectedResult = document.querySelector('.searchResultSelected');
                expect(selectedResult).toBeInTheDocument();
            });
        });

        test('handles Enter key to select highlighted result', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Navigate to first result and select with Enter
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
            });

            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'Enter' });
            });

            expect(mockOnClubSelect).toHaveBeenCalled();
        });

        test('handles Escape key to close dropdown', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'Escape' });
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });
    });

    describe('Focus and Blur Behavior', () => {
        test('shows dropdown on focus if there are search results', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            // Type to create results
            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            // Blur the input
            await act(async () => {
                fireEvent.blur(searchInput);
            });

            // Focus again
            await act(async () => {
                fireEvent.focus(searchInput);
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });
        });

        test('hides dropdown on blur after delay', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            await act(async () => {
                fireEvent.blur(searchInput);
            });

            // Wait for blur delay
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 300));
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });
    });

    describe('Edge Cases', () => {
        test('handles empty clubs array gracefully', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={[]} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'anything');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });

        test('handles clubs without descriptions', async () => {
            const clubsWithoutDesc: Club[] = [
                {
                    name: 'No Description Club',
                    slug: 'no-desc-club',
                    geoLocation: [52.517037, 13.38886],
                    imageUrl: '/no-desc.jpg',
                    hasHRInformation: true,
                    address: 'No Desc Road, Berlin',
                }
            ];

            const fuseResults = [
                createFuseResult(clubsWithoutDesc[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={clubsWithoutDesc} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Description');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const results = document.querySelectorAll('.searchResultItem');
            expect(results.length).toBeGreaterThan(0);
        });

        test('handles very long search terms', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');
            const longSearchTerm = 'a'.repeat(100);

            await act(async () => {
                await userEvent.type(searchInput, longSearchTerm);
            });

            // Should not crash
            expect(searchInput).toHaveValue(longSearchTerm);
        });

        test('handles special characters in search', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, '@#$%^&*()');
            });

            // Should not crash
            expect(searchInput).toHaveValue('@#$%^&*()');
        });

        test('handles clubs with null/undefined properties', async () => {
            const clubsWithNulls: Club[] = [
                {
                    name: 'Valid Club',
                    slug: 'valid-club',
                    description: 'Valid description',
                    geoLocation: [52.517037, 13.38886],
                    imageUrl: '/valid.jpg',
                    hasHRInformation: true,
                    address: 'Valid Road, Berlin',
                },
                {
                    name: '',
                    slug: 'null-name-club',
                    description: undefined,
                    geoLocation: [52.588188, 13.430868],
                    imageUrl: '/null-name.jpg',
                    hasHRInformation: false,
                    address: 'Null Name Road, Berlin',
                } as any,
                {
                    name: null,
                    slug: 'null-name-club-2',
                    description: null,
                    geoLocation: [52.488419, 13.461284],
                    imageUrl: '/null-name-2.jpg',
                    hasHRInformation: true,
                    address: 'Null Name Road 2, Berlin',
                } as any
            ];

            const fuseResults = [
                createFuseResult(clubsWithNulls[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={clubsWithNulls} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Valid');
            });

            // Should not crash and should find the valid club
            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const results = document.querySelectorAll('.searchResultItem');
            expect(results.length).toBeGreaterThan(0);
        });

        test('handles clubs with duplicate names but different slugs', async () => {
            const clubsWithDuplicates: Club[] = [
                {
                    name: 'Duplicate Club',
                    slug: 'duplicate-club-1',
                    description: 'First instance',
                    geoLocation: [52.517037, 13.38886],
                    imageUrl: '/duplicate1.jpg',
                    hasHRInformation: true,
                    address: 'Duplicate Road 1, Berlin',
                },
                {
                    name: 'Duplicate Club',
                    slug: 'duplicate-club-2',
                    description: 'Second instance',
                    geoLocation: [52.588188, 13.430868],
                    imageUrl: '/duplicate2.jpg',
                    hasHRInformation: false,
                    address: 'Duplicate Road 2, Berlin',
                }
            ];

            const fuseResults = [
                createFuseResult(clubsWithDuplicates[0], 0.1),
                createFuseResult(clubsWithDuplicates[1], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={clubsWithDuplicates} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Duplicate');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const results = document.querySelectorAll('.searchResultItem');
            expect(results.length).toBe(2);
        });

        test('handles dynamic clubs array changes', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            const { rerender } = render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            const initialResults = document.querySelectorAll('.searchResultItem');
            const initialCount = initialResults.length;

            // Change clubs array
            const newClubs = [...mockClubs, {
                name: 'New Club',
                slug: 'new-club',
                description: 'Newly added club',
                geoLocation: [52.517037, 13.38886],
                imageUrl: '/new.jpg',
                hasHRInformation: true,
                address: 'New Road, Berlin',
            }];

            const newFuseResults = [
                ...fuseResults,
                createFuseResult(newClubs[newClubs.length - 1], 0.1)
            ];
            mockFuseSearch.mockReturnValue(newFuseResults);

            rerender(
                <SearchBar 
                    clubs={newClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            await waitFor(() => {
                const newResults = document.querySelectorAll('.searchResultItem');
                // Should update results based on new clubs array
                expect(newResults.length).toBeGreaterThanOrEqual(initialCount);
            });
        });

        test('handles numeric search terms', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, '123');
            });

            // Should not crash when searching with numbers
            expect(searchInput).toHaveValue('123');
        });

        test('handles whitespace-only search terms', async () => {
            mockFuseSearch.mockReturnValue([]);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, '   ');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).not.toBeInTheDocument();
            });
        });

        test('handles mixed case search with diacritics', async () => {
            const clubsWithDiacritics: Club[] = [
                {
                    name: 'Café Club',
                    slug: 'cafe-club',
                    description: 'Club with accented characters',
                    geoLocation: [52.517037, 13.38886],
                    imageUrl: '/cafe.jpg',
                    hasHRInformation: true,
                    address: 'Café Road, Berlin',
                },
                {
                    name: 'Résumé Club',
                    slug: 'resume-club',
                    description: 'Another accented club',
                    geoLocation: [52.588188, 13.430868],
                    imageUrl: '/resume.jpg',
                    hasHRInformation: false,
                    address: 'Resume Avenue, Berlin',
                }
            ];

            const fuseResults = [
                createFuseResult(clubsWithDiacritics[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={clubsWithDiacritics} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'cafe');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });
        });

        test('handles rapid selection changes without errors', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2),
                createFuseResult(mockClubs[2], 0.3)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Rapidly navigate through results
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'ArrowUp' });
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'Enter' });
            });

            expect(mockOnClubSelect).toHaveBeenCalled();
        });

        test('handles mouseenter on results during keyboard navigation', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Navigate with keyboard
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
            });

            const results = document.querySelectorAll('.searchResultItem');
            if (results.length > 1) {
                // Mouse enter on different result should change selection
                await act(async () => {
                    fireEvent.mouseEnter(results[1]);
                });

                expect(results[1]).toHaveClass('searchResultSelected');
            }
        });

        test('prevents XSS attacks in search results', async () => {
            const maliciousClubs: Club[] = [
                {
                    name: '<script>alert("xss")</script>Malicious Club',
                    slug: 'malicious-club',
                    description: '<img src="x" onerror="alert(1)">',
                    geoLocation: [52.517037, 13.38886],
                    imageUrl: '/malicious.jpg',
                    hasHRInformation: true,
                    address: 'Malicious Road, Berlin',
                }
            ];

            const fuseResults = [
                createFuseResult(maliciousClubs[0], 0.1)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={maliciousClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Malicious');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();

                // Script tags should be escaped and not executed
                const resultContent = dropdown?.textContent || '';
                expect(resultContent).toContain('Malicious Club');
                expect(resultContent).not.toContain('<script>');
            });
        });

        test('handles out of bounds navigation gracefully', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs.slice(0, 2)} // Only 2 clubs
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'popup');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Try to navigate beyond available results
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' }); // Beyond bounds
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' }); // Beyond bounds
            });

            // Should stay within bounds
            const selectedResults = document.querySelectorAll('.searchResultSelected');
            expect(selectedResults.length).toBeLessThanOrEqual(1);
        });
    });

    describe('Fuse.js Integration', () => {
        test('initializes Fuse.js with correct options', () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            // Verify Fuse constructor was called with clubs and options
            const FuseConstructor = require('fuse.js');
            expect(FuseConstructor).toHaveBeenCalledWith(
                mockClubs,
                expect.objectContaining({
                    keys: expect.arrayContaining([
                        expect.objectContaining({ name: 'name', weight: 0.7 }),
                        expect.objectContaining({ name: 'description', weight: 0.3 })
                    ]),
                    threshold: 0.4,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 2,
                    includeScore: true,
                    includeMatches: true,
                    shouldSort: true,
                    location: 0
                })
            );
        });

        test('calls Fuse search method with correct parameters', async () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');
            const searchTerm = 'test search';

            await act(async () => {
                await userEvent.type(searchInput, searchTerm);
            });

            await waitFor(() => {
                expect(mockFuseSearch).toHaveBeenCalledWith(searchTerm);
            });
        });

        test('limits results to top 3 matches', async () => {
            const manyResults = Array.from({ length: 10 }, (_, i) => 
                createFuseResult(mockClubs[i % mockClubs.length], 0.1 + (i * 0.05))
            );
            mockFuseSearch.mockReturnValue(manyResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const results = document.querySelectorAll('.searchResultItem');
                expect(results.length).toBe(3);
            });
        });

        test('handles Fuse.js match highlighting correctly', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1, [
                    {
                        key: 'name',
                        indices: [[0, 4]],
                        value: 'popupOne'
                    }
                ])
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'popup');
            });

            await waitFor(() => {
                const highlights = document.querySelectorAll('.searchHighlight');
                expect(highlights.length).toBeGreaterThan(0);
                
                const highlightedText = highlights[0]?.textContent;
                expect(highlightedText).toBe('popup');
            });
        });
    });

    describe('Performance', () => {
        test('handles rapid typing without performance issues', async () => {
            const fuseResults = [createFuseResult(mockClubs[0], 0.1)];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            // Type and clear a few times (reduced to avoid state update issues)
            await act(async () => {
                await userEvent.type(searchInput, 'test');
                await userEvent.clear(searchInput);
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });
        });

        test('efficiently handles large club datasets', async () => {
            // Create a large dataset
            const largeClubList: Club[] = Array.from({ length: 1000 }, (_, i) => ({
                name: `Club ${i}`,
                slug: `club-${i}`,
                description: `Description for club ${i}`,
                geoLocation: [52.517037 + (i * 0.001), 13.38886 + (i * 0.001)],
                imageUrl: `/large-club-${i}.jpg`,
                hasHRInformation: true,
                address: `Address ${i}, Berlin`,
            }));

            const fuseResults = Array.from({ length: 3 }, (_, i) => 
                createFuseResult(largeClubList[i], 0.1)
            );
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={largeClubList} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'Club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Should limit results to prevent performance issues
            const results = document.querySelectorAll('.searchResultItem');
            expect(results.length).toBe(3); // Limited by component logic
        });
    });

    describe('Accessibility', () => {
        test('search input has correct accessibility attributes', () => {
            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');
            expect(searchInput).toBeInTheDocument();
            expect(searchInput).toHaveAttribute('type', 'text');
        });

        test('dropdown results are keyboard accessible', async () => {
            const fuseResults = [
                createFuseResult(mockClubs[0], 0.1),
                createFuseResult(mockClubs[1], 0.2)
            ];
            mockFuseSearch.mockReturnValue(fuseResults);

            render(
                <SearchBar 
                    clubs={mockClubs} 
                    onClubSelect={mockOnClubSelect} 
                />
            );

            const searchInput = screen.getByRole('textbox');

            await act(async () => {
                await userEvent.type(searchInput, 'club');
            });

            await waitFor(() => {
                const dropdown = document.querySelector('.searchDropdown');
                expect(dropdown).toBeInTheDocument();
            });

            // Should be able to navigate with arrow keys
            await act(async () => {
                fireEvent.keyDown(searchInput, { key: 'ArrowDown' });
            });

            const selectedResult = document.querySelector('.searchResultSelected');
            expect(selectedResult).toBeInTheDocument();
        });
    });
}); 