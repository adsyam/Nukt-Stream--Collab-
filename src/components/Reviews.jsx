import React from "react"

export const Reviews = () => {
  return (
    <section className="text-white w-full p-[2rem] flex flex-col justify-center items-center">
      <div className="flex flex-col gap-[1.5rem] w-[50%]">
        <h2 className="font-bold">50 Reviews</h2>
        <div className="flex gap-3">
          <img
            src={"https://i.pravatar.cc/50"}
            alt="user image"
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
        <div className="flex gap-3 px-[3rem]">
          <img
            src={"https://i.pravatar.cc/50"}
            alt="user image"
            className="rounded-full h-[50px]"
          />
          <div>
            <p className="font-bold text-[1.2rem] mb-1">
              A review by <span className="text-[#398FDD]">User</span>
            </p>
            <p className="text-white/70 text-[.9rem] mb-5">
              Writen on August 5, 2022
            </p>
            <div>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempora, excepturi quisquam distinctio, autem dolorem aut
                eligendi dicta repudiandae adipisci iusto cumque deleniti
                maxime. Odit vitae consequatur architecto ipsum, blanditiis
                nobis autem reiciendis perferendis officiis eveniet sit
                cupiditate voluptates incidunt laudantium libero explicabo ea.
                Consectetur a aliquid magnam, soluta atque quisquam veniam quam
                voluptates nemo perspiciatis fuga officia ducimus, quos iure
                dolores. Quisquam, incidunt error. Fuga, ratione nemo! Maxime
                reiciendis ducimus facere ratione doloremque et, explicabo illum
                dolorem neque est id quidem ut optio sit excepturi ad odit, quod
                quas, cum dicta iusto? Cumque recusandae, dolore deleniti cum
                laudantium at obcaecati.
              </p>
            </div>
          </div>
        </div>
        <button className="bg-white/30 w-max mx-auto p-[.3rem] rounded-md">
          Load more reviews
        </button>
      </div>
    </section>
  )
}
