'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Club, pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useRef } from 'react';
import MobileClubList from '@/app/Components/MobileClubList';
import DesktopClubList from '@/app/Components/DesktopClubList';

export type ClubsListProps = {
    clubClickedFromList: (index: number) => void;
    showHRInfo: boolean;
};

export default function ClubsList(props: ClubsListProps) {
    return (
        <div>
            <div className="lg:hidden flex">
                <MobileClubList
                    clubClickedFromList={props.clubClickedFromList}
                    showHRInfo={props.showHRInfo}
                />
            </div>
        </div>
    );
}
