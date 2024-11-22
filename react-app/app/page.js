'use client';

import { useState, useEffect } from "react";
import { states, countries } from "./location";
import { taxIdTypes, incomeSources } from "./financial";
import { isValidEmail, formatDateToMonthDayYear, taxIdFormatter, formatPhoneNumberFlexible } from "./formatData";
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

  const [taxId, setTaxId] = useState('');
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

  const sectionChecks = () => {
    const errorsArr = [];

    if (carousel === 0) {
      if (firstName.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid first name")) {
          errorsArr.push("Please enter a valid first name");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid first name");
      }

      if (lastName.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid last name")) {
          errorsArr.push("Please enter a valid last name");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid last name");
      }

      if (dob.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid date of birth")) {
          errorsArr.push("Please enter a valid date of birth");
        }
      } else {
        const dobVal = new Date(dob);
        const today = new Date();
        const cutoffDate = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );

        if (dobVal > cutoffDate) {
          if (!errorsArr.includes("You must be 18 years or older to create an account")) {
            errorsArr.push("You must be 18 years or older to create an account");
          }
        } else {
          errorsArr.filter((error) => error !== "You must be 18 years or older to create an account");
        }
      }

    } else if (carousel === 1) {
      if (!isValidEmail(email)) {
        if (!errorsArr.includes("Please enter a valid email address")) {
          errorsArr.push("Please enter a valid email address");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid email address");
      }

      if (phone.trim().length !== 10) {
        if (!errorsArr.includes("Please enter a valid phone number")) {
          errorsArr.push("Please enter a valid phone number");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid phone number");
      }

      if (address.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid address")) {
          errorsArr.push("Please enter a valid address");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid address");
      }

      if (city.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid city")) {
          errorsArr.push("Please enter a valid city");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid city");
      }

      if (state.length === 0) {
        if (!errorsArr.includes("Please enter a valid state")) {
          errorsArr.push("Please enter a valid state");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid state");
      }

      if (country.length === 0) {
        if (!errorsArr.includes("Please enter a valid country")) {
          errorsArr.push("Please enter a valid country");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid country");
      }

      if (zip.trim().length !== 5) {
        if (!errorsArr.includes("Please enter a valid zip code")) {
          errorsArr.push("Please enter a valid zip code");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid zip code");
      }

    } else if (carousel === 2) {

      if (taxId.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid tax ID")) {
          errorsArr.push("Please enter a valid tax ID");
        }
      } else if (taxId.length !== 9) {
        if (!errorsArr.includes("Please enter a valid tax ID")) {
          errorsArr.push("Please enter a valid tax ID");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid tax ID");
      }

      if (taxIdType.length === 0) {
        if (!errorsArr.includes("Please enter a valid tax ID type")) {
          errorsArr.push("Please enter a valid tax ID type");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid tax ID type");
      }

      if (countryOfCitizenship.length === 0) {
        if (!errorsArr.includes("Please enter a valid country of citizenship")) {
          errorsArr.push("Please enter a valid country of citizenship");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid country of citizenship");
      }

      if (countryOfBirth.length === 0) {
        if (!errorsArr.includes("Please enter a valid country of birth")) {
          errorsArr.push("Please enter a valid country of birth");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid country of birth");
      }

      if (countryOfResidence.length === 0) {
        if (!errorsArr.includes("Please enter a valid country of residence")) {
          errorsArr.push("Please enter a valid country of residence");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid country of residence");
      }

      if (fundingSource.trim().length === 0) {
        if (!errorsArr.includes("Please enter a valid funding source")) {
          errorsArr.push("Please enter a valid funding source");
        }
      } else {
        errorsArr.filter((error) => error !== "Please enter a valid funding source");
      }
    };

    if (errorsArr.length === 0) {
      setErrors([]);
    } else {
      setErrors(errorsArr);
    }
  };

  useEffect(() => {
    sectionChecks();
  }, [carousel, firstName, middleName, lastName, dob, email, phone, address, unit, city, state, country, zip, taxId, taxIdType, countryOfCitizenship, countryOfBirth, countryOfResidence, fundingSource]);

  const identityInfo = [['First Name', firstName], ['Middle Name', middleName], ['Last Name', lastName], ['Date of Birth', formatDateToMonthDayYear(dob)]];
  const contactInfo = [['Email', email], ['Phone', formatPhoneNumberFlexible(phone)], ['Address', address], ['Unit', unit], ['City', city], ['State', state], ['Country', country], ['Zip', zip]];
  const financialInfo = [['Tax ID', taxIdFormatter(taxId)], ['Tax ID Type', taxIdType], ['Country of Citizenship', countryOfCitizenship], ['Country of Birth', countryOfBirth], ['Country of Residence', countryOfResidence], ['Funding Source', fundingSource]];

  const accountInfo = [identityInfo, contactInfo, financialInfo];
  const sectionTitles = { 0: "Identity", 1: "Contact", 2: "Financial" };

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
                  <label
                    style={{
                      zIndex: 1,
                      backgroundColor: '#121212',
                      paddingRight: '10px',

                    }}
                  >
                    Date of Birth
                  </label>
                  <div className={styles.underline}></div>
                </div>
              </div>
              <div style={{ visibility: carousel === 0 ? 'visible' : 'hidden' }}>
                {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div>
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
                  <select
                    onChange={e => setState(e.target.value)}
                    value={state}
                    required
                  >
                    <option style={{ display: 'none'}} value=""></option>
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
                    <option style={{ display: 'none'}} value=""></option>
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
                  <div className={styles.underline}></div>
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
              <div style={{ visibility: carousel === 1 ? 'visible' : 'hidden' }}>
                {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div>
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
                    required
                  />
                  <div className={styles.underline}></div>
                  <label>Tax ID</label>
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setTaxIdType(e.target.value)}
                    value={taxIdType}
                    required
                  >
                    <option style={{ display: 'none'}} value=""></option>
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
                    <option style={{ display: 'none'}} value=""></option>
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
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setCountryOfBirth(e.target.value)}
                    value={countryOfBirth}
                    required
                  >
                    <option style={{ display: 'none'}} value=""></option>
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
                    <option style={{ display: 'none'}} value=""></option>
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
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                  <select
                    onChange={e => setFundingSource(e.target.value)}
                    value={fundingSource}
                    required
                  >
                    <option style={{ display: 'none'}} value=""></option>
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
                  <div className={styles.underline}></div>
                </div>
              </div>
              <div style={{ visibility: carousel === 2 ? 'visible' : 'hidden' }}>
                {errors?.map((error, id) => <p className={styles.error} key={id}>{error}</p>)}
              </div>
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
            disabled={errors.length > 0}
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
