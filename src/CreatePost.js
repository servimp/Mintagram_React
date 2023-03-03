import { useState } from 'react';
import { api } from './api/axios';

const CreatePost = ({ onPostCreated, setShowPost, user, setShowCreatePost }) => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Access token is missing from local storage');
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
  
    try {
      const response = await api.post('/posts', {
        imgUrl: imageUrl,
        title: name,
        imgFilter: "sepia",
        idUser: user.id
      }, { headers });
  
      if (onPostCreated) {
        onPostCreated(response.data);
      }
  
      // Clear form fields
      setUrl('');
      setName('');
      setImageUrl('');
      setShowCreatePost(false);
      setShowPost(true);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        console.error('Access token is invalid or has expired');
        // Try to refresh the token
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const refreshResponse = await api.post('/refresh-token', { refreshToken });
          accessToken = refreshResponse.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          headers.Authorization = `Bearer ${accessToken}`;
  
          // Retry the request with the new token
          const retryResponse = await api.post('/posts', {
            imgUrl: imageUrl,
            title: name,
            imgFilter: "sepia",
            idUser: user.id
          }, { headers });
  
          if (onPostCreated) {
            onPostCreated(retryResponse.data);
          }
  
          // Clear form fields
          setUrl('');
          setName('');
          setImageUrl('');
          setShowCreatePost(false);
          setShowPost(true);
        } catch (refreshError) {
          console.error('Failed to refresh token:', refreshError);
          // Handle failure to refresh token, e.g. by redirecting to login page
        }
      }
    }
  };
  
  

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setUrl(value);

    // Set image as background
    setImageUrl(value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="create-post container mt-4 mb-4 h-80 overflow-y-scroll">
      <h2 className="text-center mb-3 text-gray-400 text-base"><b>Enter an image URL</b></h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group px-2 mb-2">
          <input
            style={{ width: '100%' }}
            id="url"
            type="text"
            value={url}
            onChange={handleUrlChange}
            className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300 text-lg"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className='px-2'>
        <div className="img-div mb-3" style={{ backgroundImage: `url(${imageUrl})` }}></div>
        </div>
        <div className="form-group px-2">
          <div className='h-6 text-center text-blue-400 text-base mb-2' htmlFor="name"><b>Give it a name:</b></div>
          <input
            style={{ width: '100%' }}
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300 mb-3 text-lg"
            placeholder="Enter image name"
            required
          />
        </div>
        <div className='px-2'>
        <button type="submit" className="h-14 bg-black text-white rounded-md text-lg" style={{ width: '100%' }}>
          <b>Post now!</b>
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
