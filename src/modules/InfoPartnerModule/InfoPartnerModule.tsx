"use client";

import styles from "./InfoPartnerModule.module.css";

import Statistics from "@/components/Statistics/Statistics";
import DownloadReport from "@/components/DownloadReport/DownloadReport";
import InfoUser from "@/components/InfoUser/InfoUser";
import Nav from "@/components/Nav/Nav";
import ReferralURL from "@/components/ReferralURL/ReferralURL";
import Referrals from "@/components/Referrals/Referrals";
import ChangePassword from "@/components/ChangePassword/ChangePassword";
import Exit from "@/components/Exit/Exit";

const InfoPartnerModule = () => {
  return (
    <div className={styles.main}>
      <div className={styles.statisticsAndUserInfo}>
        <Statistics />
        <div className={styles.userInfo}>
          <InfoUser />
          <ChangePassword />
        </div>
      </div>

      <div className={styles.reportAndNavs}>
        <DownloadReport />

        <div className={styles.navs}>
          <Nav
            name="tg"
            text="Новости сервиса"
            imgPath="imgs/PartnerInfoModule/telegramWhite.svg"
          />
          <Nav
            text="Как пользоваться сервисом?"
            imgPath="imgs/PartnerInfoModule/about.svg"
          />
        </div>
      </div>

      <div className={styles.urlAndExit}>
        <ReferralURL url="https://ia-online.com/c/67d27f2c-9b5c-800d-820e-3d4a2c124ffdASDFHJJKSDHFJSDHJKFHSDKFHJKSDHF" />
        <Exit></Exit>
      </div>

      <Referrals />
    </div>
  );
};

export default InfoPartnerModule;
