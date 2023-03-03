import { useState, useRef, useCallback, useEffect } from 'react';
import { Header } from './Header';
import usePosts from './hooks/usePosts';
import { Navbar } from './Navbar';
import Post from './Post';
import CreatePost from './CreatePost';
import Login from './Login';
import decode from 'jwt-decode';

const Main = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPost, setShowPost] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({});


  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    const username = localStorage.getItem('username');
    const firstname = localStorage.getItem('firstname');
    const lastname = localStorage.getItem('lastname');
    const userId = localStorage.getItem('userId');
    if (loggedIn === 'true') {
      setloggedIn(true);
      setUserName(username);
      setUser({
        id: userId,
        username: username,
        firstname: firstname,
        lastname: lastname,
      });
    }
  }, []);

  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage
  } = usePosts(pageNum);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const handlePostCreated = () => {
    console.log('postcreated');
  };

  const handleLogin = (response) => {
  
  
    // Get the user's information from the token
    const decodedToken = decode(response.data.accessToken);
  
    // Pass the user's information to the CreatePost component
    setUser({
        id: decodedToken.id,
        username: decodedToken.username,
        firstname: decodedToken.firstName,
        lastname: decodedToken.lastName,
      });
      localStorage.setItem('username', decodedToken.username);
      localStorage.setItem('firstname', decodedToken.firstName);
      localStorage.setItem('lastname', decodedToken.lastName);
      localStorage.setItem('userId', decodedToken.id);

      setloggedIn(true);
      localStorage.setItem('loggedIn', true);
      setShowLogin(false);
      setShowCreatePost(true);
      setShowPost(false);
      setUserName(decodedToken.username);

    // redirect to the section where all the posts appear
    document.getElementById('top').scrollIntoView();
  };
  

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {showPost && (
      <div className="h-80 overflow-y-scroll">
        <div id="top"></div>
        {content}
        {isLoading && <p className="center">Loading More Posts...</p>}
       
          <div className="h-6 text-center text-blue-400 text-base mb-2" htmlFor="name">
            <a href="#top">
              <b>Back to Top</b>
            </a>
          </div> 
      </div>
      )}
      {showCreatePost && (
        <CreatePost onPostCreated={handlePostCreated} user={user} setShowCreatePost={setShowCreatePost} setShowPost={setShowPost}/>
      )}
      {showLogin && <Login onLogin={handleLogin} setShowCreatePost={setShowCreatePost} setShowPost={setShowPost} loggedIn={loggedIn} userName={userName} setloggedIn={setloggedIn} setUserName={setUserName}/>}
      <Navbar setShowCreatePost={setShowCreatePost} setShowLogin={setShowLogin}  setShowPost={setShowPost} loggedIn={loggedIn}/>
      
    </div>
  );
};

export default Main;
