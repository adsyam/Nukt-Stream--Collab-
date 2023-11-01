import { useParams } from "react-router"
import { Link } from "react-router-dom"

export default function PagingButton({ data, setPage }) {
  const { page } = useParams()
  const currentPage = parseInt(page)
  return (
    <div className="flex gap-2 text-white">
      <Link
        className="py-1 px-2 rounded-md hover:bg-[#ffffff30] duration-300"
        onClick={() => setPage(page)}
        to={`/home/popular/${currentPage === 1 ? currentPage : currentPage - 1}`}
        disabled={page === 1}
      >
        Previous
      </Link>
      <Link
        className="py-1 px-2 rounded-md hover:bg-[#ffffff30] duration-300"
        onClick={() => setPage(page)}
        to={`/home/popular/${currentPage + 1}`}
        disabled={page === data.total_pages}
      >
        Next
      </Link>
    </div>
  )
}
