"use client";
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import styles from "./FormPage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import southAfricaLogo from "../../public/logo.png";
import ResultDisplay from "@/app/components/ResultDisplay";

const FormPage: React.FC = () => {
  const [service, setService] = useState("");
  const [subService, setSubService] = useState("");
  const [query, setQuery] = useState("");
  const [subServiceOptions, setSubServiceOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const mainServices = ["Civis", "Immigration"];
  const civisSubServices = [
    "Birth Certificate",
    "Death Certificate",
    "Marriage Certificate",
    "Adoption",
    "Travel Document",
  ];
  const immigrationSubServices = [
    "Study Permit",
    "Visitor Visa",
    "Work Permit",
    "Refugee",
    "Permanent Residence",
  ];

  useEffect(() => {
    if (service === "Civis") {
      setSubServiceOptions(civisSubServices);
      setSubService("");
    } else if (service === "Immigration") {
      setSubServiceOptions(immigrationSubServices);
      setSubService("");
    } else {
      setSubServiceOptions([]);
      setSubService("");
    }
  }, [service]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setResult(null);

    if (service && subService && query) {
      try {
        const response = await fetch("/api/model", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ service, subService, query }),
        });

        if (response.ok) {
          const data = await response.json();
          setResult(data.data);
        } else {
          console.error("Error processing request:", response.status);
          setResult("Error processing your request. Please try again.");
        }
      } catch (error: any) {
        console.error("Fetch error:", error);
        setResult("Failed to send request. Please check your network.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setResult("Please select a service, sub-service, and provide details.");
      setIsLoading(false);
    }
  };

  // Function to reset the form state
  const resetForm = useCallback(() => {
    setService("");
    setSubService("");
    setQuery("");
    setResult(null);
  }, []);

  return (
    <div className={styles.formContainer}>
      <div className={styles.logoContainer}>
        <Image
          src={southAfricaLogo}
          alt="South Africa Coat of Arms"
          width={100}
          height={100}
        />
      </div>
      <h2 className={styles.formTitle}>Complete the form below</h2>
      {!isLoading && !result && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="service">Select a service</label>
            <select
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">Select a service</option>
              {mainServices.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {subServiceOptions.length > 0 && (
            <div className={styles.formGroup}>
              <label htmlFor="subService">Select a sub-service</label>
              <select
                id="subService"
                value={subService}
                onChange={(e) => setSubService(e.target.value)}
                className={styles.selectInput}
              >
                <option value="">Select a sub-service</option>
                {subServiceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {service && subService && (
            <div className={styles.formGroup}>
              <label htmlFor="query">Give more detail...</label>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.textareaInput}
              />
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            Submit Request
          </button>
        </form>
      )}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>
            Your request is being processed. Please wait a few moments...
          </p>
        </div>
      )}
      {result && <ResultDisplay result={result} onGoBack={resetForm} />}{" "}
      {/* Pass the resetForm function as a prop */}
    </div>
  );
};

export default FormPage;
