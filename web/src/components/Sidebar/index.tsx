import { Link } from "react-router-dom"
import {
    FilmSlate,
    Television,
    GameController,
    Newspaper,
    Trophy,
    Heart,
    Clock
} from "phosphor-react";
import Logo from "../../assets/images/FilmsSA.png"
import { UpdateDatabaseButton } from "../UpdateDatabaseButton";

export function Sidebar() {
    return (
        <div className="bg-zinc-900 h-screen fixed left-0 top-0 w-28 flex flex-col border-x-[1px] invisible md:visible border-x-zinc-600 items-center gap-8 px-4 py-8 overflow-y-scroll scrollbar-none">
            <img src={Logo} />

            <div className="w-full h-[1px] bg-gray-300 opacity-40"></div>

            <Link to="/" className="text-white hover:text-blue-500 transition-all">
                <FilmSlate size={32} />
            </Link>

            <Link to="/" className="text-white hover:text-blue-500 transition-all">
                <Television size={32} />
            </Link>

            <Link to="/" className="text-white hover:text-blue-500 transition-all">
                <GameController size={32} />
            </Link>

            <Link to="/" className="text-white hover:text-blue-500 transition-all">
                <Newspaper size={32} />
            </Link>

            <Link to="/" className="text-white hover:text-blue-500 transition-all">
                <Trophy size={32} />
            </Link>

            <div className="w-full h-[1px] bg-gray-300 opacity-40"></div>

            <Link to="/filmes" className="text-white hover:text-blue-500 transition-all">
                <Heart size={32} weight="fill" />
            </Link>

            <Link to="/filmes" className="text-white hover:text-blue-500 transition-all">
                <Clock size={32} />
            </Link>

            <UpdateDatabaseButton />
        </div>
    )
}