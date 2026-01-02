import * as React from 'react'
import { Context } from '../context/AppContext'
import Navbar from './Navbar'
import UploadForm from './UploadForm'

const Layout: React.FC<React.ReactNode> = ({children}:React.ReactNode) => {
    const {dispatch, state} = React.useContext(Context);
    const toggle = (bool:boolean) => dispatch({type: "collapse", payload: {bool}});

    return (
        <>
            <Navbar/>
            <div className="container  mt-5">
                <button className="btn btn-success float-end" onClick={() => toggle(!state.isCollapsed)}>
                    {state.isCollapsed ? 'Close' : '+ Add'}
                </button>
                <div className="clearfix mb-4"></div>
                <UploadForm/>
                {children}
            </div>
        </>
    );
};
export default Layout;