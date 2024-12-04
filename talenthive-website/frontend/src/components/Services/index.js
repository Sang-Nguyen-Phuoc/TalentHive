import HeartEmoji from "../../images/heartemoji.png";
import Card from "../Card";
import Glasses from "../../images/glasses.png";
import Humble from "../../images/humble.png";
import { motion } from "framer-motion";
import styles from "../../styles/components/Services.module.css";

const Services = () => {
    // transition
    const transition = {
        duration: 1,
        type: "spring",
    };

    return (
        <div className={styles.services} id="services">
            {/* left side */}
            <div className={styles.awesome}>
                <span>Our Awesome</span>
                <span>Services</span>
                <spane>
                    We provide a wide range of innovative and reliable services designed to meet your needs.
                    From cutting-edge technology solutions to personalized support, our offerings are crafted
                    to help you achieve your goals efficiently and effectively. Whether you're looking for
                    creative designs, seamless integrations, or expert consultations, we are here to deliver
                    excellence every step of the way.
                </spane>

            </div>

            {/* right side */}
            <div className={styles.cards}>


                <motion.div
                    initial={{ top: "1.5rem", left: "40rem" }}
                    whileInView={{ top: "1.5rem", left: "30rem" }}
                    transition={transition}
                >
                    <Card
                        emoji={HeartEmoji}
                        heading="Pros Networking"
                        detail="Expand your network and connect with professionals."
                        style={{ background: "purple" }}
                    />
                </motion.div>

                {/* second card */}
                <motion.div
                    initial={{ left: "-11rem", top: "12rem" }}
                    whileInView={{ left: "4rem" }}
                    transition={transition}
                >
                    <Card
                        emoji={Glasses}
                        heading="Job Opportunities"
                        detail="Find job openings that match your skills, interests, and career aspirations, all in one place."
                    />
                </motion.div>

                {/* third card */}
                <motion.div
                    initial={{ top: "22rem", left: "32rem" }}
                    whileInView={{ top: "22rem", left: "24rem" }}
                    transition={transition}
                >
                    <Card
                        emoji={Humble}
                        heading="Skill Development"
                        detail="Access resources to upskill and stay ahead in a competitive job market with ease."
                    />
                </motion.div>



                <div
                    className={`${styles.blur} ${styles.sBlur2}`}
                    style={{ background: "var(--purple)" }}
                ></div>
            </div>
        </div>
    );
};

export default Services;
