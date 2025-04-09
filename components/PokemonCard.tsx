import {useState} from "react";
import {useAnimation} from "framer-motion";

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
    const[data, setData] = useState(null);
    const[isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    return <div>PokemonCard</div>;
};

export default PokemonCard;