import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DesktopClubList from './DesktopClubList';
import { useTranslations } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { Club } from './OpenStreetMap';

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
}));

jest.mock('@/app/helpers/clubsListContent', () => ({
    pullClubsListContent: jest.fn(),
}));

jest.mock('next/image', () => {
    const React = require('react');
    return {
        __esModule: true,
        default: ({ src, alt }: { src: string; alt: string }) =>
            React.createElement('img', { 'data-testid': 'image', src, alt }),
    };
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('DesktopClubList', () => {
    const mockClubClickedFromList = jest.fn();
    const mockSetClubListExpanded = jest.fn();

    const clubsMockData: Club[] = [
        {
            name: 'Club 1',
            slug: 'club-1',
            imageUrl: '/images/club1.jpg',
            geoLocation: [52.52, 13.405],
            description: '',
            offerings: [''],
            harm_reduction: '',
            hasHRInformation: true,
            address: '',
        },
        {
            name: 'Club 2',
            slug: 'club-2',
            imageUrl: '/images/club2.jpg',
            geoLocation: [52.53, 13.406],
            description: '',
            offerings: [''],
            harm_reduction: '',
            hasHRInformation: true,
            address: '',
        },
    ];

    beforeEach(() => {
        (useTranslations as jest.Mock).mockImplementation(
            () => (key: string) => key
        );
        (pullClubsListContent as jest.Mock).mockReturnValue(clubsMockData);
        mockClubClickedFromList.mockClear();
        mockSetClubListExpanded.mockClear();
    });

    it('renders the list of clubs correctly', () => {
        render(
            <DesktopClubList
                clubClickedFromList={mockClubClickedFromList}
                setClubListExpanded={mockSetClubListExpanded}
                currentClubIndex={null}
                filteredClubs={clubsMockData}
            />
        );

        expect(screen.getByText('Club 1')).toBeInTheDocument();
        expect(screen.getByText('Club 2')).toBeInTheDocument();
    });

    it('calls clubClickedFromList when a club is clicked', () => {
        render(
            <DesktopClubList
                clubClickedFromList={mockClubClickedFromList}
                setClubListExpanded={mockSetClubListExpanded}
                currentClubIndex={null}
                filteredClubs={clubsMockData}
            />
        );

        const clubElement = screen.getByText('Club 1').closest('div');
        fireEvent.click(clubElement!);

        expect(mockClubClickedFromList).toHaveBeenCalledWith(0);
    });

    it('highlights and scrolls to the current club', () => {
        render(
            <DesktopClubList
                clubClickedFromList={mockClubClickedFromList}
                setClubListExpanded={mockSetClubListExpanded}
                currentClubIndex={1} // Assuming this is the index for "Club 2"
                filteredClubs={clubsMockData}
            />
        );

        // Locate the wrapper div element that should have the background class
        const clubWrapperElements = screen
            .getAllByText('Club 2')
            .map((el) => el.closest('div'));

        // Check the parent of the h3 element to see if it has the background class
        const highlightedClubElement = clubWrapperElements.find((el) =>
            el?.parentElement?.classList.contains('bg-[rgb(87,87,87,0.1)]')
        );

        expect(highlightedClubElement).toBeTruthy(); // Check that the element with the class is found

        // Ensure that scrollIntoView was called
        expect(highlightedClubElement!.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
        });
    });
});
