import { states, countries } from "../location"; // Import states and countries data.
import styles from "../page.module.css"; // Import CSS module for styling.

export function Contact({ email, setEmail, phone, setPhone, address, setAddress, unit, setUnit, city, setCity, state, setState, country, setCountry, zip, setZip, errors }) {

    return (
        <div className={styles.formInnerWrapper}>
            <h2>2. Contact</h2>
            <div className={styles.forScrolling}>
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
                        <input
                            type="text"
                            list="states"
                            onChange={e => setState(e.target.value)}
                            value={state}
                            required
                        />
                        <datalist className={styles.states} id="states">
                            {states.map((state, index) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                            ))}
                        </datalist>
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
                        <input
                            type="text"
                            list="countries"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
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
            </div>
        </div >
    )
}
