import { useLocation } from "react-router"
import History from "./History"
import Subscriptions from "./Subscriptions"

export default function Feed() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div>
      {pathname.includes("subscriptions") ? <Subscriptions /> : <History />}
    </div>
  )
}
