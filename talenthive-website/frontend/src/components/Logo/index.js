import styles from '../../styles/components/Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.wrapper}>
            <img src="/logo192.png" alt="TalentHive" className={styles.img} />
            <p className={styles.name}>TalentHive</p>
        </div>
    );
}
 
export default Logo;