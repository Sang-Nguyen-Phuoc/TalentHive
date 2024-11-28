import { Outlet } from "react-router";
import Logo from "../../components/Logo";
import styles from '../../styles/layouts/AuthenticationLayout.module.css'

const AuthenticationLayout = () => {
    return (
        <div className = {styles.wrapper}>
            <Logo className = {styles.logo}/>
            <div className = {styles.form}><Outlet/></div>
        </div>
    );
}
 
export default AuthenticationLayout;