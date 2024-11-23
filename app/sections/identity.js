import styles from "../page.module.css"; // Import CSS module for styling.

export function Identity({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, dob, setDob, errors }) {

    // Function to trigger the native date picker on click.
    const datePickerHandler = (e) => {
        e.preventDefault();
        const datePicker = document.getElementById("datePicker");
        datePicker.showPicker();
    };

    return (
        <div className={styles.formInnerWrapper}>
            <h2>1. Identity</h2>
            <div className={styles.forScrolling}>
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
            </div>
        </div>
    )
}
