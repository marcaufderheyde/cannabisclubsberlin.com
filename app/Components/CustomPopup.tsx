import React from 'react';
import styles from '@/app/[locale]/clubs/ClubCard.module.css';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Club {
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  offerings: string;
}

interface CustomPopupProps {
  club: Club;
  onClose: () => void;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ club, onClose }) => {
  const localActive = useLocale();

  return (
    <div className={styles.customPopup}>
      <div className={styles.popupOverlay} onClick={onClose}></div>
      <div className={styles.mapCardContainer}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <a href={`/${localActive}/clubs/${club.slug}`} className={styles.mapCardLink}>
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
              <h3 className={styles.mapCardTitle}>{club.name}</h3>
              <p className={styles.mapCardDescription}>
                {club.description}
              </p>
              <br/>
              <p className={styles.mapCardOfferings}>
                {club.offerings}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default CustomPopup;
