import styles from '../../styles/components/Experience.module.css';

const Experience = () => {
    return (
        <div className={styles.experience} id='experience'>
            <div className={styles.achievement}>
                <div className={styles.circle}>1+</div>
                <span>years </span>
                <span>Experience</span>
            </div>
            <div className={styles.achievement}>
                <div className={styles.circle}>100+</div>
                <span>Applied </span>
                <span>Jobs</span>
            </div>
            <div className={styles.achievement}>
                <div className={styles.circle}>10+</div>
                <span>companies </span>
                <span>Cooperate</span>
            </div>
        </div>
    );
};

export default Experience;
