'use client'; // Marks this component as a client-side component in Next.js.

import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management.
import { formatDateToMonthDayYear, taxIdFormatter, formatPhoneNumberFlexible } from "./formatData"; // Utility functions for data validation and formatting.
import styles from "./page.module.css"; // Import CSS module for styling.

import { Identity } from "./sections/identity";
import { Contact } from "./sections/contact";
import { Financial } from "./sections/financial";
import { sectionChecks } from "./sections/sectionCheck";

export default function Home() {
  // State variables for carousel navigation and error tracking.
  const [carousel, setCarousel] = useState(0); // Tracks the current step in the form process.
  const [errors, setErrors] = useState({}); // State to store form validation errors.

  // Identity section state variables.
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  // Contact section state variables.
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [unit, setUnit] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  // Financial section state variables.
  const [taxId, setTaxId] = useState('');
  const [taxIdType, setTaxIdType] = useState("");
  const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [fundingSource, setFundingSource] = useState("");

  const errorChecks = sectionChecks(firstName, lastName, dob, phone, email, address, city, state, country, zip, taxId, taxIdType, countryOfCitizenship, countryOfBirth, countryOfResidence, fundingSource, carousel);

  // Run validation checks when relevant state variables change.
  useEffect(() => {
    setErrors(errorChecks);
  }, [carousel, firstName, middleName, lastName, dob, email, phone, address, unit, city, state, country, zip, taxId, taxIdType, countryOfCitizenship, countryOfBirth, countryOfResidence, fundingSource]);

  // Organized user data for summary view.
  const identityInfo = [['First Name', firstName], ['Middle Name', middleName], ['Last Name', lastName], ['Date of Birth', formatDateToMonthDayYear(dob)]];
  const contactInfo = [['Email', email], ['Phone', formatPhoneNumberFlexible(phone)], ['Address', address], ['Unit', unit], ['City', city], ['State', state], ['Country', country], ['Zip', zip]];
  const financialInfo = [['Tax ID', taxIdFormatter(taxId)], ['Tax ID Type', taxIdType], ['Country of Citizenship', countryOfCitizenship], ['Country of Birth', countryOfBirth], ['Country of Residence', countryOfResidence], ['Funding Source', fundingSource]];

  const accountInfo = [identityInfo, contactInfo, financialInfo]; // Combined user data for final summary.
  const sectionTitles = { 0: "Identity", 1: "Contact", 2: "Financial" }; // Titles for each form section.

  return (
    <div className={styles.page}>
      <div className={styles.tile}>
        <div className={styles.formWrapper}>
          <h1 className={styles.header}>Create Account</h1>
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${25 * (carousel + 1)}%` }}
            ></div>
          </div>
          <form
            style={{ transform: `translateX(-${carousel * 100}%)` }}
            className={styles.formContainer}
          >
            {/*<---------------------------------------IDENTITY--------------------------------------------> */}
            <Identity
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              lastName={lastName}
              setLastName={setLastName}
              dob={dob}
              setDob={setDob}
              errors={errors}
            />
            {/*<---------------------------------------CONTACT--------------------------------------------> */}
            <Contact
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              unit={unit}
              setUnit={setUnit}
              city={city}
              setCity={setCity}
              state={state}
              setState={setState}
              country={country}
              setCountry={setCountry}
              zip={zip}
              setZip={setZip}
              errors={errors}
            />
            {/*<---------------------------------------FINANCIAL--------------------------------------------> */}
            <Financial
              taxId={taxId}
              setTaxId={setTaxId}
              taxIdType={taxIdType}
              setTaxIdType={setTaxIdType}
              countryOfCitizenship={countryOfCitizenship}
              setCountryOfCitizenship={setCountryOfCitizenship}
              countryOfBirth={countryOfBirth}
              setCountryOfBirth={setCountryOfBirth}
              countryOfResidence={countryOfResidence}
              setCountryOfResidence={setCountryOfResidence}
              fundingSource={fundingSource}
              setFundingSource={setFundingSource}
              errors={errors}
            />
            {/*<---------------------------------------SUMMARY--------------------------------------------> */}
            <div className={styles.formSummary}>
              <h2>4. Summary</h2>
              <div className={styles.summaryContainer}>
                {accountInfo.map((section, index) => (
                  <div key={index} className={styles.summarySection}>
                    <h3 className={styles.sectionTitle}>{sectionTitles[index]}</h3>
                    {section.map((field, id) => (
                      <div
                        style={{ display: field[1] === '' ? 'none' : null }}
                        key={id}
                        className={styles.summaryInnerSection}
                      >
                        <b>
                          <p>
                            {field[0]}:
                          </p>
                        </b>
                        <p
                          title={field[1]}
                        >
                          {field[1]}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </form>
          <div className={styles.nextBtnContainer}>
            <button
              style={{ visibility: carousel === 0 ? "hidden" : "visible" }}
              onClick={() => setCarousel(carousel - 1)}
              className={styles.backBtn}
            >
              Back
            </button>
            <button
              onClick={() => carousel < 3 ? setCarousel(carousel + 1) : null}
              disabled={Object.keys(errors).length > 0}
              className={styles.nextBtn}
              style={{ visibility: carousel === 3 ? "hidden" : "visible", color: 'white' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
