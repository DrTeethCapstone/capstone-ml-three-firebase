import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { auth, db } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [scoreState, setScoreState] = useState(0)

    //auth functions
    const signup = async (email, password, username) => {
        createUserWithEmailAndPassword(auth, email, password)
        await addDoc(collection(db, 'users'), {
            email: email,
            username: username,
            scores: []
        })
        console.log('hit')
    }
    // const addUserToDb = async (email, username) => {
    //     const docRef = doc(db, 'users')
    //     await setDoc(docRef, {
    //         email: email,
    //         username: username
    //     })
    // }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // database functions

    const getUserData = async () => {
        const userDataRef = collection(db, '/users')
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
        await getDocs(q)
        // console.log(data.doc)

        // return data
    }


    const value = {
        currentUser,
        login,
        signup,
        logout,
        getUserData,
        setScoreState,
        scoreState
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



// db before
// users collection - scores collection
//users - email, username
//scores - email, score

// db refactor goal
// users collection only
// users - email, username, scores
//      username: will
//      email: will@gmail.com
//      scores field - [{score, date}, {score, date}]
//          --- {score: 400, date: 4/13/22-12:23pm}