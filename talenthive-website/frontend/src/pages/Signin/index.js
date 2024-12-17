import { Link, useNavigate, Form } from "react-router-dom";
import styles from "../../styles/pages/Authentication.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { postLogin } from "../../services/authServices";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { saveAccessToken } from "../../utils/authToken";

function Signin() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useUser();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataSignIn = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        try {
            const data = await postLogin(dataSignIn.email, dataSignIn.password);
            saveAccessToken(data.accessToken);
            login();
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            toast.error(error?.message || error);
        }
        emailRef.current.focus();
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
                    className={styles["email-input"]}
                    ref={emailRef}
                    id="emailInput"
                    type="email"
                    placeholder="Email"
                    required
                />
            </div>
            <div className={styles.password}>
                <label htmlFor="passwordInput">
                    Password
                    <span>*</span>
                </label>
                <div className={styles["input-icon-container"]}>
                    <input
                        className={styles["password-input"]}
                        ref={passwordRef}
                        id="passwordInput"
                        type={show ? "input" : "password"}
                        placeholder="Password"
                        required
                        defaultValue={"123456789@Aa"}
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
            <div className={`${styles.container} ${styles.signup} align-items-center gap-3`}>
                <p className={`${styles.question} m-0`}>Do you have any account yet?</p>
                <Link to="/signup" className={`${styles.link} ${styles["signup-link"]}`}>
                    Sign up now
                </Link>
            </div>
        </Form>
    );
}

export default Signin;
