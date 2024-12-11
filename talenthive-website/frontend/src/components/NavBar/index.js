import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { removeAccessToken } from "../../utils/authToken";
import styles from '../../styles/components/NavBar.module.css';
import Logo from '../../images/account-logo.png';
import { useUser } from "../../context/UserContext";

const NavBar = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [role, setRole] = useState(localStorage.getItem('role') || 'guest');

    console.log("User: ", user);
    

    useEffect(() => {
        if (user?.user) {
            setRole(user?.user?.role);
            localStorage.setItem('role', user?.user?.role);
        }
    }, [user]);

    const handleLogout = () => {
        removeAccessToken();
        navigate('/');
        setRole('guest');
    }


    return (
        <div className={styles["navbar-container"]}>
            <div className={styles['logo-container']} onClick={() => navigate('/')} >
                <img src="/logo192.png" alt="TalentHive" className={styles["logo"]} />
                <p>TalentHive</p>
            </div>
            <div className={styles['navbar-cta']}>
                <div className={styles['text']} onClick={() => navigate('/about-us')}><span>About Us</span></div>

                {role === 'candidate' && (
                    <>
                        <div className={styles['text']} onClick={() => navigate('/jobs-applied')}><span>Jobs Applied</span></div>

                        {/* Profile Logo with Dropdown */}
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => navigate('/profile/dashboard')}>Dashboard</div>
                                <div onClick={() => navigate('/profile/account')}>Account</div>
                                <div onClick={() => handleLogout()}>Log out</div>
                            </div>
                        </div>
                    </>
                )}

                {/* Employer */}
                {role === 'employer' && (
                    <>
                        <div className={styles['text']} onClick={() => navigate('/dashboard/jobs')}><span>Dashboard</span></div>
                        <div className={styles['profile-logo-container']}>
                            <img src={Logo} alt="Profile" className={styles["profile-logo"]} />
                            <div className={styles['dropdown-menu']}>
                                <div onClick={() => navigate('/profile/dashboard')}>Dashboard</div>
                                <div onClick={() => navigate('/profile/account')}>Account</div>
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
                                <div onClick={() => navigate('/recruitment')}>Recruitment</div>
                                <div onClick={() => navigate('/manage-workers')}>Worker</div>
                                <div onClick={() => navigate('/manage-employers')}>Employer</div>
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
                        <div className={styles['text']} onClick={() => navigate('/signin')}><span>Sign In</span></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
