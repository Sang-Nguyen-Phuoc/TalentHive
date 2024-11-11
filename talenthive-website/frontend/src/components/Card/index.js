import React from "react";
import styles from "../../styles/components/Card.module.css";
import { useNavigate } from "react-router";

const Card = ({ emoji, heading, detail }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.card}>
            <img src={emoji} alt="" />
            <span>{heading}</span>
            <span>{detail}</span>
            <button className={styles.cButton} onClick={
                () => navigate("/")
            }>LEARN MORE</button>
        </div>
    );
};

export default Card;
