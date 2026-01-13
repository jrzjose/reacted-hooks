import * as React from 'react'
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <button className="btn btn-link mb-5" onClick={() => navigate("/")}>Back</button>
            <div className="d-flex justify-content-center align-items-center">
                <h1>you are lost :/</h1>
            </div>
        </>
    );
};

export default NotFound;
