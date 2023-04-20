import React from 'react';
import {AppProvider} from "../passwordgen/State";
import Generator from "../passwordgen/Generator";
import 'bootstrap/dist/css/bootstrap.min.css';


const Home: React.FC = () => {
    return (
        <AppProvider>
            <Generator />
        </AppProvider>
    );
};

export default Home;

