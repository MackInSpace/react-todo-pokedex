import { first151Pokemon, getFullPokedexNumber } from '../utils/index';
import { useState } from 'react';

export default function SideNav(props) {
    const { 
        selectedPokemon, 
        setSelectedPokemon, 
        handleCloseMenu, 
        showSideMenu 
    } = props

    const [searchValue, setSearchValue] = useState('')

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        if ((getFullPokedexNumber(eleIndex)). includes(searchValue)) { return true }
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) { return true }
        return false
    })

    return (
        <nav className={' ' + (!showSideMenu ? 'open' : '')}>
            <div className={'header' + (!showSideMenu ? ' open' : '')}>
                <button onClick={handleCloseMenu} className='open-nav-button'>
                    <i className='fa-solid fa-arrow-left-long'></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input />
            {first151Pokemon.map((pokemon, pokemonIndex) => {
                return (
                    <button key={pokemonIndex} className='nav-card'>
                        <p>{getFullPokedexNumber(pokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}