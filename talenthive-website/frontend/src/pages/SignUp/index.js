import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Authentication.module.css";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { postSignup } from "../../services/authServices";
import { useUser } from "../../context/UserContext";
import { saveAccessToken } from "../../utils/authToken";

function SignUp() {
    const navigate = useNavigate();
    const { login } = useUser();

    const [passwordRules, setPasswordRules] = useState([]);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [chkbox, setChkbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);
    const roleRef = useRef(null);
    const fullnameRef = useRef(null);

    const validatePassword = (password) => {
        const rules = [
            { regex: /.{10,}/, message: "At least 10 characters" },
            { regex: /[!@#$%^&*(),.?":{}|<>]/, message: "At least 1 symbol (!, @, #, $, ...)" },
            { regex: /[0-9]/, message: "At least 1 number" },
            { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
            { regex: /[a-z]/, message: "At least 1 lowercase letter" },
        ];

        const result = rules.map((rule) => ({
            valid: rule.regex.test(password),
            message: rule.message,
        }));

        return result;
    };

    const handleMatchPassword = () => {
        const password = passwordRef.current.value;
        const confirmPassword = repasswordRef.current.value;
        setPasswordMatch(password === confirmPassword || confirmPassword === "");
    };

    const isFormValid =
        chkbox && passwordRules.every((rule) => rule.valid) && passwordMatch && roleRef.current?.value !== "default";

    const handleSignUp = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const bodyData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            name: fullnameRef.current.value,
            role: roleRef.current.value,
        };

        try {
            const data = await postSignup(bodyData.email, bodyData.password, bodyData.name , bodyData.role);
            console.log({data});
            
            saveAccessToken(data?.accessToken);
            login();
            toast.success("Register successfully!");
            navigate("/create-employer-profile");
        } catch (error) {
            toast.error(error?.message || error);
        }
        setIsLoading(false);
    };

    return (
        <form className={`${styles.form} container p-3 p-sm-4 p-md-5`} onSubmit={handleSignUp}>
            <div className={styles.username}>
                <label htmlFor="usernameInput">
                    Your Name
                    <span>*</span>
                </label>
                <input
                    ref={fullnameRef}
                    className={styles["username-input"]}
                    id="usernameInput"
                    type="text"
                    placeholder="Full name"
                    required
                />
            </div>
            <div className={styles.email}>
                <label htmlFor="emailInput">
                    Email
                    <span>*</span>
                </label>
                <input
                    ref={emailRef}
                    className={styles["email-input"]}
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
                        ref={passwordRef}
                        className={styles["password-input"]}
                        id="passwordInput"
                        type={showPass ? "input" : "password"}
                        placeholder="Password"
                        onChange={() => {
                            setPasswordRules(validatePassword(passwordRef.current.value));
                            handleMatchPassword();
                        }}
                        required
                    />
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={showPass ? faEyeSlash : faEye}
                        onClick={() => setShowPass(!showPass)}
                    />
                </div>
                <ul>
                    {passwordRules.map((rule, index) => (
                        <li key={index} className={`${styles.convention} ${styles[rule.valid ? "valid" : "invalid"]}`}>
                            {rule.message}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.password}>
                <label htmlFor="repasswordInput">
                    Confirm password
                    <span>*</span>
                </label>
                <div className={styles["input-icon-container"]}>
                    <input
                        ref={repasswordRef}
                        className={styles["password-input"]}
                        id="repasswordInput"
                        type={showRePass ? "input" : "password"}
                        placeholder="Confirm password"
                        onChange={() => {
                            handleMatchPassword();
                        }}
                        required
                    />
                    <FontAwesomeIcon
                        className={styles.icon}
                        icon={showRePass ? faEyeSlash : faEye}
                        onClick={() => setShowRePass(!showRePass)}
                    />
                </div>
                {!passwordMatch && <p className={`${styles.invalid} ${styles.convention}`}>Password does not match</p>}
            </div>
            <div className={styles.password}>
                <label htmlFor="roleInput">
                    Role
                    <span>*</span>
                </label>
                <select
                    ref={roleRef}
                    className={styles.dropdown}
                    id="roleInput"
                    defaultValue={"default"}
                    onChange={(e) => (roleRef.current.value = e.target.value)}
                >
                    <option value="employer">Employer</option>
                    <option value="candidate">Candidate</option>
                    <option defaultChecked value="default" disabled>
                        --Choose role--
                    </option>
                </select>
            </div>
            <div className={styles.container}>
                <input
                    type="checkbox"
                    className={styles["checkbox-input"]}
                    checked={chkbox}
                    onChange={(v) => setChkbox(v.target.checked)}
                />
                <p className={styles["policy-content"]}>
                    I have read and agree to TalentHive's
                    <Link to={"/about-us"} className={styles.link}>
                        {" "}
                        Terms & Conditions{" "}
                    </Link>
                    and
                    <Link to={"/about-us"} className={styles.link}>
                        {" "}
                        Privacy Policy
                    </Link>
                </p>
            </div>
            <div className={styles.container}>
                <button type="submit" className={styles.btn} disabled={!isFormValid}>
                    {isLoading ? <span className="spinner-border text-light"></span> : "SIGN UP"}
                </button>
            </div>
            <div className={`${styles.container} ${styles.signin} gap-3`}>
                <p className={`${styles.question} m-0`}>Already have an account?</p>
                <Link to="/signin" className={`${styles.link} ${styles["signup-link"]}`}>
                    Sign in now
                </Link>
            </div>
        </form>
    );
}

export default SignUp;
