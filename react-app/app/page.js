'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [carousel, setCarousel] = useState(0);
  const [errors, setErrors] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  const [taxId, setTaxId] = useState("");
  const [taxIdType, setTaxIdType] = useState("");
  const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [fundingSource, setFundingSource] = useState("");

  const datePickerHandler = (e) => {
    e.preventDefault();
    const datePicker = document.getElementById("datePicker");
    datePicker.showPicker();
  };

  function formatDateToMonthDayYear(dateString) {
    // Ensure the dateString is in the format yyyy-MM-dd
    const [year, month, day] = dateString.split("-");

    // Create a Date object
    const date = new Date(year, month - 1, day); // Month is zero-based

    // Use toLocaleDateString to format the date
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  };

  function formatPhoneNumberFlexible(phoneNumber) {
    // Remove all non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');

    // Format numbers of various lengths
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      // For numbers with a leading country code "1"
      return cleaned.replace(/1(\d{3})(\d{3})(\d{4})/, '+1 ($1) $2-$3');
    } else if (cleaned.length > 10) {
      // Handle longer numbers (e.g., extensions)
      const base = cleaned.slice(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      const extension = cleaned.slice(10);
      return `${base} x${extension}`;
    } else {
      return 'Invalid phone number';
    }
  }

  function isValidEmail(email) {
    // Define the regular expression for validating an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regex
    return emailRegex.test(email);
  }

  const sectionChecks = () => {
    if (carousel === 0) {
      if (firstName === "" || lastName === "" || dob === "") {
        setErrors([...errors, "Please fill out all fields before continuing"]);
      }

      if (dob) {
        const dobVal = new Date(dob);
        const today = new Date();
        const cutoffDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        if (dobVal > cutoffDate) {
          setErrors([...errors, "You must be 18 years or older to create an account"]);
        } else {
          setDob(formatDateToMonthDayYear(dob));
        }
      }

      if (errors.length === 0) {
        setCarousel(carousel + 1);
      }

    } else if (carousel === 1) {
      if (email === "" || phone === "" || address === "" || city === "" || state === "" || country === "" || zip === "") {
        setErrors([...errors, "Please fill out all fields before continuing"]);
      }

      if (email) {
        if (!isValidEmail(email)) {
          setErrors([...errors, "Please enter a valid email address"]);
        }
      }

      if (phone.length === 10) {
        setPhone(formatPhoneNumberFlexible(phone));
      } else if (phone.length > 10) {
        setErrors([...errors, "Please enter a valid phone number"]);
      }

      if (zip.length === 5) {
        setZip(zip);
      } else {
        setErrors([...errors, "Please enter a valid zip code"]);
      }
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.tile}>
        <div className={styles.formWrapper}>
          <h1 className={styles.header}>Create Account</h1>
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${33 * (carousel + 1)}%` }}
            ></div>
          </div>
          <form
            style={{ transform: `translateX(-${carousel * 100}%)` }}
            className={styles.formContainer}
          >
            <div className={styles.formInnerWrapper}>
              <h2>1. Identity</h2>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>First Name</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setMiddleName(e.target.value)}
                    value={middleName}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Middle Name {'(optional)'}</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Last Name</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setDob(e.target.value)}
                    value={dob}
                    type="date"
                    id="datePicker"
                    className="datePicker"
                    onClick={datePickerHandler}
                    required
                  />
                  <div className={styles.underline}></div>
                </div>
              </div>
            </div>
            <div className={styles.formInnerWrapper}>
              <h2>2. Contact</h2>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Email</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Phone #</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Address</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setUnit(e.target.value)}
                    value={unit}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Unit {'(optional)'}</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>City</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setState(e.target.value)}
                    value={state}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>State</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Country</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setZip(e.target.value)}
                    value={zip}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Zip</label>
                </div>
              </div>
            </div>
            <div className={styles.formInnerWrapper}>
              <h2>3. Fincancial</h2>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setTaxId(e.target.value)}
                    value={taxId}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Tax ID</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setTaxIdType(e.target.value)}
                    value={taxIdType}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Tax ID Type</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setCountryOfCitizenship(e.target.value)}
                    value={countryOfCitizenship}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Country of Citizenship</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setCountryOfBirth(e.target.value)}
                    value={countryOfBirth}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Country of Birth</label>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setCountryOfResidence(e.target.value)}
                    value={countryOfResidence}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Country of Residence</label>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setFundingSource(e.target.value)}
                    value={fundingSource}
                    type="text"
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Funding Source</label>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className={styles.nextBtnContainer}>
          <button
            style={{ visibility: carousel === 0 ? "hidden" : "visible" }}
            onClick={() => setCarousel(carousel - 1)}
            className={styles.backBtn}
          >
            Back
          </button>
          <button
            onClick={() => sectionChecks()}
            className={styles.nextBtn}
          >
            {carousel === 2 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
