import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Authentication.module.css'
import { useEffect, useRef, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import toast, { Toaster } from 'react-hot-toast';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const REACT_APP_BASEURL = "http://localhost:3002";
const reqAPI = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null,
};

function SignUp() {
    const handleValidatePassword = (password) => {
        if (password === '') {
            setType(Array(rules.length).fill('none'));
        }
        else {
            let state = Array(rules.length).fill('invalid');

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

            setType(state);
        }
    }

    const handleConfirmPassword = (repassword) => {
        if (repassword === passwordRef.current.value) {
            setConfirm(true);
        }
        else {
            setConfirm(false);
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault();

        const newDataSignUp = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'role': roleRef.current.value
        }
        
        emailRef.current.value = '';
        passwordRef.current.value = '';
        repasswordRef.current.value = '';
        roleRef.current.value = 'default';
        setType(Array(rules.length).fill('none'));
        emailRef.current.focus();
        setRole('default');
        reqAPI.body = JSON.stringify(newDataSignUp);
    }

    const rules = [
        'At least 10 characters',
        'At least 1 symbol(!, @, #, $,...)',
        'At least 1 number',
        'At least 1 uppercase letter',
        'At least 1 lowercase letter'
    ]

    const navigate = useNavigate();

    const [type, setType] = useState(Array(rules.length).fill('none'));
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);
    const [chkbox, setChkbox] = useState(false);
    const [confirm, setConfirm] = useState(true);
    const [role, setRole] = useState('default');

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);
    const roleRef = useRef(null);

    // Fetch API
    const {payload, status} = useFetch(`${REACT_APP_BASEURL}/api/v1/auth/register`, reqAPI);

    useEffect(() => {
        if (status === 'success'){
            toast.success('Register successfully!');
            const navi = setTimeout(() => navigate('/signin'), 2000);
        }
        else if (status !== 'fail') {
            toast.error(status);
        }
        reqAPI.body = null;
    }, [payload, status])

    return (
        <div className={styles.wrapper}>
            <Toaster 
                position='top-right'
                reverseOrder={false}
            />
            <form className={styles.form} onSubmit={handleSignUp}>
                <div className={styles.username}>
                    <label htmlFor='usernameInput'>
                        Full name
                        <span>*</span>
                    </label>
                    <input
                        className={styles['username-input']}
                        id='usernameInput'
                        placeholder='Full name'
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
                    <div className={styles['input-icon-container']}>
                        <input ref={passwordRef}
                            className={styles['password-input']}
                            id='passwordInput'
                            type={showPass ? 'input' : 'password'}
                            placeholder='Password'
                            onChange={password => handleValidatePassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showPass ? faEyeSlash : faEye} onClick={() => setShowPass(!showPass)}/>
                    </div>
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
                    <div className={styles['input-icon-container']}>
                        <input ref={repasswordRef}
                            className={styles['password-input']}
                            id='repasswordInput'
                            type={showRePass ? 'input' : 'password'}
                            placeholder='Confirm password'
                            onChange={password => handleConfirmPassword(password.target.value)}
                            required
                        />
                        <FontAwesomeIcon className={styles.icon} icon={showRePass ? faEyeSlash : faEye} onClick={() => setShowRePass(!showRePass)}/>
                    </div>
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
                        <option value="employer">Employer</option>
                        <option value="candidate">Candidate</option>
                        <option value="default" disabled>--Choose role--</option>
                    </select>
                </div>
                <div className={styles.container}>
                    <input type="checkbox"
                        className={styles['checkbox-input']}
                        checked={chkbox}
                        onChange={v => setChkbox(v.target.checked)} />
                    <p className={styles['policy-content']}>I have read and agree to TalentHive's
                        <Link to={'/about-us'} className={styles.link}> Terms & Conditions </Link>
                        and
                        <Link to={'/about-us'} className={styles.link}> Privacy Policy</Link>
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