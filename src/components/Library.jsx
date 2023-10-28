import { useDataContext } from "../context/DataContext";

export const Library = () => {
  const { sidebar } = useDataContext();

  return (
    <section
      className={`min-h-[100vh] bg-black text-white px-[3rem] ${
        sidebar
          ? "translate-x-[14rem] origin-left duration-300 w-[89%]"
          : "w-full origin-right duration-300"
      }`}
    >
      <div className="w-full flex justify-between items-center translate-y-[8rem]">
        <h1 className="text-[1.5rem] font-medium">Library Feed</h1>
        <button className="capitalize font-medium bg-white/20 p-[.5rem] rounded-lg hover:bg-[#389FDD]">
          manage library
        </button>
      </div>
      <hr className="border-white/20 translate-y-[10rem]" />
    </section>
  );
};
