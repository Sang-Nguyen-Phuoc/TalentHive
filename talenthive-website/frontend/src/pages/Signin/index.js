import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Authentication.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/Constants";
import { saveAccessToken } from "../../utils/authToken";

const reqAPI = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: null,
};

function Signin() {
    const handleSignIn = (e) => {
        e.preventDefault();

        const dataSignIn = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        emailRef.current.value = "";
        emailRef.current.focus();
        passwordRef.current.value = "";

        setShow(false);
        setFetch({...fetch, body: JSON.stringify(dataSignIn)});
    };

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [show, setShow] = useState(false);
    const [fetch, setFetch] = useState(reqAPI);
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(CurrentUserContext);

    // Call API
    const { payload, status } = useFetch(`${BASE_URL}/auth/login`, fetch);

    useEffect(() => {
        if (status === "success") {
            toast.success("Sign in successfully!");
            saveAccessToken(payload.accessToken);
            setCurrentUser(payload);
            navigate("/");
        } else if (status !== "fail") {
            toast.error(status);
        }
        setFetch({...fetch, body: null})
    }, [payload, status, setCurrentUser]);

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSignIn}>
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
                    <button type="submit" className={styles.btn}>
                        SIGN IN
                    </button>
                </div>
                <div className={`${styles.container} ${styles.signup}`}>
                    <p className={styles.question}>Do you have any account yet?</p>
                    <Link to="/signup" className={`${styles.link} ${styles["signup-link"]}`}>
                        Sign up now
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Signin;
