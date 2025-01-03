import { Link, useNavigate, Form } from "react-router-dom";
import styles from "../../styles/pages/Authentication.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { postLogin } from "../../services/authServices";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { saveAccessToken } from "../../utils/authToken";

function Signin() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useUser();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        const dataSignIn = Object.fromEntries(formData.entries());

        try {
            const data = await postLogin(dataSignIn.email, dataSignIn.password);
            saveAccessToken(data.accessToken);
            login();
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error(error?.message || error);
        }
        // emailRef.current.focus();
        setShow(false);
        setIsSubmitting(false);
    };

    return (
        <Form className={`${styles.form} container p-3 p-sm-4 p-md-5 `} onSubmit={handleSignIn}>
            <div className={styles.email}>
                <label htmlFor="emailInput">
                    Email
                    <span>*</span>
                </label>
                <input
                    className="form-control"
                    id="emailInput"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                />
            </div>
            <div className={styles.password}>
                <label htmlFor="password">
                    Password
                    <span>*</span>
                </label>
                <div className={styles["input-icon-container"]}>
                    <input
                        className="form-control"
                        id="password"
                        type={show ? "text" : "password"}
                        placeholder="enter your password"
                        required
                        name="password"
                    />
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={show ? faEyeSlash : faEye}
                        onClick={() => setShow(!show)}
                    />
                </div>
                <div>
                    <Link to="/forgot-password" className={styles.link}>
                        Forgot Password?
                    </Link>
                </div>
            </div>
            <div className={styles.container}>
                <motion.button
                    type="submit"
                    className={styles.btn}
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ translateY: "-5px" }}
                >
                    {isSubmitting ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{
                                height: "27px",
                                aspectRatio: 1,
                                border: "3px solid #fff",
                                borderTop: "3px solid transparent",
                                borderRadius: "50%",
                                margin: "0 auto",
                            }}
                        />
                    ) : (
                        "SIGN IN"
                    )}
                </motion.button>
            </div>
            <div className={`${styles.container} ${styles.signup} align-items-center gap-2`}>
                <p className={`${styles.question} m-0`}>Do you have any account yet?</p>
                <Link to="/signup" className={`${styles.link} ${styles["signup-link"]}`}>
                    Sign up now
                </Link>
            </div>
        </Form>
    );
}

export default Signin;
