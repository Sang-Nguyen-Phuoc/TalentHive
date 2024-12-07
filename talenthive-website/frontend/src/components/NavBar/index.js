import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { removeAccessToken } from "../../utils/authToken";
import styles from '../../styles/components/NavBar.module.css';
import Logo from '../../images/account-logo.png';

const NavBar = () => {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const role = currentUser.role;

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        navigate('/');
        removeAccessToken();
        setCurrentUser({ role: 'guest' });
    }


    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['logo-container']} onClick={() => handleNavigate('/')} >
                <img src="/logo192.png" alt="TalentHive" className={styles["logo"]} />
                <p>TalentHive</p>
            </div>
            <div className={styles['navbar-cta']}>
                <div className={styles['text']} onClick={() => handleNavigate('/about-us')}><span>About Us</span></div>

                {role === 'candidate' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/jobs-applied')}><span>Jobs Applied</span></div>

                        {/* Profile Logo with Dropdown */}
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/profile/dashboard')}>Dashboard</div>
                                <div onClick={() => handleNavigate('/profile/account')}>Account</div>
                                <div onClick={() => handleLogout()}>Log out</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Employer */}
                {role === 'employer' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/hire-talent')}><span>Hire Talent</span></div>
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/profile/dashboard')}>Dashboard</div>
                                <div onClick={() => handleNavigate('/profile/account')}>Account</div>
                                <div onClick={() => handleLogout()}>Log out</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Admin */}
                {role === 'admin' && (
                    <>
                        <div className={styles['manage-option']}>
                            <div className={styles['text']}>
                                <span>Manage</span>
                            </div>
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => handleNavigate('/recruitment')}>Recruitment</div>
                                <div onClick={() => handleNavigate('/manage-workers')}>Worker</div>
                                <div onClick={() => handleNavigate('/manage-employers')}>Employer</div>
                            </div>
                        </div>

                        {/* Log out option */}
                        <div className={styles['text']} onClick={handleLogout}>
                            <span>Log out</span>
                        </div>
                    </>
                )}

                {role === 'guest' && (
                    <>
                        <div className={styles['text']} onClick={() => handleNavigate('/signin')}><span>Sign In</span></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
