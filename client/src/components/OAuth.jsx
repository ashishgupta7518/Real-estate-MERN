import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';

import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleGoogleClick = async () => {
        try {


            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL })
            })


            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
            console.log(data)







        } catch (error) {
            console.log("could not sign in with google", error);

        }


    }

    

    return (
        <button
            onClick={handleGoogleClick}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-500 bg-slate-600 text-slate-200 p-3 rounded-lg uppercase hover:opacity-80 disabled:opacity-80"
        >
            <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
            />
            Continue with Google
        </button>
        

    )
}
