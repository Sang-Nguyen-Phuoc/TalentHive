import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { postVerifyAccessionCode } from "../../services/companyServices";
import { useUser } from "../../context/UserContext";

const EnterCodePage = () => {
    const navigate = useNavigate();
    const { user, role } = useUser();
    
    const [accessionCode, setAccessionCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await postVerifyAccessionCode(accessionCode);
            console.log("Accession code verification response:", data);
            alert("Code entered successfully!");
            navigate(`/employer/${user?._id}/dashboard`);
        } catch (error) {
            console.error("Error while verifying accession code:", error?.message || error);
            setError("Failed to verify accession code. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
    if (role === "guest") {
        alert("Please login to access this page!");
        navigate("/login");
        return null;
    }

    return (
        <div className="shadow-lg p-0 p-sm-4 p-md-5 rounded-3">
            <h1 className="pb-4 fw-bold pt-0 pt-lg-0 border-bottom text-center">Enter Accession Code</h1>
            <Form className="container" onSubmit={handleCodeSubmit}>
                <div className="row mb-3">
                    <label htmlFor="accessionCode" className="col-sm-3 col-xl-2 col-form-label fw-bold">
                        Accession Code*
                    </label>
                    <div className="col-sm-9 col-xl-10">
                        <input
                            type="text"
                            className="form-control"
                            id="accessionCode"
                            name="accessionCode"
                            placeholder="Enter your accession code"
                            value={accessionCode}
                            onChange={(e) => setAccessionCode(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="row pt-4 pb-4 justify-content-center">
                    <div className="col-sm-8 col-xl-6 d-flex">
                        <button type="submit" className="btn btn-primary flex-fill" disabled={loading}>
                            {loading ? (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                "Submit Code"
                            )}
                        </button>
                    </div>
                </div>
            </Form>
            <hr className="m-0" />
            <div className="row mt-4 pb-4 pb-sm-0">
                <div className="col-lg-9 col-xl-10">
                    <p>
                        If you don't have an accession code, please contact your company's administrator. or create a{" "}
                        <Link to="/create-company-access">new one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EnterCodePage;
