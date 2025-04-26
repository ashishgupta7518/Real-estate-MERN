import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [formDatas, setFormDatas] = useState({});

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0); // <-- new state

  useEffect(() => {
    console.log('Updated Form Data:', formDatas);
  }, [formDatas]);


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
      }
      setUploading(false);

    };


    xhr.onerror = () => {
      console.error('Upload error');
      setUploading(false);
      setProgress(0);
      setfileUploadError(true); // Set error state
    };

    xhr.send(formData);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileChange} />

        <div className='relative flex flex-col items-center'>
          <img
            onClick={() => fileRef.current.click()}
            src={formDatas.avatar || currentUser.avatar}
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


        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
  );
}
