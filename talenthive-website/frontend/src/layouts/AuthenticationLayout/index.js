import { Fragment } from "react";
const AuthenticationLayout = ({children}) => {
    return (
        <Fragment>
            <header>Authentication Layout</header>
            <div>{children}</div>
        </Fragment>
    );
}
 
export default AuthenticationLayout;