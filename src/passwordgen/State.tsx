import React, { createContext, useReducer } from 'react';


interface State {
    value: string;
    options: {
        length: number;
        includeUppercase: boolean;
        includeNumbers: boolean;
        includeSymbols: boolean;
    };
}
type Action =
    | { type: 'updatePassword'; payload: string }
    | { type: 'update'; payload: State['options'] };

const initialState: State = {
    value: "",
    options: {
        length: 10,
        includeUppercase: true,
        includeNumbers: true,
        includeSymbols: true,
    },
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
    state: initialState,
    dispatch: () => ("")
});

function appReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'updatePassword':
            return { ...state, value: action.payload };
        case 'update':
            return { ...state, options: action.payload };
        default:
            return state;
    }
}


function AppProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = useReducer(appReducer, initialState);
    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
}

export { AppContext, AppProvider };