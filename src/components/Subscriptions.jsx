import React from "react";

export const Subscriptions = () => {
  return (
    <section className="min-h-[100vh] mx-[2rem] text-white translate-y-[8rem]">
      <div className="flex justify-between items-center pb-2">
        <h2 className="text-xl">Latest</h2>
        <button className="bg-white/20 p-[.5rem] rounded-md">Manage</button>
      </div>

      <hr className="border-white/30 pb-5" />
      <p className="text-center">You are not subscribed to any channels</p>
    </section>
  );
};
