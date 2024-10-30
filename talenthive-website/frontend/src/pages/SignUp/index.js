import { Link } from 'react-router-dom';
import styles from '../../styles/pages/Authentication.module.css'
import { useState } from 'react';

function SignUp() {
    const rules = [
        'At least 10 characters',
        'At least 1 symbol(!, @, #, $,...)',
        'At least 1 number',
        'At least 1 uppercase letter',
        'At least 1 lowercase letter'
    ]

    let state = Array(rules.length).fill('none');
    
    const [type, setType]  = useState(state);
    const [chkbox, setChkbox] = useState(false);

    const HandlePasswordConvention = (password) => {
        if (password === ''){
            setType(Array(rules.length).fill('none'))
        }
        else {
            state = Array(rules.length).fill('invalid')

            if (password.length >= 10)
                state[0] = 'valid';

            console.log(typeof(password))
            for (var i = 0; i < password.length; i++ ) {
                const c = password[i]
                
                if (c >= '0' && c <= '9'){
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

    const HandleSignUp = () => {

    }

    return (
        <div className={styles.wrapper}>
            <form className = {styles.form}>
                <div className={styles.username}>
                    <label htmlFor='usernameInput'>
                        Company name / User name
                        <span>*</span>
                    </label>
                    <input className={styles['username-input']} id='usernameInput' placeholder='Name' required/>
                </div>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input className={styles['email-input']} id='emailInput' type='email' placeholder='Email' required/>
                </div>
                <div className={styles.password}>
                    <label htmlFor='passwordInput'>
                        Password
                        <span>*</span>
                    </label>
                    <input className={styles['password-input']} 
                        id='passwordInput' 
                        type='password' 
                        placeholder='Password'
                        onChange={ password => HandlePasswordConvention(password.target.value) }  
                        required/>
                    <ul className={styles.convention}>
                        {rules.map((rule, index) => {
                            return <li key={index} className={styles[type[index]]}>{rule}</li>
                        })}
                    </ul>
                </div>
                <div className={styles.container}>
                    <input type="checkbox" className={styles['checkbox-input']} checked={chkbox} onChange={v => setChkbox(v.target.checked)}/>
                    <p className={styles['policy-content']}>I have read and agree to TalentHive's  
                        <Link className={styles.link}> Terms & Conditions </Link>
                        and 
                        <Link className={styles.link}> Privacy Policy</Link>
                    </p>
                </div>
                <div className={styles.container}>
                    <button className={styles.btn} disabled = {!chkbox} onClick={HandleSignUp}>
                        SIGN UP
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signin}`}>
                    <p className={styles.question}>Already have an account?</p>
                    <Link to='/signin' className={`${styles.link} ${styles['signup-link']}`}>SIGN IN now</Link>
                </div>
            </form>
        </div>
    );
}

export default SignUp;