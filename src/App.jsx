import { useCallback, useEffect, useState } from 'react'
import { useDeviceDetect } from './hooks/useDeviceDetect'
import { Route, Routes } from 'react-router-dom'

import { auth, db, loadUser } from './api/firebase/firebase.api'
import { onAuthStateChanged, signInAnonymously, signOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import Layout from './components/Layout/Layout'
import MobileLayout from './components/MobileLayout/MobileLayout'
import HomePage from './pages/HomePage/HomePage'
import RatingPage from './pages/RatingPage/RatingPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

import './App.css'

function App() {

  const { isMobile } = useDeviceDetect();

  const [user, setUser] = useState({
    userName: 'Guest',
    uid: 'none',
    record: 0,
    userImage: 0
  })

  const [isSigned, setIsSigned] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);

  function updateUser(name = false, image = false) {
    setUser(prev => ({
      ...prev,
      userName: name ? name : prev.userName,
      userImage: image ? image: prev.userImage,
    }))
  }

  function openModal() {
    setIsModalOpened(true)
  }

  function closeModal() {
    setIsModalOpened(false)
  }

  useEffect(() => {
      const authListener = onAuthStateChanged(auth, function (user) {
          if (user) {
            loadUser(db, 'users', user.uid)
              .then((response) => {
                const user = response.data();
                setUser({
                  userName: user.userName,
                  record: user.record,
                  uid: user.uid,
                  userImage: user.userImage,
                });
                setIsSigned(true);
              })
              .catch((e) => {
                console.log(e);
              });
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
        // Add new user as Guest to database with record = 0
        const newUserRef = doc(db, "users", auth.currentUser.uid)
        await setDoc(newUserRef, {
          userName: `Guest`,
          uid: auth.currentUser.uid,
          record: 0,
          userImage: 0
        })
      } catch (e) {
        console.error("Error adding user: ", e)
      }
    }
  }, [auth, db])

  return (
    <Routes>
      <Route path='/' element={
        isMobile ?
        <MobileLayout
          user={user}
          isSigned={isSigned}
          toggleSignIn={toggleSignIn}
          isModalOpened={isModalOpened}
          openModal={openModal}
          closeModal={closeModal}
        />
        :
        <Layout user={user} isSigned={isSigned} toggleSignIn={toggleSignIn}/>
      }>
        <Route index element={<HomePage />} />
        <Route path='profile'
          element={
            <ProfilePage
              user={user}
              isModalOpened={isModalOpened}
              openModal={openModal}
              closeModal={closeModal}
              updateUser={updateUser}
            />
          }
        />
        <Route path='rating' element={<RatingPage />}/>
      </Route>
    </Routes>
  )
}

export default App
