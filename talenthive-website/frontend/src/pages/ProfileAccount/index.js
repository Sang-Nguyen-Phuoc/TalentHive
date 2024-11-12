import { useRef, useState } from 'react';
import styles from '../../styles/pages/ProfileAccount.module.css';

const ProfileAccount = () => {
    const rules = [
        'At least 10 characters',
        'At least 1 symbol (!, @, #, $, ...)',
        'At least 1 number',
        'At least 1 uppercase letter',
        'At least 1 lowercase letter'
    ];

    const [type, setType] = useState(Array(rules.length).fill('none'));
    const [confirm, setConfirm] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const currentPasswordRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);

    const handleValidatePassword = (password) => {
        if (password === '') {
            setType(Array(rules.length).fill('none'));
            setIsPasswordValid(false);
        } else {
            let state = Array(rules.length).fill('invalid');

            if (password.length >= 10) state[0] = 'valid';
            for (const c of password) {
                if (c >= '0' && c <= '9') state[2] = 'valid';
                else if (c >= 'A' && c <= 'Z') state[3] = 'valid';
                else if (c >= 'a' && c <= 'z') state[4] = 'valid';
                else state[1] = 'valid';
            }

            setType(state);
            setIsPasswordValid(state.every((s) => s === 'valid'));
        }
    };

    const handleConfirmPassword = (repassword) => {
        setConfirm(repassword === passwordRef.current.value);
    };

    const handleUpdatePassword = () => {
        // Update password here
        alert('Password updated: ' + passwordRef.current.value);
        // Clear password fields
        currentPasswordRef.current.value = '';
        passwordRef.current.value = '';
        repasswordRef.current.value = '';
        // Reset states
        setType(Array(rules.length).fill('none'));
        setConfirm(false);
        setIsPasswordValid(false);

        // Focus on the first password field
        currentPasswordRef.current.focus();
    }

    return (
        <div className={styles.container}>
            <div className={styles.account}>
                <div className={styles.title}>
                    <h1>My Account</h1>
                </div>
                <div className={styles.info}>
                    <table>
                        <tr>
                            <td>Username</td>
                            <td>John Doe</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>abc@sample.com</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div className={styles.account}>
                <div className={styles.title}>
                    <h1>Change Password</h1>
                </div>
                <div className={styles.info}>
                    {/* Current Password Field */}
                    <div className={styles.password}>
                        <input
                            ref={currentPasswordRef}
                            className={styles['password-input']}
                            id="currentPasswordInput"
                            type="password"
                            placeholder="Current Password"
                            required
                        />
                    </div>

                    {/* New Password Field */}
                    <div className={styles.password}>
                        <input
                            ref={passwordRef}
                            className={styles['password-input']}
                            id="passwordInput"
                            type="password"
                            placeholder="New Password"
                            onChange={(e) => handleValidatePassword(e.target.value)}
                            required
                        />
                        <ul>
                            {rules.map((rule, index) => (
                                <li key={index} className={`${styles[type[index]]} ${styles.convention}`}>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Confirm Password Field */}
                    <div className={styles.password}>
                        <input
                            ref={repasswordRef}
                            className={styles['password-input']}
                            id="repasswordInput"
                            type="password"
                            placeholder="Confirm New Password"
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                            required
                        />
                        {!confirm && (
                            <p className={`${styles.invalid} ${styles.convention} ${styles.inform}`}>
                                Password does not match
                            </p>
                        )}
                    </div>

                    {/* Update New Password Button */}
                    <button
                        className={`${styles.button} ${!isPasswordValid || !confirm ? styles['disabled-button'] : styles['enabled-button']}`}
                        disabled={!isPasswordValid || !confirm}
                        onClick={handleUpdatePassword}
                    >
                        Update New Password
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProfileAccount;
