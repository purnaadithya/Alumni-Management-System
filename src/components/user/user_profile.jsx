import {useState, useEffect} from 'react';
import {db} from '../../config/firebase-config';
import { collection, getDocs,addDoc } from 'firebase/firestore';

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const data = await getDocs(usersCollectionRef);
                const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
                setUsers(filteredData);
                console.log(filteredData);
            }
            catch(error){
                console.error('Error fetching users: ', error);
            }
        };
        fetchUsers();
    },[]);

    const submitUser = async () => {
        await addDoc(usersCollectionRef, {name:"Praveen",email:"hello"});
    };

    return (
        <div>
            <h1>User Profile</h1>
            {/* Add your user profile content here */}
            <button onClick={submitUser}>Add User</button>
        </div>
    );
};

export default UserProfile;