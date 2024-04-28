import { useState, useEffect } from "react";
import { db } from "../../config/firebase-config";
import { collection, getDoc, doc, setDoc } from "firebase/firestore";
import { auth } from "../../config/firebase-config"; // Import your firebase auth instance

const UserProfile = () => {
  const [username, setUserName] = useState("");
  const [startyear, setStartyear] = useState("");
  const [endyear, setEndyear] = useState("");
  const [user, setUser] = useState(null);
  const [userDetailsExists, setUserDetailsExists] = useState(false);
  const [userData, setUserData] = useState({});

  // useEffect(() => {
  //     // const fetchUsers = async () => {
  //     //     try{
  //     //         const data = await getDocs(usersCollectionRef);
  //     //         const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
  //     //         setUsers(filteredData);
  //     //         console.log(filteredData);
  //     //     }
  //     //     catch(error){
  //     //         console.error('Error fetching users: ', error);
  //     //     }
  //     // };
  //     // fetchUsers();
  // },[]);

  useEffect(() => {
    auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetailsExists(true);
          setUserData(docSnap.data());
          setUserName(userData.username);
          setStartyear(userData.startyear);
          setEndyear(userData.endyear);
          console.log(userData.username);
        }
      } else {
        console.log("No user");
        setUser(null);
      }
    });
  },[]);

  const submitUser = async () => {
    const docRef = doc(db, "users", user.uid);
    const formData = {
      username: username,
      startyear: startyear,
      endyear: endyear,
      email: user.email,
      uid: user.uid,
    };
    await setDoc(docRef, formData);
    setUserName("");
    setStartyear("");
    setEndyear("");
  };

  const [editStatus,setEditStatus] = useState(false);
  const changeEditStatus = () => {
    setEditStatus(!editStatus);
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Add your user profile content here */}
      <br />
      {userDetailsExists ? (
        <div>
          <button onClick={changeEditStatus}>Click to Edit Details</button>
          <br />
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            className="border border-black"
          />
          <br />
          <input
            type="text"
            id="startyear"
            placeholder="Start Year"
            className="border border-black"
            value={startyear}
            onChange={(event) => setStartyear(event.target.value)}
          />
          <br />
          <input
            type="text"
            id="endyear"
            placeholder="End Year"
            className="border border-black"
            value={endyear}
            onChange={(event) => setEndyear(event.target.value)}
          />
          <br />
          {editStatus ? <button onClick={submitUser}>Submit Profile</button> : <></>}
          
        </div>
      ) : (
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            className="border border-black"
          />
          <br />
          <input
            type="text"
            id="startyear"
            placeholder="Start Year"
            className="border border-black"
            value={startyear}
            onChange={(event) => setStartyear(event.target.value)}
          />
          <br />
          <input
            type="text"
            id="endyear"
            placeholder="End Year"
            className="border border-black"
            value={endyear}
            onChange={(event) => setEndyear(event.target.value)}
          />
          <br />
          <button onClick={submitUser}>Submit Profile</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
