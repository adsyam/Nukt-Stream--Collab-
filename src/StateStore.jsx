import { proxy } from "valtio"

export const user = proxy({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
})

export const Users = proxy([
  {
    id: "user1",
    user: {
      firstName: "John",
      lastName: "Dela Cruz",
      email: "johndelacruz@sample.com",
      password: "12345678",
      confirm: "12345678",
    },
    authenticated: true,
    plan: "basic",
    profilePic: "https://i.pravatar.cc/35",
  },
])
