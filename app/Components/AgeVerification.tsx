"use client"
import { useEffect, useState } from 'react';
import styles from './AgeVerification.module.css';
import { useTranslations } from 'next-intl';

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('AgeVerification');

  const handleConfirm = () => {
    setIsVisible(false);
    localStorage.setItem('ageVerified', 'true');
  };

  useEffect(() => {
    const isAccepted = localStorage.getItem('ageVerified');
    setIsVisible(!isAccepted);
}, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h1>{t('header')}</h1>
        <br/>
        <p>{t('description')}</p>
        <br/>
        <button onClick={handleConfirm} className={
                'py-2 px-4 md:py-3 md:px-7 rounded-3xl cursor-pointer items-center gap-3'
            }
            style={{ color: '#FFFFFF', backgroundColor: '#B6CF54' }}
            >
            {t('button_text')}
        </button>
      </div>
    </div>
  );
};

export default AgeVerification;
