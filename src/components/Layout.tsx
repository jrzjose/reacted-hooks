import * as React from 'react'
import { Context } from '../context/AppContext'
import Navbar from './Navbar'
import UploadForm from './UploadForm'
import { useAuthContext } from "../context/AuthContext";


const AddButton: React.FC = () => {
    const { state, dispatch } = React.useContext(Context);
    const { isCollapsed: isVisible } = state; // destructuring the current state
    const toggle = (bool: boolean) => dispatch({ type: "collapse", payload: { bool } });
    return (
        <>
            <button className="btn btn-success float-end" onClick={() => toggle(!isVisible)} >
                {isVisible ? "Close" : "+ Add"}
            </button>
            <div className="clearfix mb-4"></div>
        </>
    );
}

const Layout: React.FC<React.ReactNode> = ({ children }: React.ReactNode) => {
    const { read } = React.useContext(Context);
    const { authenticate } = useAuthContext();

    React.useEffect(() => {
        read();
        authenticate();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container  mt-5">
                <AddButton/>
                <UploadForm />
                {children}
            </div>
        </>
    );
};
export default Layout;