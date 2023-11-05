import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { defprofile } from "../../assets"
import { TOKEN_AUTH } from "../../constants/apiConfig"

export default function MediaReviews({ id }) {
  const [review, setReview] = useState([])
  const [showReviews, setShowReviews] = useState(false)
  const [expanded, setExpanded] = useState({})
  const [showRest, setShowRest] = useState(1)
  const [path, setPath] = useState()

  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    if (pathname.includes("/TVSeries")) {
      setPath("tv")
    } else if (pathname.includes("/Movie")) {
      setPath("movie")
    }
  }, [pathname])

  const toggleExpanded = (reviewId) => {
    setExpanded((prevMap) => ({
      ...prevMap,
      [reviewId]: !prevMap[reviewId],
    }))
  }

  const toggleShowAll = () => {
    setShowReviews(!showReviews)

    if (showRest === 1) {
      setShowRest(Infinity)
    } else {
      setShowRest(1)
    }
  }

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${path}/${id}/reviews`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        setReview(response.data.results)
      })
      .catch(function (error) {
        console.error(error)
      })
  }, [id, path])

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", options)
  }

  return (
    <div className="my-12 flex flex-col gap-2 mx-24 max-lg:mx-20 max-sm:mx-12 p-3">
      <div className="flex items-center justify-center gap-2">
        <img src={defprofile} alt="" className="rounded-full max-w-[45px]" />
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md outline-none"
          placeholder="Write a review"
        />
      </div>
      <div className={`${!showReviews ? "" : "overflow-y-scroll h-[70vh]"}`}>
        {review.slice(0, showRest).map((r, index) => (
          <motion.div
            key={r.id}
            className="flex flex-col gap-3"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.2 }}
          >
            <div className="text-white flex gap-2 ml-16 max-xsm:ml-4 mt-3">
              <div className="flex gap-3">
                <img
                  className="rounded-full max-h-[45px]"
                  src={`https://xsgames.co/randomusers/assets/avatars/pixel/${
                    index + 1
                  }.jpg`}
                />
                <div className="flex flex-col">
                  <p className="font-bold text-xl">
                    A review by{" "}
                    <span className="text-[#7300FF]">{r.author}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-thin text-sm">
                      Written on {formatDate(r.created_at)}
                    </p>
                    <div className="border w-fit px-2 rounded-full font-thin text-sm">
                      {r.author_details.rating === null
                        ? null
                        : r.author_details.rating}{" "}
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-white font-thin opacity-80 mb-4 xsm:ml-32 max-xsm:ml-4">
              {expanded[r.id] ? (
                <div dangerouslySetInnerHTML={{ __html: r.content }}></div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: r.content.split(" ").slice(0, 45).join(" ") + "...",
                  }}
                ></div>
              )}
              <span
                role="button"
                onClick={() => toggleExpanded(r.id)}
                className="text-[#7300FF] italic"
              >
                {expanded[r.id] ? (
                  <>
                    <span className="mr-1">&nbsp;</span>
                    <span className="underline">show less</span>
                  </>
                ) : (
                  <>
                    <span className="mr-1">&nbsp;</span>
                    <span className="underline">read the rest</span>
                  </>
                )}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={toggleShowAll}
        className="text-white"
        disabled={review.length <= 1}
      >
        {review.length !== 1
          ? review.length === 0
            ? "There are no reviews"
            : !showReviews
            ? "Show All Reviews"
            : "Hide Reviews"
          : "There are no more reviews"}
      </button>
    </div>
  )
}
