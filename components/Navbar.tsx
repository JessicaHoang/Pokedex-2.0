import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (<div className="py-5">
        <div className="max-w-[1500px] w-[95%]
        mx-auto flex justify-center">
            <Link href={"/"}>
            <Image 
            src={"/logo.svg"} 
            alt={"Pokedex 2.0 logo"} 
            width={300} height={150}
            />
            </Link>
        </div>
    </div>

    )
};

export default Navbar;