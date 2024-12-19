import { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";
import ProgressBar from "../../components/LoadingProgressBar/ProgressBar";

const DefaultLayout = () => {
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-between">
            <ProgressBar />
            <div>
                <Header />
                <div><Outlet/></div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;