import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { defprofile } from "../../assets";
import { TOKEN_AUTH } from "../../constants/apiConfig";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { fileDB, textDB } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
import { useDBContext } from "../../context/DBContext";
import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment-timezone";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";

export default function MediaReviews({ id }) {
  const { user } = useAuthContext();
  const { addReview, deleteReview, updateReview } = useDBContext();
  const [review, setReview] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [showRest, setShowRest] = useState(1);
  const [path, setPath] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editReview, setEditReview] = useState("");
  const [isEdit, setIsEdit] = useState(null);
  const [options, setOptions] = useState(null);

  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    const listRef = ref(fileDB, `${user?.uid}/profileImage/`);
    listAll(listRef).then((response) => {
      getDownloadURL(response.items[0]).then((url) => {
        setImageUrl(url);
      });
    });
  }, [imageUrl]);

  useEffect(() => {
    if (pathname.includes("/TVSeries")) {
      setPath("tv");
    } else if (pathname.includes("/Movie")) {
      setPath("movie");
    }
  }, [pathname]);

  useEffect(() => {
    const reviewsCollectionRef = doc(textDB, "Reviews", id);
    onSnapshot(reviewsCollectionRef, async (snapshot) => {
      const newReviewData = await Promise.all(
        Object.keys(snapshot._document.data.value.mapValue.fields).map(
          async (key) => {
            const {
              createdAt: { timestampValue: createdAt },
              id: { stringValue: userId },
              review: { stringValue: review },
              username: { stringValue: username },
            } = snapshot._document.data.value.mapValue.fields[key].mapValue
              .fields;

            const listRef = ref(fileDB, `${userId}/profileImage/`);
            try {
              const response = await listAll(listRef);
              const url = response.items[0]
                ? await getDownloadURL(response.items[0])
                : null;

              return {
                userId: userId,
                reviewId: key,
                username,
                review,
                createdAt:
                  createdAt !== null
                    ? moment.tz(createdAt, "Asia/Singapore").toDate()
                    : null,
                url,
              };
            } catch (error) {
              console.error("Error fetching download URL:", error);
              return null;
            }
          }
        )
      );

      const filteredReviewData = newReviewData.filter(Boolean);
      filteredReviewData.sort((a, b) => b.createdAt - a.createdAt);
      console.log(filteredReviewData);
      setReviewData(filteredReviewData);
    });
  }, [isSubmitted, id, path]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(user?.uid, id, user?.displayName, reviewInput);
    setReviewInput("");
    setIsSubmitted(!isSubmitted);
  };

  const handleEdit = (e, reviewId) => {
    e.preventDefault();

    updateReview(reviewId, id, editReview);
    setIsEdit(null), setOptions(null), setEditReview("");
  };

  const handleDelete = (e, reviewId) => {
    e.preventDefault();
    deleteReview(reviewId, id);
  };

  const toggleExpanded = (reviewId) => {
    setExpanded((prevMap) => ({
      ...prevMap,
      [reviewId]: !prevMap[reviewId],
    }));
  };

  const toggleShowAll = () => {
    setShowReviews(!showReviews);

    if (showRest === 1) {
      setShowRest(Infinity);
    } else {
      setShowRest(1);
    }
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${path}/${id}/reviews`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: TOKEN_AUTH,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setReview(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [id, path]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="my-12 flex flex-col gap-2 mx-24 max-lg:mx-20 max-sm:mx-12 p-3">
      <div className="w-full flex gap-5">
        <img
          src={imageUrl || defprofile}
          alt=""
          className="rounded-full w-[45px] h-[45px]"
        />
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <input
            type="text"
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            className="w-full px-3 py-2 rounded-md outline-none bg-black/80 focus:outline-white/30
          text-white"
            placeholder="Write a review"
          />
          <div className="w-full flex gap-5">
            <button
              onClick={(e) => handleSubmit(e)}
              className={`w-max text-white px-[1rem] rounded-md hover:bg-white/50 ${
                reviewInput.length === 0 ? "bg-white/10" : "bg-white/50"
              }`}
            >
              Submit
            </button>
            <button
              onClick={() => setReviewInput("")}
              className="w-max text-white bg-white/10 px-[1rem] rounded-md hover:bg-white/50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className={`${!showReviews ? "" : "overflow-y-scroll h-[70vh]"}`}>
        {/* our review data */}
        {reviewData.slice(0, showRest).map((review) => (
          <div
            key={review.reviewId}
            className="w-full flex justify-between items-center text-white"
          >
            <div className="w-full flex gap-4 my-6 px-10">
              <div className="rounded-full w-[45px] h-[45px] overflow-hidden">
                <img
                  src={review?.url}
                  alt={review?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              {isEdit !== review.reviewId ? (
                <div className="w-full flex flex-col gap-2">
                  <div className="flex gap-3 items-center">
                    <p>{review?.username}</p>
                    <p className="text-white/50 text-sm">
                      posted {moment(review?.createdAt).fromNow()}{" "}
                      {review?.isEdited && "(edited)"}
                    </p>
                  </div>
                  <p>{review?.review}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <textarea
                    placeholder="Write a review"
                    name=""
                    cols="120"
                    rows="2"
                    value={editReview || review?.review}
                    onChange={(e) => setEditReview(e.target.value)}
                    className="text-white resize-none outline-none rounded-md p-2 w-full
              bg-black/80 focus:outline-white/30"
                  />
                  <div className="w-full flex gap-5">
                    <button
                      onClick={(e) => handleEdit(e, review?.reviewId)}
                      className={`w-max  px-[1rem] rounded-md hover:bg-white/50 ${
                        editReview.length === 0 ? "bg-white/10" : "bg-white/50"
                      }`}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => (
                        setIsEdit(null), setOptions(null), setEditReview("")
                      )}
                      className="w-max bg-white/10 px-[1rem] rounded-md hover:bg-white/50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {user?.uid === review?.userId && isEdit !== review.reviewId && (
              <div className="relative">
                <AiOutlineMore
                  onClick={() =>
                    setOptions((prevOptions) =>
                      prevOptions === review.reviewId ? null : review.reviewId
                    )
                  }
                  className="w-[25px] h-[25px] cursor-pointer font-bold"
                />
                <div
                  className={`absolute bg-black p-1 rounded-md top-0 right-5
                  ${options === review.reviewId ? "block" : "hidden"}`}
                >
                  <button
                    onClick={(e) =>
                      setIsEdit((prevOptions) =>
                        prevOptions === review.reviewId ? null : review.reviewId
                      )
                    }
                    className="flex items-center gap-1 hover:bg-white/40 w-full rounded-md p-1 text-sm"
                  >
                    <AiOutlineEdit /> Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, review?.reviewId)}
                    className="flex items-center gap-1 hover:bg-white/40 w-full rounded-md p-1 text-sm"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
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
  );
}
