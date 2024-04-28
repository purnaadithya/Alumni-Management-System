// import { useHistory } from 'react-router-dom'; // Ensure you have React Router installed and properly configured
import React, { useState } from 'react';
import AccountSettings from './user_settings';
import { Team } from './user_team';
import CreatePost from './user_post';
import FeedPage from './user_feed';
import UserProfile from './user_profile';
const Sidebar = ({ setActiveComponent }) => {
    const handleSignOut = () => {
        auth.signOut();
        
    };

    return (
        <div className="bg-gray-800 text-white h-lvh w-64 flex flex-col justify-between">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <ul className="mt-4">
                    <li className="mb-2 cursor-pointer" onClick={() => setActiveComponent('Feeds')}>
                        Feeds
                    </li>
                    <li className="mb-2 cursor-pointer" onClick={() => setActiveComponent('Profile')}>
                        Profile
                    </li>
                    <li className="mb-2 cursor-pointer" onClick={() => setActiveComponent('Search')}>
                        Search
                    </li>
                    <li className="mb-2 cursor-pointer" onClick={() => setActiveComponent('Notifications')}>
                        Notifications
                    </li>
                    <li className="mb-2 cursor-pointer" onClick={() => setActiveComponent('AccountSettings')}>
                        AccountSettings
                    </li>
                </ul>
            </div>
            <div className="p-4">
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    );
};

const Sales = () => {
    return (
        <div>
            {/* Sales component */}
            Sales Component
        </div>
    );
};

const Transactions = () => {
    return (
        <div>
            {/* Transactions component */}
            Transactions Component
        </div>
    );
};

const Products = () => {
    return (
        <div>
            {/* Products component */}
            Products Component
        </div>
    );
};

const UserHome = () => {
    const [activeComponent, setActiveComponent] = useState('Feeds');
    // const history = useHistory(); // Uncomment this line if using React Router

    return (
        <div className="flex">
            <Sidebar setActiveComponent={setActiveComponent} />
            <div className="flex h-lvh w-[200%] justify-center">
                {activeComponent === 'Feeds' && <FeedPage />}
                {activeComponent === 'Profile' && <UserProfile />}
                {activeComponent === 'Search' && <Team />}
                {activeComponent === 'Notifications' && <CreatePost />}
                {activeComponent === 'AccountSettings' && <AccountSettings />}
            </div>
        </div>
    );
};

export default UserHome;
