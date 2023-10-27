import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { timeFormat } from "../utils/timeFormat";

function containsHtmlTags(text) {
  const htmlTagPattern = /<[^>]*>/;
  return htmlTagPattern.test(text);
}

export const Reviews = ({ comments }) => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(10);

  const toggleLoadComments = () => {
    if (isOpen) {
      setVisible(10);
      setIsOpen(false);
    } else {
      setVisible(Infinity);
      setIsOpen(true);
    }
  };

  if (!comments) return;

  return (
    <section className="text-white w-full lg:max-w-[50%] p-[2rem] flex flex-1 flex-col justify-center items-start">
      <div className="flex flex-col gap-[1.5rem] max-w-[90%]">
        <h2 className="font-bold">{comments.length} Reviews</h2>
        <div className="flex gap-3">
          <img
            src={user ? user.photoURL : "https://i.pravatar.cc/50"}
            alt=""
            className="rounded-full h-[50px]"
          />
          <textarea
            placeholder="Write a review"
            name=""
            cols="120"
            rows="2"
            className="text-black resize-none outline-none rounded-md p-2"
          ></textarea>
        </div>
        <div className="overflow-y-auto max-h-[1300px]">
          {comments.slice(0, visible).map((comment) => (
            <>
              {containsHtmlTags(
                comment?.snippet?.topLevelComment?.snippet?.textDisplay
              ) ? (
                ""
              ) : (
                <div key={comment?.id} className="flex gap-[1rem] mb-[1.5rem]">
                  <img
                    src={
                      comment?.snippet?.topLevelComment?.snippet
                        ?.authorProfileImageUrl || "https://i.pravatar.cc/50"
                    }
                    alt=""
                    className="rounded-full h-[45px]"
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2>
                        {
                          comment?.snippet?.topLevelComment?.snippet
                            ?.authorDisplayName
                        }
                      </h2>
                      <p className="text-white/50 text-sm">
                        posted{" "}
                        {timeFormat(
                          comment?.snippet?.topLevelComment?.snippet
                            ?.publishedAt
                        )}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{ whiteSpace: "pre-line" }}
                        className="text-[.9rem]"
                      >
                        {
                          comment?.snippet?.topLevelComment?.snippet
                            ?.textDisplay
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
      <button
        onClick={toggleLoadComments}
        className="bg-white/30 w-max mx-auto mt-[1rem] p-[.3rem] rounded-md"
      >
        {isOpen ? "Load less reviews" : "Load more reviews"}
      </button>
    </section>
  );
};
