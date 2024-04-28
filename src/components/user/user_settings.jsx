import React, { useState } from 'react';
import { auth } from "../../config/firebase-config"; 

const AccountSettings = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);



  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      await auth.currentUser.updatePassword(newPassword);
      setSuccessMessage("Password changed successfully.");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await auth.currentUser.delete();
        // Redirect to the homepage or login page after account deletion
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 border rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-1">Current Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 border rounded-md" 
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-semibold mb-1">New Password</label>
            <input type="password" id="newPassword" className="w-full px-3 py-2 border rounded-md" 
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-semibold mb-1">Confirm New Password</label>
            <input type="password" id="confirmNewPassword" className="w-full px-3 py-2 border rounded-md" 
              value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Change Password</button>
        </form>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={handleDeleteAccount}>Delete Account</button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default AccountSettings;
