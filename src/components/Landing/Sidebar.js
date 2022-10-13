import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Sidebar() {
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const userName = currentUser.userName;

  const handleLogout = async () => {
    setError('');
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('failed to log out');
    }
  };

  return (
    <div className="sidebar-container">
      {currentUser?.isAnonymous ? (
        <div>
          {' '}
          <p>
            {' '}
            <Link to="/registerGuest">Save</Link>
          </p>
        </div>
      ) : (
        <></>
      )}

      <div>
        <p>
          <Link to="/profile">profile</Link>
        </p>
      </div>
      <div>
        <p>
          <Link to="/game">game</Link>
        </p>
      </div>
      <div>
        <p>
          <Link to="/leaderboards">leaderboards</Link>
        </p>
      </div>
      <div>
        <p>icon</p>
      </div>
      <div>
        <p onClick={handleLogout}>logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
