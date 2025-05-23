
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserStart, deleteUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Profile() {

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const notify = () => toast.success('User updated successfully!');
  const notifyError = () => toast.error("Error updating user!");
  const notifyErrorImage = () => toast.error("Error uploading image!");
  const notifyDelete = () => toast.success('Account deleted successfully!');
  const notifySignout = () => toast.success('Sign out successfully!');
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formDatas, setFormDatas] = useState({});
  const [userListings, setUserListings] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // <-- new state

  const dispatch = useDispatch();

  useEffect(() => {

  }, [formDatas]);

  const navigator = useNavigate();



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'mern-estate-image'); // ⬅️ replace with your upload preset

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `https://api.cloudinary.com/v1_1/dzlmfjtuv/image/upload`);

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded * 100) / event.total);
        setProgress(percent);
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log('Uploaded Image URL:', data.secure_url);
        setFormDatas(prev => ({ ...prev, avatar: data.secure_url }));
      } else {
        console.error('Upload failed');
        notifyErrorImage();
      }
      setUploading(false);

    };


    xhr.onerror = () => {
      console.error('Upload error');
      setUploading(false);
      setProgress(0);
      setfileUploadError(true); // Set error state
      notifyErrorImage();
    };

    xhr.send(formData);
  };


  const handleChange = (e) => {
    setFormDatas(prev => ({ ...prev, [e.target.id]: e.target.value }));

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`${BASE_URL}/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: 'include', // ✅ this allows cookies to be sent
        body: JSON.stringify(formDatas),
      });


      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        notifyError();
        return;
      }


      dispatch(updateUserSuccess(data));
      notify();

    } catch (error) {

      dispatch(updateUserFailure(error.message));
      notifyError();

    }
  }


  const handleDeleteuser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`${BASE_URL}/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ this allows cookies to be sent
      });

      const data = await res.json();
      if (data.success === false) {
        notifyError();
        dispatch(deleteUserFailure(data.message));
        return;
      }
      notifyDelete();



      setTimeout(() => {
        navigator('/sign-up');
        dispatch(updateUserSuccess(null));

      }, 2000)




    } catch (error) {
      notifyError();

      dispatch(deleteUserFailure(error.message));
    }
  }

  const HandleSignOutUser = async () => {

    try {
      dispatch(signoutUserStart());
      const res = await fetch(`${BASE_URL}/api/auth/signout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (data.success === false) {
        notifyError();
        return;
      }
      notifySignout();


      setTimeout(() => {
        navigator('/sign-up');
        dispatch(signoutUserSuccess())


      }, 2000)

    } catch (error) {
      notifyError();
      dispatch(signoutUserFailure(error.message));

    }
  }


  const handleShowListing = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/listings/${currentUser._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ this allows cookies to be sent
      });

      const data = await res.json();
      if (data.success === false) {
        notifyError();
        return;
      }

      setUserListings(data);



    } catch (error) {

    }

  }



  const handleListingDelete = async (e) => {
    const listingId = e;
    try {
      const res = await fetch(`${BASE_URL}/api/listing/delete/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ this allows cookies to be sent
      });

      const data = await res.json();
      if (data.success === false) {
        notifyError();
        return;
      }

      setUserListings(prev => prev.filter(listing => listing._id !== listingId));



    } catch (error) {
      notifyError();
      console.log(error);

    }
  }



  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileChange} />

        <div className='relative flex flex-col items-center'>
          <img
            onClick={() => fileRef.current.click()}
            src={formDatas?.avatar || currentUser.avatar}
            alt="profile"
            className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'
          />

          {/* Upload status below image */}
          <div className='text-center mt-2'>
            {fileUploadError ? (
              <span className='text-red-700'>Error image upload ❌</span>
            ) : uploading ? (
              <div className='text-slate-700'>
                Uploading: {progress}%
              </div>
            ) : (
              progress > 0 && progress < 100 ? (
                <div className='text-slate-700'>
                  Uploading: {progress}%
                </div>
              ) : progress === 100 ? (
                <span className='text-green-600'>Upload Successful ✅</span>
              ) : null
            )}

          </div>
        </div>


        <input type="text" placeholder="username" id="username" defaultValue={currentUser.username} className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="email" placeholder="email" id="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" onChange={handleChange} />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>


        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create-listing"}>
          Create listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteuser}>Delete account</span>
        <span className='text-red-700 cursor-pointer ' onClick={HandleSignOutUser}>Sign out</span>
      </div>

      {error && <span className='text-red-700 text-center mt-3'>{error}</span>}

      <button onClick={handleShowListing} className='text-green-700 w-full border p-3 mt-3'>Show Listing</button>

      {
        userListings
        && userListings.length > 0 &&

        <div className='flex flex-col gap-4 '>

          <h1 className='text-center my-7 text-2xl font-semibold'>Your Listing</h1>




          {userListings.map((listing) => <div key={listing._id} className='border p-3 my-3 rounded-lg flex items-center justify-between gap-4 flex-wrap'>
            <Link to={`/listing/${listing._id}`}>

              <img src={listing.imageUrls[0]} alt="listing-image" className='h-16 w-16 object-contain' />

            </Link>
            <Link className='flex-1' to={`/listing/${listing._id}`}>

              <p className='text-slate-700 font-semibold text-wrap  hover:underline truncate'>{listing.name}</p>

            </Link>

            <div className='flex gap-2'>
              <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase border border-red-500 rounded-lg p-3 hover:opacity-70'>Delete</button>

              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700 uppercase border border-green-600 rounded-lg p-3 hover:opacity-70'>Edit</button>
              </Link>

            </div>

          </div>

          )}
        </div>
      }

    </div>
  );
}
