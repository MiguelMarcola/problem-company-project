import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../service";
import { Loading } from "../Loading";
import { AxiosError } from 'axios';
import { ErrorProps } from "../../interfaces/ErrorProps";

export function UpdateDatabaseButton() {
    const [isLoading, setIsLoading] = useState(false)

    const mockLoadign = async () => {
        setIsLoading(true);
        await api.post("/films")
            .then(() => {
                toast.success('Filmes Atualizados com sucesso!')
                setIsLoading(false);
                setInterval(() => {
                    window.location.reload();
                }, 2500)
            })
            .catch((error: AxiosError) => {
                const data = error.response?.data as ErrorProps
                if (data.statusCode === 400 && data.message === "no new data to insert") {
                    toast.error("Os dados ja se encontram atualizados!")
                } else {
                    toast.error("Ouve um problema ao atualizar!")
                }
                setIsLoading(false);
            })
    }

    return (
        <button
            className="flex items-center justify-center w-20 h-14 bg-green-700 p-2 text-sm text-white rounded-md hover:bg-green-600 transition-all disabled:bg-green-600"
            disabled={isLoading}
            onClick={mockLoadign}
        >
            {isLoading
                ? <Loading />
                : "Atualizar Filmes"
            }
            <Toaster />

        </button>
    )
}