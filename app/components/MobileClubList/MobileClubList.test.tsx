import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MobileClubList from './MobileClubList';
import { useTranslations, useLocale } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';

jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
    useLocale: jest.fn(),
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

describe('MobileClubList', () => {
    const mockClubClickedFromList = jest.fn();
    const clubsMockData = [
        {
            name: 'Club 1',
            slug: 'club-1',
            imageUrl: '/images/club1.jpg',
            geoLocation: [52.52, 13.405],
            description: '',
            offerings: '',
            harm_reduction: 'Some harm reduction info',
            hasHRInformation: true,
            address: 'Address 1',
        },
        {
            name: 'Club 2',
            slug: 'club-2',
            imageUrl: '/images/club2.jpg',
            geoLocation: [52.53, 13.406],
            description: '',
            offerings: '',
            harm_reduction:
                'This club has currently not listed any specific harm reduction services.',
            hasHRInformation: false,
            address: 'Address 2',
        },
    ];

    beforeEach(() => {
        (useTranslations as jest.Mock).mockImplementation(
            (namespace: string) => (key: string) => {
                if (key.includes('club-1.harm_reduction')) {
                    return 'Some harm reduction info';
                }
                if (key.includes('club-2.harm_reduction')) {
                    return 'This club has currently not listed any specific harm reduction services.';
                }
                return key;
            }
        );

        (useLocale as jest.Mock).mockReturnValue('en');
        (pullClubsListContent as jest.Mock).mockReturnValue(clubsMockData);
        mockClubClickedFromList.mockClear();
    });

    it('renders the list of clubs correctly', () => {
        render(
            <MobileClubList
                clubClickedFromList={mockClubClickedFromList}
                showHRInfo={false}
            />
        );

        expect(screen.getByText('Club 1')).toBeInTheDocument();
        expect(screen.getByText('Club 2')).toBeInTheDocument();
    });

    it('filters and shows only clubs with harm reduction info when showHRInfo is true', () => {
        render(
            <MobileClubList
                clubClickedFromList={mockClubClickedFromList}
                showHRInfo={true}
            />
        );

        expect(screen.getByText('Club 1')).toBeInTheDocument();
        expect(screen.queryByText('Club 2')).not.toBeInTheDocument();
    });

    it('calls clubClickedFromList and scrolls to the club when a club is clicked', () => {
        render(
            <MobileClubList
                clubClickedFromList={mockClubClickedFromList}
                showHRInfo={false}
            />
        );

        const clubElement = screen.getByText('Club 1').closest('div');
        fireEvent.click(clubElement!);

        expect(mockClubClickedFromList).toHaveBeenCalledWith(0);
        expect(clubElement!.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
        });
    });
});
