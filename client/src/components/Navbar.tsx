import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in whenever the component mounts
    const checkLoginStatus = () => {
      if(auth.loggedIn()) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);  // Empty array ensures this effect runs only once when the component mounts

  return (
    <div className='nav'>
      <div className='nav-title'>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul>
        {!isLoggedIn ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => {
              auth.logout();
              setIsLoggedIn(false);  // Set logged-in state to false after logging out
            }}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
