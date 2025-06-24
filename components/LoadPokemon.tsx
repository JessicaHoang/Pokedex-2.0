"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { fetchPokemon } from "@/app/actions/getPokemon";
import PokemonCard, {Pokemon} from "./PokemonCard";

const LoadPokemon = ({search, initialPokemon}:{
    search: string | undefined;
    // dependent on React Spinner and Observer
    initialPokemon: Pokemon[] | undefined; 
}) => {
    const [pokemon, setPokemon] = useState (initialPokemon);
    const [page, setPage] = useState(1);
    const[loading, setLoading] = useState<boolean>(false);
    const {inView, ref} = useInView();

    //HELPER FUNCTION HERE TO INTRODUCE DELAY FOR OUT DATA
    const delay = (ms: number) => 
        new Promise((resolve) => setTimeout(resolve, ms));
    const LoadMorePokemon = async () => {
        setLoading(true)
        await delay(1000); // 1 second delay
        // helper function
        const nextPage = page + 1;
        const newPokemon = await fetchPokemon({search, page: nextPage});
        setPage (nextPage);
        setPokemon((prev) => {
            if (!prev) return newPokemon;
            const uniquePokemon = newPokemon.filter(
                (poke: Pokemon) =>
                !prev.some((p) => p.name === poke.name)
);
            return [...prev, ...uniquePokemon];
        });
        setLoading(false);
    };
    useEffect(() => {
        if (inView) {
            LoadMorePokemon();
        }
    }, [inView]);
    return (
        <>
        {loading && <div>Loading...</div>} {/* Display loading indicator */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {pokemon?.map((poke: Pokemon) =>(
                <PokemonCard key={poke.url} pokemon={poke}/>
            ))}
        </div>
        {pokemon && pokemon.length >= 24 && (
            <div className="flex justify-center items-center p-4"
            ref={ref}>
                <ClipLoader color="#fff" />
            </div>
        )}
        </>
    )
};

export default LoadPokemon;