import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postCollection = collection(db, 'posts');
        const snapshot = await getDocs(postCollection);
        const postList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(postList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Sample data for testing
  const samplePosts = [
    {
      id: '1',
      title: 'Sample Post 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      jobCategory: 'Full-time',
      briefOverview: 'Sample brief overview 1'
    },
    {
      id: '2',
      title: 'Sample Post 2',
      description: 'Praesent nec ante eget metus eleifend malesuada id in velit.',
      jobCategory: 'Intern',
      briefOverview: 'Sample brief overview 2'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Feed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => (
            <div key={post.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <p className="text-sm text-gray-500">Category: <b>{post.jobCategory}</b></p>
              <p className="text-sm text-gray-500"><i>Brief Overview: {post.briefOverview}</i></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedPage;
