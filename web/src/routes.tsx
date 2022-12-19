import { Routes, Route } from "react-router-dom"
import { Filmes } from "./pages/Filmes"
import { Home } from "./pages/Home"

const AppRoutes = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filmes" element={<Filmes />} />
        </Routes>
    )
}

export default AppRoutes