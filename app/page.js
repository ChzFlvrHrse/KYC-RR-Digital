'use client'; // Marks this component as a client-side component in Next.js.

import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management.
import { states, countries } from "./location"; // Import location-related data like states and countries.
import { taxIdTypes, incomeSources } from "./financial"; // Import financial-related data like tax ID types and income sources.
import { isValidEmail, containsLettersOrSymbols, formatDateToMonthDayYear, taxIdFormatter, formatPhoneNumberFlexible } from "./formatData"; // Utility functions for data validation and formatting.
import styles from "./page.module.css"; // Import CSS module for styling.

export default function Home() {
  // State variables for carousel navigation and error tracking.
  const [carousel, setCarousel] = useState(0); // Tracks the current step in the form process.
  const [errors, setErrors] = useState({}); // Object to hold validation errors.

  // State variables for user input in different sections.
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

  const [taxId, setTaxId] = useState('');
  const [taxIdType, setTaxIdType] = useState("");
  const [countryOfCitizenship, setCountryOfCitizenship] = useState("");
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [countryOfResidence, setCountryOfResidence] = useState("");
  const [fundingSource, setFundingSource] = useState("");

  // Function to trigger the native date picker on click.
  const datePickerHandler = (e) => {
    e.preventDefault();
    const datePicker = document.getElementById("datePicker");
    datePicker.showPicker();
  };

  // Function to validate each section of the form.
  const sectionChecks = () => {
    const errorObj = {}; // Object to store validation errors.

    if (carousel === 0) { // Identity section validation.
      if (firstName.trim().length === 0) {
        errorObj.firstName = "Please enter a valid first name";
      } else {
        delete errorObj.firstName;
      }

      if (lastName.trim().length === 0) {
        errorObj.lastName = "Please enter a valid last name";
      } else {
        delete errorObj.lastName;
      }

      if (dob.trim().length === 0) {
        errorObj.dob = "Please enter a valid date of birth";
      } else {
        const dobVal = new Date(dob);
        const today = new Date();
        const cutoffDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );

        if (dobVal > cutoffDate) {
          errorObj.dob = "You must be 18 years or older to create an account";
        } else {
          delete errorObj.dob;
        }
      }
    } else if (carousel === 1) { // Contact section validation.
      if (!isValidEmail(email)) {
        errorObj.email = "Please enter a valid email address";
      } else {
        delete errorObj.email;
      }

      if (phone.trim().length !== 10 || containsLettersOrSymbols(phone)) {
        errorObj.phone = containsLettersOrSymbols(phone)
          ? "Phone number cannot contain letters"
          : "Please enter a valid phone number";
      } else {
        delete errorObj.phone;
      }

      if (address.trim().length === 0) {
        errorObj.address = "Please enter a valid address";
      } else {
        delete errorObj.address;
      }

      if (city.trim().length === 0) {
        errorObj.city = "Please enter a valid city";
      } else {
        delete errorObj.city;
      }

      if (state.length === 0) {
        errorObj.state = "Please enter a valid state";
      } else {
        delete errorObj.state;
      }

      if (country.length === 0) {
        errorObj.country = "Please enter a valid country";
      } else {
        delete errorObj.country;
      }

      if (zip.trim().length !== 5) {
        errorObj.zip = containsLettersOrSymbols(zip)
          ? "Zip code cannot contain letters"
          : "Please enter a valid zip code";
      } else {
        delete errorObj.zip;
      }
    } else if (carousel === 2) { // Financial section validation.
      if (taxId.trim().length === 0 || taxId.length !== 9) {
        errorObj.taxId = containsLettersOrSymbols(taxId)
          ? "Tax ID cannot contain letters"
          : "Please enter a valid tax ID";
      } else {
        delete errorObj.taxId;
      }

      if (taxIdType.length === 0) {
        errorObj.taxIdType = "Please enter a valid tax ID type";
      } else {
        delete errorObj.taxIdType;
      }

      if (countryOfCitizenship.length === 0) {
        errorObj.countryOfCitizenship = "Please enter a valid country of citizenship";
      } else {
        delete errorObj.countryOfCitizenship;
      }

      if (countryOfBirth.length === 0) {
        errorObj.countryOfBirth = "Please enter a valid country of birth";
      } else {
        delete errorObj.countryOfBirth;
      }

      if (countryOfResidence.length === 0) {
        errorObj.countryOfResidence = "Please enter a valid country of residence";
      } else {
        delete errorObj.countryOfResidence;
      }

      if (fundingSource.trim().length === 0) {
        errorObj.fundingSource = "Please enter a valid funding source";
      } else {
        delete errorObj.fundingSource;
      }
    }

    // Update state with errors or clear them if no errors exist.
    if (Object.keys(errorObj).length === 0) {
      setErrors({});
    } else {
      setErrors(errorObj);
    }
  };

  // Run validation checks when relevant state variables change.
  useEffect(() => {
    sectionChecks();
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
                  {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
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
                  {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
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
                  <label
                    style={{ zIndex: 1, paddingRight: '10px' }}
                  >
                    Date of Birth
                  </label>
                  {errors.dob && <p className={styles.error}>{errors.dob}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              {/* <div style={{ visibility: carousel === 0 ? 'visible' : 'hidden' }}> */}
              {/* {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div> */}
            </div>
            {/*<---------------------------------------CONTACT--------------------------------------------> */}
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
                  {errors.email && <p className={styles.error}>{errors.email}</p>}
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    maxLength={10}
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Phone #</label>
                  {errors.phone && <p className={styles.error}>{errors.phone}</p>}
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
                  {errors.address && <p className={styles.error}>{errors.address}</p>}
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
                  {errors.city && <p className={styles.error}>{errors.city}</p>}
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setState(e.target.value)}
                    value={state}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Select a State
                  </label>
                  {errors.state && <p className={styles.error}>{errors.state}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setCountry(e.target.value)}
                    value={country}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Select a Country
                  </label>
                  {errors.country && <p className={styles.error}>{errors.country}</p>}
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setZip(e.target.value)}
                    value={zip}
                    type="text"
                    maxLength={5}
                    required
                  />
                  <label>Zip</label>
                  {errors.zip && <p className={styles.error}>{errors.zip}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              {/* <div style={{ visibility: carousel === 1 ? 'visible' : 'hidden' }}> */}
              {/* {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div> */}
            </div>
            {/*<---------------------------------------FINANCIAL--------------------------------------------> */}
            <div className={styles.formInnerWrapper}>
              <h2>3. Fincancial</h2>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <input
                    onChange={e => setTaxId(e.target.value)}
                    value={taxId}
                    type="text"
                    maxLength={9}
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Tax ID</label>
                  {errors.taxId && <p className={styles.error}>{errors.taxId}</p>}
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setTaxIdType(e.target.value)}
                    value={taxIdType}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {taxIdTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Tax ID Type
                  </label>
                  {errors.taxIdType && <p className={styles.error}>{errors.taxIdType}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setCountryOfCitizenship(e.target.value)}
                    value={countryOfCitizenship}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Country of Citizenship
                  </label>
                  {errors.countryOfCitizenship && <p className={styles.error}>{errors.countryOfCitizenship}</p>}
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setCountryOfBirth(e.target.value)}
                    value={countryOfBirth}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Country of Birth
                  </label>
                  {errors.countryOfBirth && <p className={styles.error}>{errors.countryOfBirth}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setCountryOfResidence(e.target.value)}
                    value={countryOfResidence}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Country of Residence
                  </label>
                  {errors.countryOfResidence && <p className={styles.error}>{errors.countryOfResidence}</p>}
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setFundingSource(e.target.value)}
                    value={fundingSource}
                    required
                  >
                    <option style={{ display: 'none' }} value=""></option>
                    {incomeSources.map((source, index) => (
                      <option key={index} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <label
                    style={{ zIndex: 1 }}
                  >
                    Funding Source
                  </label>
                  {errors.fundingSource && <p className={styles.error}>{errors.fundingSource}</p>}
                  <div className={styles.underline}></div>
                </div>
              </div>
              {/* <div style={{ visibility: carousel === 2 ? 'visible' : 'hidden' }}> */}
              {/* {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div> */}
            </div>
            {/*<---------------------------------------SUMMARY--------------------------------------------> */}
            <div className={styles.formInnerWrapper}>
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
            onClick={() => carousel < 3 ? setCarousel(carousel + 1) : null}
            disabled={Object.keys(errors).length > 0}
            className={styles.nextBtn}
            style={{ visibility: carousel === 3 ? "hidden" : "visible" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
