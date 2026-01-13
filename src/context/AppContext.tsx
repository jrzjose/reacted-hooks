import * as React from 'react'
import type { State, Action, Input, Media } from "./Types";
import Firestore from "../handlers/firestore";

const { readDocs } = Firestore;

export const Context = React.createContext();

const initialState: State = {
    items: [],
    count: 0,
    inputs: {},
    isCollapsed: false,
    placeholders: []
}

const handleOnChange = (state: State, e: any): Input => {
    if (e.target.name === 'file') {
        console.log({ file: e.target.files[0], path: URL.createObjectURL(e.target.files[0]) });

        return { ...state.inputs, file: e.target.files[0], path: URL.createObjectURL(e.target.files[0]) };
    }
    else {
        return { ...state.inputs, title: e.target.value };
    }
}

function reducer(state: State, action: Action): any {
    switch (action.type) {
        case 'setItem':
            return {
                ...state,
                items: [state.inputs, ...state.items],
                placeholders: [state.inputs, ...state.items],
                count: state.items.length + 1,
                inputs: { title: null, file: null, path: null },
            }
        case "filterItems":
            return {
                ...state,
                items: action.payload.results,
            };
        case "setItems":
            return {
                ...state,
                items: action.payload.items,
                placeholders: action.payload.items,
            };
        case 'setInputs':
            return {
                ...state,
                inputs: handleOnChange(state, action.payload.value)
            }
        case 'collapse':
            return {
                ...state,
                isCollapsed: action.payload.bool,
                inputs: { title: null, file: null, path: null }
            }
        default: return state;
    }
}

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    // useCallback is a React Hook that caches a function definition between re-renders, preventing the recreation of that function unless its dependencies change
    const read = React.useCallback(async () => {
        const items = await readDocs("stocks") as Media[];
        dispatch({ type: "setItems", payload: { items } });
    }, []);

    const filterItems = React.useCallback((input:any) => { // ?
        if (input === "" || !!input) {
            dispatch({ type: "setItems", payload: { items: state.placeholders } });
        }
        
        let list = state.placeholders.flat();

        let results:string[] = list.filter((item: any) => { // ? Media
            const name = item.title.toLowerCase();
            const searchInput = input.toLowerCase();
            return name.indexOf(searchInput) > -1;
        });

        dispatch({ type: "filterItems", payload: { results } })
    }, [state.placeholders]);

    const value = React.useMemo(() => {
        return {
            state,
            dispatch,
            read,
            filterItems,
        };
    }, [state, dispatch, read, filterItems]);
    
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useMediaContext = () => {
    return React.useContext(Context);
}

export default Provider;