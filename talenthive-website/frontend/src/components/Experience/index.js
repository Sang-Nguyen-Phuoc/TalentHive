import styles from '../../styles/components/Experience.module.css';

const Experience = () => {
    return (
        <div className={styles.experience} id='experience'>
            <div className={styles.achievement}>
                <div className={styles.circle}>5+</div>
                <span>years </span>
                <span>Experience</span>
            </div>
            <div className={styles.achievement}>
                <div className={styles.circle}>200+</div>
                <span>Applied </span>
                <span>Jobs</span>
            </div>
            <div className={styles.achievement}>
                <div className={styles.circle}>20+</div>
                <span>companies </span>
                <span>Cooperate</span>
            </div>
        </div>
    );
};

export default Experience;
