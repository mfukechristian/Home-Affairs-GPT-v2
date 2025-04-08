// app/components/ResultDisplay.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import Image from "next/image";
import southAfricaLogo from "../../public/logo.png";
import styles from "./ResultDisplay.module.css";

interface ResultDisplayProps {
  result: string;
  onGoBack: () => void; // Define the type for the onGoBack prop (a function that returns void)
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onGoBack }) => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    onGoBack(); // Call the resetForm function passed as a prop
    router.push("/form");
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        {/* You can add the logo here if you want it on the result page */}
        {/* <Image src={southAfricaLogo} alt="South Africa Coat of Arms" width={100} height={100} /> */}
      </div>
      <h2 className={styles.title}>Result</h2>
      <div className={styles.markdownContainer}>
        <ReactMarkdown>{result}</ReactMarkdown>
      </div>
      <button className={styles.backButton} onClick={handleBackButtonClick}>
        Back to Form
      </button>
    </div>
  );
};

export default ResultDisplay;
