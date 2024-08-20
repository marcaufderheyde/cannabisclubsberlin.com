import React, { CSSProperties, useEffect } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { pullClubsListContent } from '@/app/helpers/clubsListContent';
import { useRef } from 'react';

export type DesktopClubsListProps = {
    clubClickedFromList: (index: number) => void;
    setClubListExpanded: (isExpanded: boolean) => void;
    style?: CSSProperties;
};

export default function DesktopClubList({
    clubClickedFromList,
    setClubListExpanded,
    currentClubIndex,
    ...props
}: {
    clubClickedFromList: (index: number) => void;
    setClubListExpanded: (isExpanded: boolean) => void;
    currentClubIndex: null | number;
}) {
    const clubs = pullClubsListContent();
    const t = useTranslations('ClubsPage');
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    clubs.forEach((club) => {
        club.description = t(`${club.slug}.description`);
        club.offerings = t(`${club.slug}.offerings`);
        club.harm_reduction = t(`${club.slug}.harm_reduction`);
    });

    useEffect(() => {
        if (currentClubIndex && refs.current[currentClubIndex]) {
            refs.current[currentClubIndex]!.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [currentClubIndex]);

    const backgroundColor = (index: number) => {
        return currentClubIndex == index ? ' bg-[rgb(87,87,87,0.1)] ' : '';
    };

    return (
        <div
            className="w-[289px] bg-[#F6F6F6] flex flex-col h-full overflow-y-scroll shadow-inner"
            {...props}
        >
            {clubs.map((club, index) => (
                <div
                    className={
                        backgroundColor(index) +
                        ' flex flex-row justify-between items-center border-b-[1px] cursor-pointer transition ease-in-out duration-300 transform hover:bg-[rgb(87,87,87,0.1)]'
                    }
                    key={club.key}
                    ref={(el) => {
                        refs.current[index] = el;
                        return;
                    }}
                    onClick={() => {
                        clubClickedFromList(index);
                    }}
                >
                    <div className="h-[100px] m-4 flex items-center font-bold text-[#454545] ">
                        {club.name}
                    </div>
                    <Image
                        src={club.imageUrl}
                        alt={club.name + ' Club Picture'}
                        width={80}
                        height={80}
                        className="m-4"
                    />
                </div>
            ))}
        </div>
    );
}
