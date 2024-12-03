import { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router";

const DefaultLayout = () => {
    return (
        <Fragment>
            <Header />
            <div><Outlet/></div>
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;