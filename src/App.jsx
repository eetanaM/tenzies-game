import { useCallback, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import { auth, db } from './api/firebase/firebase.api'
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import Layout from './components/Layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import RatingPage from './pages/RatingPage/RatingPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

import './App.css'

function App() {

  const [user, setUser] = useState({
    userName: '',
    uid: ''
  })
  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
      const authListener = onAuthStateChanged(auth, function (user) {
          if (user) {
            // User is signed in.
            setIsSigned(true)
            if (user.isAnonymous) {
              setUser({
                userName: `Guest`,
                uid: user.uid
              })
            }
          } else {
            // User is signed out.
            setUser(null)
            setIsSigned(false)
          }
        });
      return () => {
          authListener()
      }
  }, [])

  const toggleSignIn = useCallback(async () => {
    if (auth.currentUser) {
      signOut(auth);
    } else {
      await signInAnonymously(auth).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
          console.error(errorMessage);
        }
      });
      try {
        const newUserRef = doc(db, "users", auth.currentUser.uid)
        await setDoc(newUserRef, {
          userName: auth.currentUser.displayName || "Guest",
          uid: auth.currentUser.uid,
          record: 0
        })
      } catch (e) {
        console.error("Error adding user: ", e)
      }
    }
  }, [auth, db])

  return (
    <Routes>
      <Route path='/' element={<Layout user={user} isSigned={isSigned} toggleSignIn={toggleSignIn}/>}>
        <Route index element={<HomePage />} />
        <Route path='profile' element={<ProfilePage />}/>
        <Route path='rating' element={<RatingPage />}/>
      </Route>
    </Routes>
  )
}

export default App
