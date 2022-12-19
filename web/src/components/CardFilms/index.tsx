import { useEffect, useState } from "react"
import { ApiDataProps, ApiResponse } from "../../interfaces/ApiDataProps";
import { api } from "../../service"
import { Pagination } from "../Pagination";


export function CardFilms() {
    const [listFilms, setListFilms] = useState<ApiDataProps[]>([])
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        async function fechApiFilms() {
            try {
                const skip = (currentPage - 1) * 10;
                const response = await api.get(`/films?skip=${skip}`)
                const { data, count } = response.data as ApiResponse;

                setListFilms(data)
                setTotalCount(count)
            } catch (err) {
                console.log(err)
                return
            }
        }

        fechApiFilms()
    }, [currentPage])

    console
    return (
        <div className="flex items-stretch justify-start flex-wrap">
            {listFilms.map((film) => (
                <div key={film.id} className="flex flex-col flex-1 m-[1%]  lg:min-w-[18%] lg:max-w-[18%] md:min-w-[200px] md:max-w-[300px] max-[766px]:min-w-[150px] max-[766px]:m-[10px] items-start gap-2 w-64 bg-zinc-800 pb-4 rounded-lg overflow-hidden">
                    <div className="w-full relative group/item">
                        <img src={film.image} />

                        <div className="absolute bottom-1 left-1 bg-zinc-800 p-1 rounded-md">
                            <h4 className="text-white font-normal text-xs">{film.releaseDate}</h4>
                        </div>

                        <div className="absolute bottom-1 right-1 bg-zinc-800 p-1 rounded-md">
                            <h4 className="text-white font-normal text-xs">Score: <span className="font-bold text-yellow-400">{(film.rtScore / 10).toFixed(1)}</span></h4>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full h-full border-b-2 border-b-zinc-600 overflow-y-scroll scrollbar-thumb-zinc-600 scrollbar-track-transparent scrollbar-thin invisible p-4 bg-zinc-800/90 group/edit group-hover/item:visible group-hover/item:transition-all group-hover/item:delay-150">
                            <h1 className="text-white text-lg font-bold my-2">Description</h1>
                            <p className="text-white text-xs my-2 text-ellipsis">{film.descricao}</p>

                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 mt-1">
                        <h1 className="text-white text-lg my-2">{film.title}</h1>
                        <h1 className="text-white text-xs">Diretor: <span className="font-bold text-yellow-600">{film.director}</span></h1>
                        <h1 className="text-white text-xs">Produtor: <span className="font-bold text-yellow-600">{film.producer}</span></h1>
                    </div>
                </div>
            ))}
            <div className="flex w-full justify-center">
                <Pagination totalCountOfRegisters={totalCount} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </div>
    )
}