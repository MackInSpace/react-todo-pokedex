import { useEffect, useState } from "react";
import { getPokedexNumber } from "../utils";

export function PokeCard(props) {
    const { selectedPokemon } = props
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // if loading, exit loop
        if (loading || !localStorage) { return }

        // check if the selected pokemon info is available in teh cache
        //1. define the cache
        let cache = {}
        if (localStorage.getItem('pokedex')) {
            cache = JSON.parse(localStorage.getItem('pokedex'))
        }

        //2. check if the selected pokemon info is available in the cache, otherwise fetch it
        if (selectedPokemon in cache) {
            //read from the cache
            setData(cache[selectedPokemon])
            return
        }

        // we passed all the cache, no avail, fetch data from the api

        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = 'https://pokeapi.co/api/v2/'
                const suffix = `pokemon/` + getPokedexNumber
                (selectedPokemon)
                const finalUrl = baseUrl + suffix
                const response = await fetch(finalUrl)
                const pokemonData = await response.json()
                setData(pokemonData)
                console.log(pokemonData)
                cache[selectedPokemon] = pokemonData
                localStorage.setItem('pokedex', JSON.stringify(cache))
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()

        // if we fetch from the api, make sure to save the info to the cache for the next time
    }, [selectedPokemon])

    return (
        <div></div>
    )
}