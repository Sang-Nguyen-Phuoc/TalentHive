import { Link } from 'react-router-dom';
import styles from '../../styles/pages/Authentication.module.css'
import { useRef, useState } from 'react';

function SignUp() {
    const rules = [
        'At least 10 characters',
        'At least 1 symbol(!, @, #, $,...)',
        'At least 1 number',
        'At least 1 uppercase letter',
        'At least 1 lowercase letter'
    ]

    const [type, setType] = useState(Array(rules.length).fill('none'));
    const [chkbox, setChkbox] = useState(false);
    const [confirm, setConfirm] = useState(true);
    const [role, setRole] = useState('default')

    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const repasswordRef = useRef(null)
    const roleRef = useRef(null)

    const handleValidatePassword = (password) => {
        if (password === '') {
            setType(Array(rules.length).fill('none'))
        }
        else {
            let state = Array(rules.length).fill('invalid')

            if (password.length >= 10)
                state[0] = 'valid';
            for (var i = 0; i < password.length; i++) {
                const c = password[i]

                if (c >= '0' && c <= '9') {
                    state[2] = 'valid';
                }
                else if (c >= 'A' && c <= 'Z') {
                    state[3] = 'valid';
                }
                else if (c >= 'a' && c <= 'z') {
                    state[4] = 'valid';
                }
                else {
                    state[1] = 'valid';
                }
            }

            setType(state)
        }
    }

    const handleConfirmPassword = (repassword) => {
        if (repassword === passwordRef.current.value) {
            setConfirm(true)
        }
        else {
            setConfirm(false)
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const signupData = {
            'name': usernameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'role': roleRef.current.value
        }

        console.log(signupData)
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.username}>
                    <label htmlFor='usernameInput'>
                        Username
                        <span>*</span>
                    </label>
                    <input ref={usernameRef}
                        className={styles['username-input']}
                        id='usernameInput'
                        placeholder='Fullname'
                        required
                    />
                </div>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input ref={emailRef}
                        className={styles['email-input']}
                        id='emailInput'
                        type='email'
                        placeholder='Email'
                        required
                    />
                </div>
                <div className={styles.password}>
                    <label htmlFor='passwordInput'>
                        Password
                        <span>*</span>
                    </label>
                    <input ref={passwordRef}
                        className={styles['password-input']}
                        id='passwordInput'
                        type='password'
                        placeholder='Password'
                        onChange={password => handleValidatePassword(password.target.value)}
                        required />
                    <ul>
                        {rules.map((rule, index) => {
                            return <li key={index} className={`${styles[type[index]]} ${styles.convention}`}>{rule}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.password}>
                    <label htmlFor='repasswordInput'>
                        Confirm password
                        <span>*</span>
                    </label>
                    <input ref={repasswordRef}
                        className={styles['password-input']}
                        id='repasswordInput'
                        type='password'
                        placeholder='Confirm password'
                        onChange={password => handleConfirmPassword(password.target.value)}
                        required />
                    {confirm || <p className={`${styles.invalid} ${styles.convention} ${styles.inform}`}>Password does not match</p>}
                </div>
                <div className={styles.password}>
                    <label htmlFor='roleInput'>
                        Role
                        <span>*</span>
                    </label>
                    <select ref={roleRef}
                        className={styles.dropdown}
                        id="roleInput"
                        defaultValue={'default'}
                        onChange={e => setRole(e.target.value)}>
                        <option value="Employer">Employer</option>
                        <option value="Worker">Worker</option>
                        <option value="default" disabled>--Choose role--</option>
                    </select>
                </div>
                <div className={styles.container}>
                    <input type="checkbox"
                        className={styles['checkbox-input']}
                        checked={chkbox}
                        onChange={v => setChkbox(v.target.checked)} />
                    <p className={styles['policy-content']}>I have read and agree to TalentHive's
                        <Link className={styles.link}> Terms & Conditions </Link>
                        and
                        <Link className={styles.link}> Privacy Policy</Link>
                    </p>
                </div>
                <div className={styles.container}>
                    <button type='submit'
                        className={styles.btn}
                        disabled={!chkbox
                            || type.includes('none')
                            || type.includes('invalid')
                            || !confirm
                            || repasswordRef.current.value === ''
                            || role === 'default'}>
                        SIGN UP
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signin}`}>
                    <p className={styles.question}>Already have an account?</p>
                    <Link to='/signin' className={`${styles.link} ${styles['signup-link']}`}>Sign in now</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;