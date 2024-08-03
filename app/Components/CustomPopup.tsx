'use client';
import styles from '@/app/styles/ClubCard.module.css';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import ArrowButton from '../ui/Home/arrowbutton';
import Close from '../ui/Navigation/close';

interface Club {
    name: string;
    slug: string;
    imageUrl: string;
    geoLocation: number[];
    description?: string;
    offerings?: string;
    harmReduction?: string;
    hasHRInformation: true;
}

interface CustomPopupProps {
    club: Club;
    clubs: Club[];
    clubIndex: number;
    onClose: () => void;
    switchNextClub: () => void;
    switchPreviousClub: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
    club,
    clubs,
    onClose,
    switchNextClub,
    switchPreviousClub,
    clubIndex,
}) => {
    const localActive = useLocale();

    return (
        <div className={'hidden lg:flex absolute h-full z-[2005]'}>
            <div
                className={
                    'h-full bg-white rounded-lg shadow-md flex flex-col z-[2005]'
                }
            >
                <button className={styles.closeButton} onClick={onClose}>
                    <Close color={'#828282'} />
                </button>
                <div className="flex flex-col items-center">
                    <a
                        href={`/${localActive}/clubs/${club.slug}`}
                        className={styles.mapCardLink}
                    >
                        <div className={styles.mapCard}>
                            <div className="flex justify-center items-center">
                                <Image
                                    src={club.imageUrl}
                                    alt={`${club.name} Club Picture`}
                                    width={300}
                                    height={300}
                                    className={styles.mapCardImage}
                                />
                            </div>
                            <div className={styles.mapCardContent}>
                                <h3 className={styles.mapCardTitle}>
                                    {club.name}
                                </h3>
                                <br />
                                <p className={styles.mapCardOfferings}>
                                    {club.offerings}
                                </p>
                            </div>
                        </div>
                    </a>
                    <div
                        className={
                            'absolute bottom-0 inline-flex py-2 px-4 md:py-3'
                        }
                    >
                        <ArrowButton
                            boxClassName={'rounded-l-full'}
                            triangleClassName={'w-8 h-8 p-2 align-middle'}
                            toggleRotate={true}
                            backgroundColor={'bg-lime-500'}
                            triangleColor={'white'}
                            onClickFunction={() => switchPreviousClub()}
                        />
                        <div className="bg-lime-500 flex text-white text-base p-2">
                            {
                                (((clubIndex + 1) as unknown as string) +
                                    '/' +
                                    clubs.length) as string
                            }
                        </div>
                        <ArrowButton
                            boxClassName={'rounded-r-full'}
                            triangleClassName={'w-8 h-8 p-2 align-middle'}
                            toggleRotate={false}
                            backgroundColor={'bg-lime-500'}
                            triangleColor={'white'}
                            onClickFunction={() => switchNextClub()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
