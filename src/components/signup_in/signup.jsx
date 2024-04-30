import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../navbar/navbar';
import { auth, googleProvider } from '../../config/firebase-config';
import { Navigate } from 'react-router-dom';

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignUp = async () => {
        try {
            if (password !== confirmPassword) {
                throw new Error("Passwords don't match");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Add user's name to the user's profile
            await updateProfile(userCredential.user, {
                displayName: name
            });

            toast.success('Sign up successful');
        } catch (error) {
            console.error('Sign-up error:', error.message);
            const errorMessage = error.message.split(': ')[1]; // Extract relevant part of error message
            toast.error(errorMessage);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            await updateProfile(userCredential.user, {
                displayName: userCredential.additionalUserInfo.profile.name
            });
            toast.success('Sign up with Google successful');
        } catch (error) {
            console.error('Google sign-up error:', error.message);
            const errorMessage = error.message.split(': ')[1]; // Extract relevant part of error message
            toast.error(errorMessage);
        }
    };

    if (user) {
        return <Navigate to="/user" />;
    }

    return (
        <div>
            <Navbar />
            <div className="min-h-screen content-fit bg-[#597AAF] bg-[url('/img1.jpeg')] bg-cover bg-center text-white flex items-center justify-center">
                <div className="welcome-container bg-[#1541A2] p-6 rounded-lg shadow-lg w-1/2 h-[70vh]">
                    <h1 className="text-4xl font-bold text-center">Sign Up</h1>
                    <div className="mt-4 text-black">
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mt-4 text-black">
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            className="w-full text-black px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <input
                            type="password"
                            className="w-full text-black px-4 py-2 rounded-lg bg-gray-200 focus:outline-none focus:bg-white"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            className="w-full bg-[#597AAF] text-white rounded-lg px-4 py-2 hover:bg-white hover:text-[#597AAF] transition duration-300 ease-in-out"
                            onClick={handleSignUp}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            className="bg-[#DB4437] text-white rounded-lg px-4 py-2 hover:bg-white hover:text-[#DB4437] transition duration-300 ease-in-out"
                            onClick={handleGoogleSignUp}
                        >
                            Sign Up with Google
                        </button>
                    </div>
                </div>
                <Toaster />
            </div>
        </div>
    );
};

export default SignUpForm;
