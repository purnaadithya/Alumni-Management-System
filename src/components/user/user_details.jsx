import React from "react";

const UserDetails = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <img
              className="w-full rounded-lg"
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User"
            />
          </div>
          <div className="col-span-1">
            <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{user.education}</p>
            <p className="text-sm text-gray-600 mb-2">{user.working}</p>
            <p className="text-sm text-gray-600 mb-2">
              {user.startYear} - {user.endYear} (Expected)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
