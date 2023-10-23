// import { Carousel } from "./index"
import { useDataContext } from "../context/DataContext"

export const Hero = () => {
  const { sidebar } = useDataContext()

  return (
    <div
      className={`${
        sidebar ? "translate-x-[14rem]" : "translate-x-0"
      } h-[90vh]`}
    >
      {/* <Carousel autoSlide="true" /> */}
      <div></div>
    </div>
  )
}
