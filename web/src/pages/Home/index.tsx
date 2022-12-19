import { LastFilms } from "../../components/LastFilms";
import { Sidebar } from "../../components/Sidebar";
import Banner from "../../assets/images/banner.png"
import { CardFilms } from "../../components/CardFilms";
import { Pagination } from "../../components/Pagination";
import { useState } from "react";
import { MobileMenu } from "../../components/MobileMenu";

export function Home() {
    return (
        <div className='flex justify-center h-full relative md:mr-56 md:ml-28 my-10 max-[766px]:my-0'>
            <Sidebar />


            <div className="flex flex-col gap-8 w-full mx-6 max-[766px]:mx-2">
                <img src={Banner} className="max-w-full max-[766px]:h-20 max-[766px]:hidden" />
                <MobileMenu />
                <CardFilms />
            </div>

            <LastFilms />
        </div>
    )
}