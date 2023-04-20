import React, {useContext} from 'react';
import {AppContext} from "./State";


function PasswordGenerator() {
    const {state, dispatch} = useContext(AppContext);

    function generatePassword() {
        const {length, includeUppercase, includeNumbers, includeSymbols} = state.options;

        let characters = 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) {
            characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        }
        if (includeNumbers) {
            characters += '0123456789';
        }
        if (includeSymbols) {
            characters += '}_%$":|-[){*.=/+^&@#(!;?],';
        }
        let password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.random() * characters.length);
        }

        dispatch({type: 'updatePassword', payload: password});
    }

    function length(event: React.ChangeEvent<HTMLInputElement>) {
        const length = parseInt(event.target.value);
        const options = {...state.options, length};
        dispatch({type: 'updateOptions', payload: options});
    }

    function useSymbols(event: React.ChangeEvent<HTMLInputElement>) {
        const symbols = event.target.checked;
        const options = { ...state.options, includeSymbols: symbols };
        dispatch({ type: 'updateOptions', payload: options });
    }


    function numbersChange(event: React.ChangeEvent<HTMLInputElement>) {
        const numbers = event.target.checked;
        const options = {...state.options,includeNumbers : numbers};
        dispatch({type: 'updateOptions', payload: options});
    }

    function uppercaseChange(event: React.ChangeEvent<HTMLInputElement>) {
        const uppercase = event.target.checked;
        const options = {...state.options, includeUppercase: uppercase};
        dispatch({type: 'updateOptions', payload: options});
    }


    //chatgpt generated html - nebyly nervy na html je mi lito
    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Password Generator</h1>
            <div className="form-group row">
                <label htmlFor="length" className="col-sm-2 col-form-label">Length:</label>
                <div className="col-sm-10">
                    <input
                        id="length"
                        type="number"
                        className="form-control"
                        value={state.options.length}
                        onChange={length}
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">Use uppercase:</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input
                            id="uppercase"
                            type="checkbox"
                            className="form-check-input"
                            checked={state.options.includeUppercase}
                            onChange={uppercaseChange}
                        />
                        <label htmlFor="uppercase" className="form-check-label">Yes</label>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">Use numbers:</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input
                            id="numbers"
                            type="checkbox"
                            className="form-check-input"
                            checked={state.options.includeNumbers}
                            onChange={numbersChange}
                        />
                        <label htmlFor="numbers" className="form-check-label">Yes</label>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">Use symbols:</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input
                            id="symbols"
                            type="checkbox"
                            className="form-check-input"
                            checked={state.options.includeSymbols}
                            onChange={useSymbols}
                        />
                        <label htmlFor="symbols" className="form-check-label">Yes</label>
                    </div>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10 offset-sm-2">
                    <button className="btn btn-primary mr-2" onClick={generatePassword}>
                        Generate Password
                    </button>
                    <span className="password">{state.value}</span>
                </div>
            </div>
        </div>
    );
}

export default PasswordGenerator;