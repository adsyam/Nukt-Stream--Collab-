import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./App"

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={AppRouter} />
)
