import { useState } from 'react';
import { api } from './api/axios';

const Login = ({ onLogin , setShowCreatePost, loggedIn, userName, setloggedIn, setUserName}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const signOut = (e) => {
    e.preventDefault();
    setloggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    setUserName('');
  }

  const handleSubmit = async (event) => {
    
    setShowCreatePost(false);
    event.preventDefault();
    
    try {
      const response = await api.post('/login', {username, password},
      {
        headers: {'Content-Type': 'application/json'}
        // withCredentials: true
      }
      );

      localStorage.setItem('accessToken', response.data.accessToken);
      document.cookie = `refreshToken=${response.data.refreshToken}; HttpOnly; max-age=${7 * 24 * 60 * 60}`;

      onLogin(response);
      // Clear form fields
      setUsername('');
      setPassword('');
    } catch (err) { 

      if (err.response?.status === 400) {
        alert('Missing username or password')
      }  else if (err.response?.status === 401) {
        alert('Unauthorized')
      }  
    }
  };
  

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (
    <>
      {loggedIn ? (
        <div className="create-post container mt-4 mb-4 h-80 overflow-y-scroll">
        <div className='text-blue-400 text-lg mb-6 text-center mt-12'><b>Welcome back { userName }!</b></div>
        <div className='px-16'>
        <form onSubmit={signOut}>
          <button type="submit" className="h-14 bg-gray-700 text-white rounded-md text-lg" style={{ width: '100%' }}>
            <b>Sign Out</b>
          </button>
          </form>
          </div>
        </div>
      ) : (
        <div className="create-post container mt-4 mb-4 h-80 overflow-y-scroll">
          {

 <div className="create-post container mt-4 mb-4 h-80 overflow-y-scroll">
        <h2 className="text-center mb-3 text-lg"><b><i> Please enter your credentials </i></b></h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <div className='h-6 text-center text-blue-400 text-base mb-2' htmlFor="name"><b><label htmlFor="username">Username</label></b></div>
          <div className="form-group px-2 mb-2">
            <input
              style={{ width: '100%' }}
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300 text-lg form-control"
              placeholder="Enter username"
              required
            />
            </div>
          </div>
          <div className="form-group">
          <div className='h-6 text-center text-blue-400 text-base mb-2' htmlFor="name"><b><label htmlFor="password">Password</label></b></div>
            
          <div className="form-group px-2 mb-2">
            <input
              style={{ width: '100%' }}
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-300 text-lg form-control"
              placeholder="Enter password"
              required
            />
          </div>
          </div>
      
          <div className='px-2'>
          <button type="submit" className="h-14 bg-black text-white rounded-md text-lg" style={{ width: '100%' }}>
            <b>Log In</b>
          </button>
          </div>
        </form>
      </div>

          }
        </div>
      )}
    </>
  );
  
};

export default Login;
