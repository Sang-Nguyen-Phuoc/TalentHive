import { Fragment } from "react";

const DefaultLayout = ({children}) => {
    return (
        <Fragment>
            <header>Default Layout</header>
            <div>{children}</div>
        </Fragment>
    );
}
 
export default DefaultLayout;