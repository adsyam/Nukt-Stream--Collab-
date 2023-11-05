import { useLocation } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"
import { sidebarMenus1 } from "../../utils/index"
import DropdownBtn from "./DropdownBtn"
import SidebarMenu from "./SidebarMenu"
import { useEffect } from "react"
import { useDataContext } from "../../context/DataContext"

export default function Sidebar({ showSidebar }) {
  const location = useLocation()
  const pathname = location.pathname
  const { user } = useAuthContext()
  const {setSidebar} = useDataContext()

  useEffect(() => {
    if (!user) setSidebar(false)
  }, [user, setSidebar])

  return (
    <aside
      className={`fixed top-[-2%] bg-[#0A0E1730] flex flex-col overflow-y-auto h-[92%] ps-[1rem]
       -left-[100%] transition-all duration-300 z-[100] translate-y-[4.51rem]
        ${
          showSidebar ? "left-0 transition-all duration-300" : ""
        } snap-mandatory`}
    >
      {sidebarMenus1
        .filter((item) => {
          if (
            pathname === "/home" &&
            ["latest", "popular", "ongoing"].includes(item.name)
          ) {
            return false
          } else if (
            pathname === "/search" &&
            ["videos", "movies", "TV"].includes(item.name)
          ) {
            return false
          }
          return true
        })
        .map((menu, index) => (
          <>
            {menu.name === "genre" ? (
              <DropdownBtn
                name={menu.name}
                icon={menu.icon}
                list={menu.lists}
                index={index}
                key={index}
              />
            ) : (
              <SidebarMenu
                name={menu.name}
                icon={menu.icon}
                url={menu.url}
                key={index}
                index={index}
              />
            )}

            {index % 5 === 0 ? (
              <hr key={`border-${index}`} className="me-[1rem]" />
            ) : (
              ""
            )}
          </>
        ))}
    </aside>
  )
}
