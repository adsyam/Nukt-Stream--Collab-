import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"
import { useDataContext } from "../context/DataContext"

export default function useResponsive() {
  const [maxCards, setMaxCards] = useState()
  const { sidebar } = useDataContext()
  const screen = useMediaQuery({ maxWidth: 425 })
  const xxsm = useMediaQuery({ minWidth: 370, maxWidth: 509 })
  const xsm = useMediaQuery({ minWidth: 510, maxWidth: 640 })
  const sm = useMediaQuery({ minWidth: 640, maxWidth: 768 })
  const md = useMediaQuery({ minWidth: 768, maxWidth: 1024 })
  const lg = useMediaQuery({ minWidth: 1024, maxWidth: 1279 })
  const xl = useMediaQuery({ minWidth: 1280, maxWidth: 1536 })
  const xxl = useMediaQuery({ minWidth: 1536 })
  const responsiveGridCard =
    "grid grid-cols-8 max-xl:grid-cols-7 max-lg:grid-cols-6 max-md:grid-cols-5 mx-32 max-lg:mx-20 max-sm:mx-12 max-sm:grid-cols-4 max-xsm:grid-cols-3 max-xxsm:grid-cols-2 gap-4 text-white"

  useEffect(() => {
    if (sidebar) {
      if (md) setMaxCards(10)
      else if (lg) setMaxCards(12)
      else if (xl) setMaxCards(14)
      else if (xxl) setMaxCards(14)
      else setMaxCards(6)
    } else if (!sidebar) {
      if (xxsm) setMaxCards(9)
      else if (xsm) setMaxCards(8)
      else if (sm) setMaxCards(10)
      else if (md) setMaxCards(12)
      else if (lg) setMaxCards(14)
      else if (xl) setMaxCards(16)
      else if (xxl) setMaxCards(16)
      else setMaxCards(6)
    }
  }, [xxsm, xsm, sm, md, lg, xl, xxl, sidebar])

  return { maxCards, setMaxCards, responsiveGridCard, screen }
}
