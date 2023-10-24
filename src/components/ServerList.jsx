// import axios from "axios"
import { useState } from "react"
// import { Link } from "react-router-dom"
// import { API_KEY } from "../constants/apiConfig"

export default function ServerList({ id, Season }) {
  const [data, setData] = useState({})
  const defSeason = Season > 1 ? Season : "1"
  const [selectedSeason, setSelectedSeason] = useState(defSeason)

  return (
    <div className="text-white border border-[#6b13d7] flex flex-col w-fit rounded-md">
      <div className="p-2 rounded-md">
        <h2 className="bg-[#6b13d7] rounded-md px-1 text-white w-full whitespace-nowrap">
          Server List
        </h2>
        <ul className="flex flex-col items-center">
          <li className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]">
            Server 1
          </li>
          <li className="px-2 my-1 rounded-md w-fit hover:bg-[#ffffff20]">
            Server 2
          </li>
        </ul>
      </div>
    </div>
  )
}
