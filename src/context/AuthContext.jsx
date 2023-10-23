//this file is for user authentication
//we used firebase as the authentication platform
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { auth, googleProvider } from "../config/firebase"

const AuthContext = createContext()

//this will be used as the access for all the data within the file
export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  //this loading state's purpose if mainly to check if we already get the current user
  //from firebase and set it to our user variable
  const [loading, setLoading] = useState(true)

  //this is for creating a user account. this will be used on our sign up page
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  //this is for user authentication upon logging in to our site
  //firebase will automatically check if the user account valid
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  //this is for signing in using google account
  //firebase will connect us to google for the authentication
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }

  //this useEffect will check if there is a user logged in to our site
  //if there is a current user logged in then set the current user to user
  //we will use the user variable to validate if they can access our protected pages
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false)
      setUser(currentUser)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  //this will logout the user if they signout to our page
  const logout = async () => {
    try {
      await signOut(auth)
      return navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        createUser,
        signInUser,
        signInWithGoogle,
        user,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
