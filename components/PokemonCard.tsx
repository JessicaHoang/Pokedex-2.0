import {useState, useEffect} from "react";
import {useAnimation, motion} from "framer-motion";
import Image from "next/image";

export interface Pokemon {
    url: string;
    name: string;
}

interface Ability {
    ability: {
        name: string
    }
}

interface PokemonData {
    height: number
    weight: number
    abilities: Ability[]
    types: {type: {name: string}}[];
}

interface Props {
    pokemon: Pokemon;
}
const PokemonCard = ({pokemon}) => {
    const[data, setData] = useState<PokemonData | null>(null);
    const[isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(pokemon.url);
                if (!response.ok){
                    throw new Error("failed to fetch")
                }
                const fetchedData: PokemonData = await response.json();
                setData(fetchedData);
            } catch(error) {
                console.log(error)
                return null
            }
        };

        fetchPokemonData();
    }, [pokemon.url]);

    const getPokemonNumberFromUrl = (
        url: string
    ): string | null => {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? matches[1] : null;
    };

    const pokemonNumber = getPokemonNumberFromUrl(pokemon.url);

    return (
        <div className="flex items-center justify center flex-col relative">
            <motion.div 
            className="cursor-pointer" 
            animate={controls}
            whileHover={{scale:0.5}}
            whileTap={{scale: 0.9}}
            >
                <motion.div 
                className="bg-gray-700 flex items-center round-md p-1 relative"
                initial={{rotateY: 0}}
                variants={{
                    front: {rotateY: 0},
                    back: {rotateY: 180}
                }}
                >
                    <div 
                    className="absolute top-0 text-white font-bold p-3 text-5xl">
                        {pokemonNumber}
                    </div>
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonNumber}.png`} 
                    width={220}
                    height={220}
                    alt="pokemon image"
                    className="z-[9999]"/>

                </motion.div>
            </motion.div>
        </div>
    )
};

export default PokemonCard;