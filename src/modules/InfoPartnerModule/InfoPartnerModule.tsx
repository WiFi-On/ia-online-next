'use client';

import styles from './InfoPartnerModule.module.css';

import Statistics from '@/components/Statistics/Statistics';
import DownloadReport from '@/components/DownloadReport/DownloadReport';
import InfoUser from '@/components/InfoUser/InfoUser';
import Nav from '@/components/Nav/Nav';
import ReferralURL from '@/components/ReferralURL/ReferralURL';
import Referrals from '@/components/Referrals/Referrals';
import ChangePassword from '@/components/ChangePassword/ChangePassword';
import Exit from '@/components/Exit/Exit';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PayloadAccessI } from '@/app/api/auth/payloads.interface';

const InfoPartnerModule = () => {
  const router = useRouter();
  const [infoProfile, setInfoProfile] = useState<PayloadAccessI | null>(null);

  const getInfoProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        const data = await res.json();
        setInfoProfile(data.decodedAccessToken);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Ошибка при получении профиля:', error);
      router.push('/login');
    }
  };

  useEffect(() => {
    getInfoProfile();
  }, []);

  if (!infoProfile) return <div>Загрузка...</div>;

  return (
    <div className={styles.main}>
      <div className={styles.statisticsAndUserInfo}>
        <Statistics
          totalPay={infoProfile.statistic.total}
          internetPay={infoProfile.statistic.internet}
          cleaningPay={infoProfile.statistic.cleaning}
          referralsPay={infoProfile.statistic.referrals}
          movingPay={infoProfile.statistic.shipping}
        />
        <div className={styles.userInfo}>
          <InfoUser tg={infoProfile.telegram} phone={infoProfile.phone_number} email={infoProfile.email} />
          <ChangePassword />
        </div>
      </div>

      <div className={styles.reportAndNavs}>
        <DownloadReport />
        <div className={styles.navs}>
          <Nav name="tg" text="Новости сервиса" imgPath="imgs/PartnerInfoModule/telegramWhite.svg" />
          <Nav text="Как пользоваться сервисом?" imgPath="imgs/PartnerInfoModule/about.svg" />
        </div>
      </div>

      <div className={styles.urlAndExit}>
        <ReferralURL url={'https://ia-online.com?referral_code=' + infoProfile.referral_code} />
        <Exit />
      </div>

      <Referrals referrals={infoProfile.referrals} />
    </div>
  );
};

export default InfoPartnerModule;
