import React from 'react';
import styles from '../../styles/components/Works.module.css';
import Google from '../../images/gg.png';
import VNG from '../../images/vng.png';
import FPT from '../../images/fpt.png';
import Upwork from '../../images/Upwork.png';
import Vin from '../../images/vin.png';
import { motion } from 'framer-motion';

const Works = () => {
    return (
        <div className={styles.works} id="works">
            <div className={styles.awesome}>
                <span>Places to Connect</span>
                <span>Brands & Companies</span>
                <spane>
                    Lorem ipsum is simply dummy text of printing
                    <br />
                    ipsum is simply dummy text of printing
                    Lorem ipsum is simply dummy text of printing
                    <br />
                    ipsum is simply dummy text of printing
                    Lorem ipsum is simply dummy text of printing
                    <br />
                    ipsum is simply dummy text of printing
                </spane>
            </div>

            {/* right side */}
            <div className={styles['w-right']}>
                <motion.div
                    initial={{ rotate: 45 }}
                    whileInView={{ rotate: 0 }}
                    viewport={{ margin: "-40px" }}
                    transition={{ duration: 3.5, type: "spring" }}
                    className={styles['w-mainCircle']}
                >
                    <div className={styles['w-secCircle']}>
                        <img src={Upwork} alt="Upwork" />
                    </div>
                    <div className={styles['w-secCircle']}>
                        <img src={VNG} alt="VNG" />
                    </div>
                    <div className={styles['w-secCircle']}>
                        <img src={Google} alt="Google" />
                    </div>
                    <div className={styles['w-secCircle']}>
                        <img src={FPT} alt="FPT" />
                    </div>
                    <div className={styles['w-secCircle']}>
                        <img src={Vin} alt="Vin" />
                    </div>
                </motion.div>
                <div className={`${styles['w-backCircle']} ${styles['blueCircle']}`}></div>
                <div className={`${styles['w-backCircle']} ${styles['yellowCircle']}`}></div>
            </div>
        </div>
    );
};

export default Works;
