import { useNavigate } from 'react-router-dom';
import styles from '../../styles/pages/Authentication.module.css';
import { useRef } from 'react';

function ForgotPassword() {
    const navigate = useNavigate()

    const emailRef = useRef(null)

    const handleResetPassword = (e) => {
        e.preventDefault();

        const data = {
            'email': emailRef.current.value,
        }
    }
    return (
        <div className={styles.wrapper}>
            <form className = {styles.form} onSubmit={handleResetPassword}>
                <div className={styles.email}>
                    <label htmlFor='emailInput'>
                        Email
                        <span>*</span>
                    </label>
                    <input className={styles['email-input']} 
                           ref={emailRef}
                           id='emailInput' 
                           type='email' 
                           placeholder='Email' 
                           required
                    />
                </div>
                <div className={styles.container}>
                    <button type='submit' className={`${styles.btn} ${styles.fp}`}>
                        RESET PASSWORD
                    </button>
                </div>
                <div className={styles.container}><strong>OR</strong></div>
                <div className={styles.container}>
                    <button type='button' className={`${styles.btn} ${styles.normal} ${styles.fp}`} onClick={() => navigate('/signin')}>
                        SIGN IN
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;