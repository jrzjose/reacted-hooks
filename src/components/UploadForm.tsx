import * as React from "react";
import { Context } from "../context/AppContext";

const Preview : React.FC = () => {
    const { state } = React.useContext(Context);
    const { inputs } = state;

    return (
        inputs.path && 
            <div className="rounded p-1 m-5" 
                style = {{ width: "30%", height: "300px", backgroundImage:`url(${inputs.path})`, backgroundSize:"cover"}}>
            </div>
    );
};

const UploadForm: React.FC = () => {
    const {dispatch, state} = React.useContext(Context);
    const handleOnChange = (e:any) => {
        dispatch({type: 'setInputs', payload: {value: e}})
    };

    const handleOnSubmit = (e:any) => {
        e.preventDefault();
        dispatch({type:'setItem'});
        dispatch({type:'collapse', payload: {bool: false}});
    };

    const isDisabled = React.useMemo( 
        ():boolean => {
            return !!Object.values(state.inputs).some(input => !input);
        }, [state.inputs]);
    
    return (
        state.isCollapsed && 
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
                        Save changes
                    </button>
                </form>
            </div>
        </>
    );
};

export default UploadForm;