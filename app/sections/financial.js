import { useEffect, useState } from "react";
import { taxIdTypes, incomeSources } from "../financial"; // Import financial-related data like tax ID types and income sources.
import { countries } from "../location"; // Import location-related data like states and countries.
import styles from "../page.module.css"; // Import CSS module for styling.

export function Financial({ taxId, setTaxId, taxIdType, setTaxIdType, countryOfCitizenship, setCountryOfCitizenship, countryOfBirth, setCountryOfBirth, countryOfResidence, setCountryOfResidence, fundingSource, setFundingSource, errors }) {
    // const [errors, setErrors] = useState({}); // State to store form validation errors.

    return (
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
                    <input
                        type="text"
                        list="taxIdTypes"
                        onChange={e => setTaxIdType(e.target.value)}
                        value={taxIdType}
                        required
                    />
                    <datalist className={styles.taxIdTypes} id="taxIdTypes">
                        {taxIdTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </datalist>
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
                    <input
                        type="text"
                        list="countries"
                        onChange={e => setCountryOfCitizenship(e.target.value)}
                        value={countryOfCitizenship}
                        required
                    />
                    <datalist className={styles.countries} id="countries">
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </datalist>
                    <label
                        style={{ zIndex: 1 }}
                    >
                        Country of Citizenship
                    </label>
                    {errors.countryOfCitizenship && <p className={styles.error}>{errors.countryOfCitizenship}</p>}
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                    <input
                        type="text"
                        list="countries"
                        onChange={e => setCountryOfBirth(e.target.value)}
                        value={countryOfBirth}
                        required
                    />
                    <datalist className={styles.countries} id="countries">
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </datalist>
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
                    <input
                        type="text"
                        list="countries"
                        onChange={e => setCountryOfResidence(e.target.value)}
                        value={countryOfResidence}
                        required
                    />
                    <datalist className={styles.countries} id="countries">
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </datalist>
                    <label
                        style={{ zIndex: 1 }}
                    >
                        Country of Residence
                    </label>
                    {errors.countryOfResidence && <p className={styles.error}>{errors.countryOfResidence}</p>}
                    <div className={styles.underline}></div>
                </div>
                <div className={styles.inputData}>
                    <input
                        onChange={e => setFundingSource(e.target.value)}
                        value={fundingSource}
                        type="text"
                        list="income"
                        required
                    />
                    <datalist className={styles.countries} id="income">
                        {incomeSources.map((source, index) => (
                            <option key={index} value={source}>
                                {source}
                            </option>
                        ))}
                    </datalist>
                    <label
                        style={{ zIndex: 1 }}
                    >
                        Funding Source
                    </label>
                    {errors.fundingSource && <p className={styles.error}>{errors.fundingSource}</p>}
                    <div className={styles.underline}></div>
                </div>
            </div>
        </div>
    )
};
