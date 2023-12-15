import ReactDOM from "react-dom/client"
import { RouterProvider, ScrollRestoration } from "react-router-dom"
import { AppRouter } from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={AppRouter} />
)
