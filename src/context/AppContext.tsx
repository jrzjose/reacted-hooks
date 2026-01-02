import {createContext, useReducer, ReactNode } from "react";
import type { State, Action, Input } from "./Types";

export const Context = createContext();

const initialState: State =  {
    items: [], 
    count: 0, 
    inputs: {}, 
    isCollapsed: false
}

const handleOnChange = (state: State, e:any):Input => {
    if (e.target.name === 'file') {
        console.log({file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])});
        
        return {...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0])};
    }
    else {
        return {...state.inputs, title: e.target.value};
    }
}

function reducer(state: State, action:Action): any {
    switch (action.type) {
        case 'setItem':
            return {
                ...state,
                items: [state.inputs, ...state.items],
                count: state.items.length + 1,
                inputs: {}
            }
        case 'setInputs':
            return {
                ...state,
                inputs: handleOnChange(state, action.payload.value)
            }
        case 'collapse':
            return {
                ...state,
                isCollapsed: action.payload.bool
            }
        default : return state;
    }
}

const Provider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (<Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>);
}

export default Provider;