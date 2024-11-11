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
                    Lorem ipsum is simply dummy text of printing
                    ipsum is simply dummy text of printing
                    Lorem ipsum is simply dummy text of printing
                    ipsum is simply dummy text of printing
                    Lorem ipsum is simply dummy text of printing
                    ipsum is simply dummy text of printing
                </spane>
            </div>

            {/* right side */}
            <div className={styles.cards}>
                {/* first card */}
                <motion.div
                    initial={{ top: "1.5rem", left: "40rem" }}
                    whileInView={{ top: "1.5rem", left: "30rem" }}
                    transition={transition}
                >
                    <Card
                        emoji={HeartEmoji}
                        heading="Design"
                        detail="Figma, Sketch, Photoshop, Adobe Illustrator, Adobe XD"
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
                        heading="Developer"
                        detail="HTML, CSS, JavaScript, React, Node.js, Express"
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
                        heading="UI/UX"
                        detail="Lorem ipsum dummy text is used as a placeholder text."
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
