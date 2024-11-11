import { BsFacebook, BsGithub, BsInstagram } from "react-icons/bs";
import styles from "../../styles/components/Intro.module.css";
import Vector1 from "../../images/Vector1.png";
import Vector2 from "../../images/Vector2.png";
import Crown from "../../images/crown.png";
import ThumbUp from "../../images/thumbup.png";
import FloatingDiv from "../FloatingDiv";
import { motion } from "framer-motion";

const Intro = ({ name, mainRole, description, img, ig, fb, github, index }) => {
    const transition = { duration: 2, type: "spring" };
    const isEven = index % 2 === 0;

    return (
        <div className={`${styles.Intro} ${isEven ? styles.even : styles.odd}`} id="Intro">
            {/* left name side */}
            <div className={styles["i-left"]}>
                <div className={styles["i-name"]}>
                    <span>{name}</span>
                    <span>{mainRole}</span>
                    <span>{description}</span>
                </div>
                <div className={styles["i-icons"]}>
                    <a href={fb} target="_blank" rel="noopener noreferrer" className={styles["i-icon"]}><BsFacebook /></a>
                    <a href={github} target="_blank" rel="noopener noreferrer" className={styles["i-icon"]}><BsGithub /></a>
                    <a href={ig} target="_blank" rel="noopener noreferrer" className={styles["i-icon"]}><BsInstagram /></a>
                </div>
            </div>
            {/* right image side */}
            <div className={styles["i-right"]}>
                <img src={Vector1} alt="Vector1" />
                <img src={Vector2} alt="Vector2" />
                <div className={styles["img-container"]}>
                    <img src={img} alt={name} className={styles["i-img"]} />
                </div>
                <motion.div
                    initial={{ top: "-1rem", left: "100%" }}
                    whileInView={{ left: "70%" }}
                    transition={transition}
                    className={styles["floating-div"]}
                >
                    <FloatingDiv img={Crown} text1="Backend" text2="Leader" />
                </motion.div>
                <motion.div
                    initial={{ left: "4rem", top: "23rem" }}
                    whileInView={{ left: "8rem" }}
                    transition={transition}
                    className={styles["floating-div"]}
                >
                    <FloatingDiv img={ThumbUp} text1="Best Design" text2="Award" />
                </motion.div>
            </div>
        </div>
    );
};

export default Intro;

