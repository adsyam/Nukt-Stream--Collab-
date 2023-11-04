import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useFetchTMDB from "../../Hooks/useFetchTMDB"

export default function PagingButton() {
  const [category, setCategory] = useState()
  const { data, pathname } = useFetchTMDB()
  const { page } = useParams()
  const currentPage = parseInt(page)

  useEffect(() => {
    if (pathname.includes("popular")) setCategory("popular")
    if (pathname.includes("trending")) setCategory("trending")
    if (pathname.includes("toprated")) setCategory("toprated")
  }, [pathname])

  return (
    <div className="flex gap-2 text-white">
      <Link
        className="py-1 px-2 rounded-md hover:bg-[#ffffff30] duration-300"
        to={`/home/${category}/${
          currentPage === 1 ? currentPage : currentPage - 1
        }`}
      >
        Previous
      </Link>
      <Link
        className="py-1 px-2 rounded-md hover:bg-[#ffffff30] duration-300"
        to={`/home/${category}/${
          currentPage === data.total_pages ? currentPage : currentPage + 1
        }`}
      >
        Next
      </Link>
    </div>
  )
}
