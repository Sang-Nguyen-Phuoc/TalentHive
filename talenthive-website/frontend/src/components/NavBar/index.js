import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import styles from '../../styles/components/NavBar.module.css';
import Logo from '../../images/account-logo.png';

const NavBar = () => {
    const [role, setRole] = useState('worker'); // Set this to 'worker', 'employer', or 'admin' as needed
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        navigate('/signin');
    }


    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['logo-container']} onClick={() => handleNavigate('/')} >
                <img src="/logo192.png" alt="TalentHive" className={styles["logo"]} />
                <p>TalentHive</p>
            </div>
            <div className={styles['navbar-cta']}>
                <div className={styles['text']} onClick={() => handleNavigate('/about-us')}><span>About Us</span></div>

                {role === 'worker' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/jobs-applied')}><span>Jobs Applied</span></div>

                        {/* Profile Logo with Dropdown */}
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/profile-dashboard')}>Dashboard</div>
                                <div onClick={() => handleNavigate('/profile-account')}>Account</div>
                                <div onClick={() => handleNavigate('/logout')}>Log out</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Employer */}
                {role === 'employer' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/hire-talent')}><p>Hire Talent</p></div>
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/profile-dashboard')}>Dashboard</div>
                                <div onClick={() => handleNavigate('/profile-account')}>Account</div>
                                <div onClick={() => handleNavigate('/logout')}>Log out</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Admin */}
                {role === 'admin' && (
                    <>
                        <div className={styles['manage-option']}>
                            <div className={styles['text']}>
                                <p>Manage</p>
                            </div>
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/recruitment')}>Recruitment</div>
                                <div onClick={() => handleNavigate('/worker')}>Worker</div>
                                <div onClick={() => handleNavigate('/employer')}>Employer</div>
                            </div>
                        </div>

                        {/* Log out option */}
                        <div className={styles['text']} onClick={handleLogout}>
                            <p>Log out</p>
                        </div>
                    </>
                )}

                {role === '' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/signin')}><p>Sign In</p></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
