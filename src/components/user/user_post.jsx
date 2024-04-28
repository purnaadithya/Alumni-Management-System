import React, { useState } from 'react';
import { db } from '../../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [briefOverview, setBriefOverview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
        jobCategory,
        briefOverview,
        createdAt: new Date()
      });
      setSuccessMessage('Post created successfully!');
      setTitle('');
      setDescription('');
      setJobCategory('');
      setBriefOverview('');
      console.log('Document written with ID: ', postRef.id);
    } catch (error) {
      setErrorMessage('Error creating post: ' + error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-8 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" id="title" className="w-full px-3 py-2 border rounded-md"
            value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-1">Description</label>
          <textarea id="description" className="w-full px-3 py-2 border rounded-md"
            value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="jobCategory" className="block text-sm font-semibold mb-1">Job Category</label>
          <select id="jobCategory" className="w-full px-3 py-2 border rounded-md"
            value={jobCategory} onChange={(e) => setJobCategory(e.target.value)} required>
            <option value="">Select job category</option>
            <option value="full-time">Full-time</option>
            <option value="intern">Intern</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="briefOverview" className="block text-sm font-semibold mb-1">Brief Overview</label>
          <textarea id="briefOverview" className="w-full px-3 py-2 border rounded-md"
            value={briefOverview} onChange={(e) => setBriefOverview(e.target.value)} required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Create Post</button>
      </form>
      {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
    </div>
  );
};

export default CreatePost;
