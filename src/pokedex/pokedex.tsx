import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Pokemon {
    name: {
        english: string;
    };
    description: string;
    image:{
        hires: string;
    }
}

function App() {
    const [old, setOld] = useState<Pokemon[]>([]);
    const [newPokedex, setNewPokedex] = useState<Pokemon[]>([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/pokedex.json')
            .then(response => response.json())
            .then(data => {
                setOld(data);
            });
    }, []);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setNewPokedex([]);
        display(userInput);
    }

    function display(userInput: string) {
        let filtered: Pokemon[] = [];
        for (let i = 0; i < old.length; i++) {
            if (old[i].name.english.includes(userInput)) {
                filtered.push(old[i]);
            }
        }
        setNewPokedex(filtered.slice(0, 16));
    }

    return (
        <div>
            <span className="fs-3">Pokedex</span>

            <form className="d-flex mt-2" onSubmit={handleSearch}>
                <input
                    className="form-control me-2 w-25"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    id="search"
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="submit" id="searchButton">
                    Search
                </button>
            </form>

            <div id="pokemons" className="d-flex flex-wrap mt-3">
                {newPokedex.map((pokemon, index) => (
                    <div className="card" style={{ width: '18rem' }} key={index}>
                        <img src={pokemon.image.hires} className="card-img-top" alt={pokemon.name.english} />
                        <div className="card-body">
                            <h5 className="card-title">{pokemon.name.english}</h5>
                            <p className="card-text">{pokemon.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
