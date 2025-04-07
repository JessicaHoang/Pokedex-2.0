import Image from "next/image";
const Navbar = () => {
    return (<div className="py-5">
        <div className="max-w-[1500px] w-[90%]
        mx-auto flex justify-center">
            <Image 
            src={"/logo.svg"} 
            alt={"Pokedex 2.0 logo"} 
            width={300} height={150}
            />
        </div>
    </div>

    )
};

export default Navbar;