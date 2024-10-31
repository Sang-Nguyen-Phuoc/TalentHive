import { Link } from 'react-router-dom';
import styles from '../../styles/pages/Authentication.module.css';

function Signin() {
    return (
        <div className={styles.wrapper}>
            <form className = {styles.form}>
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
                    <input className={styles['password-input']} id='passwordInput' type='password' placeholder='Password' required/>
                    <div>
                        <Link to='/forgot-password' className={styles.link}>Forgot Password?</Link>
                    </div>
                </div>
                <div className={styles.container}>
                    <button className={styles.btn}>
                        SIGN IN
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signup}`}>
                    <p className={styles.question}>Do you have any account yet?</p>
                    <Link to='/signup' className={`${styles.link} ${styles['signup-link']}`}>SIGN UP now</Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;