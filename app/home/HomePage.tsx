"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/HomePage.module.css";
import Image from "next/image";
import southAfricaLogo from "../../public/logo.png";

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/form");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={southAfricaLogo}
          alt="South Africa Coat of Arms"
          width={150}
          height={150}
        />
      </div>
      <h2 className={styles.subtitle}>
        Your Home Affairs Civic and Immigration services, Simplified.
      </h2>
      <h1 className={styles.title}>
        Get the information you need, <br />
        right at your fingertips.
      </h1>
      <button className={styles.submitButton} onClick={handleButtonClick}>
        Submit Request
      </button>
    </div>
  );
};

export default HomePage;
