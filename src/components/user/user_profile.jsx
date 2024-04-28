import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../config/firebase-config";

const UserProfile = () => {
  const [username, setUserName] = useState("");
  const [education, setEducation] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [working, setWorking] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [user, setUser] = useState(null);
  const [userDetailsExists, setUserDetailsExists] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetailsExists(true);
          const userData = docSnap.data();
          setUserName(userData.username);
          setEducation(userData.education);
          setStartYear(userData.startYear);
          setEndYear(userData.endYear);
          setWorking(userData.working);
          setPhotoURL(userData.photoURL);
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  const submitUser = async () => {
    const docRef = doc(db, "users", user.uid);
    const formData = {
      username: username,
      education: education,
      startYear: startYear,
      endYear: endYear,
      working: working,
      photoURL: photoURL,
      uid: user.uid,
    };
    await setDoc(docRef, formData, { merge: true });
    setEditMode(false); // Disable edit mode after submission
  };

  return (
    <div className="container mx-auto p-4 w-1/2 " >
      <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
      <div className="flex justify-end mb-4">
        {!editMode && userDetailsExists && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 mx-auto mb-4">
          {photoURL ? (
            <img src={photoURL} alt="User Avatar" className="w-full h-full rounded-full" />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0a5 5 0 0 0-5 5c0 1.86 3.71 3.892 6 4 2.29-.108 6-2.14 6-4a5 5 0 0 0-5-5zM5 5a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M5 9c-3.61.263-5 2.603-5 5 0 1.086.448 2.11 1.216 3h17.568c.768-.89 1.216-1.914 1.216-3 0-2.397-1.39-4.737-5-5-2.29-.108-6-2.14-6-4a5 5 0 0 0-5 5z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="education" className="block font-medium mb-1">
            Education
          </label>
          <input
            type="text"
            id="education"
            placeholder="Education"
            value={education}
            onChange={(event) => setEducation(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="startYear" className="block font-medium mb-1">
            Start Year
          </label>
          <input
            type="text"
            id="startYear"
            placeholder="Start Year"
            value={startYear}
            onChange={(event) => setStartYear(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endYear" className="block font-medium mb-1">
            End Year
          </label>
          <input
            type="text"
            id="endYear"
            placeholder="End Year"
            value={endYear}
            onChange={(event) => setEndYear(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="working" className="block font-medium mb-1">
            Working
          </label>
          <input
            type="text"
            id="working"
            placeholder="Working"
            value={working}
            onChange={(event) => setWorking(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoURL" className="block font-medium mb-1">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(event) => setPhotoURL(event.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-full"
            disabled={!editMode}
          />
        </div>
        {editMode && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={submitUser}
          >
            Update Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
