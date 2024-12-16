import styles from '../../styles/components/Logo.module.css'
import { Link } from 'react-router-dom';
const Logo = () => {
    return (
        <div  className="p-4 ps-2" >
            <Link to='/' className={styles.wrapper}>
                <img src="/logo192.png" alt="TalentHive" className={styles.img} />
                <p className={styles.name}>TalentHive</p>
            </Link>
        </div>
    );
}
 
export default Logo;