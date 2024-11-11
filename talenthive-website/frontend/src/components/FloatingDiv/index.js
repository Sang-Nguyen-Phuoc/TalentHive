import React from "react";
import styles from "../../styles/components/FloatingDiv.module.css";

const FloatinDiv = ({ img, text1, text2 }) => {
    return (
        <div className={styles.floatingDiv}>
            <div className={styles["floatingDiv-img"]}>
                <img src={img} alt="" className={styles['image']} />
            </div>

            <span className={styles["floatingDiv-text"]}>
                {text1}
                <br />
                {text2}
            </span>
        </div>
    );
};

export default FloatinDiv;
