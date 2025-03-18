"use client";

import styles from "./OAuthButton.module.css";
import OAuthButtonProps from "./props.OAuthButton";

const OAuthButton = ({ company }: OAuthButtonProps) => {
  const companies: Record<string, { text: string; logo: string }> = {
    vk: { text: "Войти через VK ID", logo: "/imgs/OAuthButton/vk.svg" },
  };

  return (
    <button className={styles.main}>
      <img src={companies[company].logo} alt="" />
      <span>{companies[company].text}</span>
    </button>
  );
};

export default OAuthButton;
