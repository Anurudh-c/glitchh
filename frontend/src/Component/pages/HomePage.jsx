import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import './HomePage.css';
import { RxAvatar } from 'react-icons/rx'


function HomePage() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { user } = location.state;
  const [userMediaList, setUserMediaList] = useState([]);

  const userMedia = {
    title: 'Example Card',
    description: 'This is an example card.',
    media_type: 'image',
    s3_media_path: 'https://example.com/path/to/image.jpg',
  };

  useEffect(() => {
    fetchUserMediaList();
  }, []);

  const fetchUserMediaList = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user-media/');
      const data = await response.json();
      setUserMediaList(data);
    } catch (error) {
      console.error('Error fetching user media:', error);
    }
  };



  
  // const handleProfileClick = () => {
  //       navigate('/user-profile', { state: { user } });
  //     };
  return (
    <div>

      <NavBar user={user} />


      {/* <div>{user.username}</div>
        <button onClick={handleProfileClick}>Go to User Profile</button> */}

      <div className="container-fluid">
        <div className="row">

          {userMediaList.map((userMedia) => (
            <div key={userMedia.id} className="col-3">
              <div className="card">
                <br />
                <h5 className="avatar card-title" l><RxAvatar />User_Name</h5>
                <h5 className="card-title">{userMedia.title}</h5>
                <div className="media-container">
                  {userMedia.media_type === 'image' && (
                    <img src={userMedia.s3_media_path} className="card-img-top" alt={userMedia.title} />
                  )}
                  {userMedia.media_type === 'video' && (
                    <div className="video-container">
                      <video src={userMedia.s3_media_path} className="card-img-top" controls />
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <p className="card-text">{userMedia.description}</p>
                  <p className="card-text">Created at:
                    {new Date(userMedia.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
