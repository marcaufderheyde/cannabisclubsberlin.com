'use client';
import MobileClubList from '@/app/components/MobileClubList/MobileClubList';

export type ClubsListProps = {
    clubClickedFromList: (index: number) => void;
    showHRInfo: boolean;
};

export default function ClubsList(props: ClubsListProps) {
    return (
        <div>
            <div className='lg:hidden flex'>
                <MobileClubList
                    clubClickedFromList={props.clubClickedFromList}
                    showHRInfo={props.showHRInfo}
                />
            </div>
        </div>
    );
}
