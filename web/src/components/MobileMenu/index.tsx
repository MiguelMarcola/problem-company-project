import { Popover } from "@headlessui/react";
import { Clock, FilmSlate, GameController, Heart, List, Newspaper, Television, Trophy, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { UpdateDatabaseButton } from "../UpdateDatabaseButton";

export function MobileMenu() {
    return (
        <Popover className="flex-col content-center ml-1 mb-[-25px] hidden max-[766px]:flex">
            <Popover.Button className="flex flex-col mt-5 mr-5 z-9">
                <List className="w-10 h-10 text-white" />
            </Popover.Button>
            <Popover.Panel className="absolute top-0 pt-16 w-full min-h-screen bg-zinc-700 flex justify-center z-10">
                <Popover.Button className="absolute top-5 right-5">
                    <X className="w-10 h-10 text-white" />
                </Popover.Button>
                <ul className="flex flex-col items-center gap-5 text-2xl mt-4 font-medium">
                    <li>
                        <Link to="/" className="text-white hover:text-blue-500 transition-all">
                            <FilmSlate size={32} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:text-blue-500 transition-all">
                            <Television size={32} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:text-blue-500 transition-all">
                            <GameController size={32} />
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white hover:text-blue-500 transition-all">
                            <Newspaper size={32} />
                        </Link>
                    </li>

                    <li>
                        <Link to="/" className="text-white hover:text-blue-500 transition-all">
                            <Trophy size={32} />
                        </Link>
                    </li>

                    <div className="w-full h-[1px] bg-gray-300 opacity-40"></div>

                    <Link to="/filmes" className="text-white hover:text-blue-500 transition-all">
                        <Heart size={32} weight="fill" />
                    </Link>

                    <li>
                        <Link to="/filmes" className="text-white hover:text-blue-500 transition-all">
                            <Clock size={32} />
                        </Link>
                    </li>

                    <li><UpdateDatabaseButton /></li>
                </ul>
            </Popover.Panel>
        </Popover>
    )
}