import { LastFilms } from "../../components/LastFilms";
import { Sidebar } from "../../components/Sidebar";

export function Filmes() {
    return (
        <div className='flex items-center justify-center h-screen relative mr-56 ml-28'>
            <Sidebar />

            <div className="flex flex-col gap-8">
                <h1 className="text-7xl font-normal text-white">
                    Hello Filmes!
                </h1>
            </div>

            <LastFilms />
        </div>
    )
}