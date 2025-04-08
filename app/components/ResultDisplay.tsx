// app/components/ResultDisplay.tsx
"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import Image from "next/image";
import southAfricaLogo from "../../public/logo.png";
import styles from "../styles/ResultDisplay.module.css";

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
      <h2 className={styles.title}>See the Result To your Request below</h2>
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
