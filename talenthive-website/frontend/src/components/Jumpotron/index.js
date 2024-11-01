import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/Jumpotron.module.css';

const Jumbotron = () => {
    const [isVisible, setIsVisible] = useState(false);
    const jumbotronRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            { threshold: 0.5 } // Adjust threshold as needed
        );

        if (jumbotronRef.current) {
            observer.observe(jumbotronRef.current);
        }

        return () => {
            if (jumbotronRef.current) observer.unobserve(jumbotronRef.current);
        };
    }, []);

    return (
        <div
            ref={jumbotronRef}
            className={`${styles.jumbotron} ${isVisible ? styles.visible : ''}`}
        >
            <div className={styles.content}>
                <p className={styles.introText}>With our support,</p>
                <h1 className={styles.mainText}>YOU CAN APPLY<br />FOR JOBS FROM</h1>
            </div>
        </div>
    );
};

export default Jumbotron;
