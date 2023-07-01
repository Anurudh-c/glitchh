import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';


function UserProfilePage() {
  const location = useLocation();
  const { user } = location.state;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState('image');


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('media_file', mediaFile);
      formData.append('media_type', mediaType);



      console.log("looooooooo", formData)

      await axios.post('http://localhost:8000/media-upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          user: user.id,
        },
      });

      console.log('Media upload successful');
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error uploading media:', error);
    }
  };

  return (
    <div>
      <NavBar />
      {/* <h1>User Profile</h1>
      <h2>Email: {user.email}</h2> */}



      <section className="h-100 gradient-custom-2">
        <div className="container-fluid h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#1F4CA3', height: '200px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: '150px', zIndex: 1 }} />
                    <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: 1 }}>
                      {user.username}
                    </button>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1">


                    <div>
                      <p className="small text-muted mb-0">Uploads</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Share any Post</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                          <label htmlFor="title" className="form-label fs-6">Title:</label>
                          <input type="text" placeholder='Enter Your Title' className="form-control form-control-sm" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="description" className="form-label fs-6">Description:</label>
                          <textarea placeholder='Enter Your Description' className="form-control form-control-sm" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="mediaType" className="form-label fs-6">Media Type:</label>
                          <select className="form-select form-select-sm" id="mediaType" value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="mediaFile" className="form-label fs-6">Media File:</label>
                          <input type="file" className="form-control form-control-sm" id="mediaFile" onChange={(e) => setMediaFile(e.target.files[0])} />
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                          <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                      </form>

                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent uploads</p>
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1" className="w-100 rounded-3" />
                    </div>
                    <div className="col mb-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="image 1" className="w-100 rounded-3" />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp" alt="image 1" className="w-100 rounded-3" />
                    </div>
                    <div className="col">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" alt="image 1" className="w-100 rounded-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserProfilePage;
