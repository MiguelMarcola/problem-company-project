import { Star } from "phosphor-react"
import { useEffect, useState } from "react";
import { ApiDataProps, ApiResponse } from "../../interfaces/ApiDataProps";
import { api } from "../../service";

export function LastFilms() {
    const [listFilms, setListFilms] = useState<ApiDataProps[]>([])

    useEffect(() => {
        async function fechApiFilms() {
            try {
                const response = await api
                    .get("/films/top-score")
                const { data } = response;

                setListFilms(data)
            } catch (err) {
                console.log(err)
                return
            }
        }

        fechApiFilms()
    }, [])
    return (
        <div className="bg-zinc-800 h-full w-56 flex flex-col items-center fixed right-0 top-0 gap-8 px-4 py-8 mr-1 invisible md:visible border-x-[1px] border-x-zinc-600 overflow-y-scroll scrollbar-thumb-zinc-600 scrollbar-track-transparent scrollbar-thin">
            <h1 className="text-white font-medium text-lg">Top Filmes</h1>
            {listFilms.map((film) => (
                <div key={film.id} className="flex flex-col">
                    <img src={film.image} />
                    <h1 className="text-lg text-white font-medium mt-2">{film.title}</h1>
                    <div className="flex w-full items-center justify-between">
                        <h2 className="text-xs text-white font-normal">{film.releaseDate}</h2>
                        <h2 className="text-xs text-white font-normal">Score: <span className="text-yellow-500 font-bold">{(film.rtScore / 10).toFixed(1)}</span></h2>
                    </div>
                    <div className="flex my-2">
                        <Star size={20} weight="fill" color="#285CE3" />
                        <Star size={20} weight="fill" color="#285CE3" />
                        <Star size={20} weight="fill" color="#285CE3" />
                        <Star size={20} weight="fill" color="#285CE3" />
                        <Star size={20} weight="fill" color="#285CE3" />
                    </div>
                </div>
            ))
            }
        </div >
    )
}