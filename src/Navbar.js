import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

export function Navbar({ setShowCreatePost, setShowLogin, setShowPost, loggedIn }) {

  const active = (section) => {
    if (section === "Login")
    {
      setShowLogin(true)
      setShowCreatePost(false)
      setShowPost(false)
    }
    else if (section === "CreatePost")
    {
      if (loggedIn === true)
      {setShowCreatePost(true)
      setShowLogin(false)
      setShowPost(false)} else
      {
        alert('You must be logged in to post')
      }
    }
    else
    {
      setShowPost(true)
      setShowCreatePost(false)
      setShowLogin(false)
      
    }
  }

    return (
    <div className="bg-gray-100 h-10 border-t-2 border-gray-200">
          <div
        className="h-10"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <FontAwesomeIcon icon={faHome} size="2x" className="mx-2" onClick={() => active("Post")}/>
        <FontAwesomeIcon
          icon={faPlus}
          className="mx-4 cursor-pointer text-xl"
          onClick={() => active("CreatePost")}
        />
        <FontAwesomeIcon icon={faUser} size="2x" className="mx-2" onClick={() => active("Login")} />
      </div>
    </div>
    )
  }