import * as React from "react";
import { Context } from "../context/AppContext";
import { useAuthContext } from "../context/AuthContext";
import Firestore from "../handlers/firestore";
import Storage from "../handlers/storage";

const { writeDoc } = Firestore;
const { uploadFile, downloadFile } = Storage;

const Preview : React.FC = () => {
    const { state } = React.useContext(Context);
    const { inputs: { path } } = state;

    return (
        path && 
            <div className="rounded p-1 m-5" 
                style = {{ width: "30%", height: "300px", backgroundImage: `url(${path})`, backgroundSize:"cover"}}>
            </div>
    );
};

const UploadForm: React.FC = () => {
    const {dispatch, state, read} = React.useContext(Context);
    const { currentUser } = useAuthContext();
    const { isCollapsed: isVisible, inputs } = state;

    const handleOnChange = (e:any) => {
        dispatch({type: 'setInputs', payload: {value: e}})
    };

    const username = !!currentUser ? currentUser?.displayName.split(" ").join("") : "x" ;

    const handleOnSubmit = (e:any) => {
        e.preventDefault();
        uploadFile(state.inputs)
        .then(downloadFile)
        .then((url:string) => {
            writeDoc({...inputs, path: url, user: username.toLowerCase()}, "stocks").then(() => {
                read();
                dispatch({ type: "collapse", payload: { bool: false } });
            })
        })
    };

    const isDisabled = React.useMemo( ():boolean => {
        return !!Object.values(state.inputs).some(input => !input);
    }, [state.inputs]);
    
    return (
        isVisible && 
        <>
            <p className="display-6 text-center mb-3">Upload Image</p>
            <div className="mb-5 d-flex align-items-center justify-content-center">
                <Preview/>
                <form className="mb-2" style={{ textAlign: "left" }} onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control"
                            name="title"
                            placeholder="title"
                            aria-describedby="text"
                            onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="file" className="form-control" name="file" onChange={handleOnChange}/>
                    </div>
                    <button type="submit" className="btn btn-success float-end" disabled={isDisabled}>
                        Save and upload
                    </button>
                </form>
            </div>
        </>
    );
};

export default UploadForm;