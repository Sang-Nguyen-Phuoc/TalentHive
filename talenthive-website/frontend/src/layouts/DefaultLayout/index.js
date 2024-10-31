import { Fragment } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <div>{children}</div>
            <Footer />
        </Fragment>
    );
}

export default DefaultLayout;