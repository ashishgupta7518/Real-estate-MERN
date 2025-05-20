import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigator = useNavigate();
    const notify = () => toast.success('Image uploaded successfully!');
    const notifyError = () => toast.error("You can upload only 6 images per listing");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewImageUrl, setViewImageUrl] = useState(null);
    const [error, setError] = useState(false);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;





    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        furnished: false,
        offer: false,
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        parking: false,

    });

    const handleImageSubmit = async (e) => {
        e.preventDefault(); // <-- prevent form submission

        if (!files || files.length === 0) return;

        setLoading(true);

        const uploadedUrls = [];

        for (let i = 0; i < files.length && i < 6; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);
            formData.append('upload_preset', 'mern-estate-image');

            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/dzlmfjtuv/image/upload', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                uploadedUrls.push(data.secure_url);
            } catch (err) {
                console.error('Image upload failed:', err);
                notifyError();
            }
        }

        console.log('Uploaded image URLs:', uploadedUrls);
        setFormData((prevFormData) => {
            const updated = {
                ...prevFormData,
                imageUrls: [...prevFormData.imageUrls, ...uploadedUrls], // <-- append not replace
            };
            return updated;
        });


        setLoading(false); // <-- Hide spinner
        notify();
        // You can now use uploadedUrls to update state or send with form submission
    };

    useEffect(() => {
        console.log('Form data updated:', formData);
    }, [formData]);

    // close model on clic Escape key

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setViewImageUrl(null);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);


    useEffect(() => {
        if (formData.imageUrls.length > 0) {
            console.log("Updated image URLs:", formData.imageUrls);
        }
    }, [formData.imageUrls]);




    const handleDeleteImage = (index) => {
        return () => {
            setFormData((prevFormData) => {
                const updated = { ...prevFormData };
                updated.imageUrls.splice(index, 1);
                return updated;
            });
        };
    }

    const handleChange = (e) => {

        if (e.target.id === 'sale' || e.target.id === 'rent') {
            {
                setFormData((prevFormData) => ({ ...prevFormData, type: e.target.id }));
            }
        }


        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData((prevFormData) => ({ ...prevFormData, [e.target.id]: e.target.checked }));
        }

        if (e.target.type === 'text' || e.target.type === 'number' || e.target.type === 'textarea') {
            setFormData((prevFormData) => ({ ...prevFormData, [e.target.id]: e.target.value }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (loading) {
            toast.error("Please wait for images to finish uploading.");
            return;
        }

        if (formData.imageUrls.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }

        if (formData.regularPrice < formData.discountPrice) {
            toast.error("Discount price cannot be greater than regular price.");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/listing/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // <-- This adds credentials (cookies, HTTP auth)
                body: JSON.stringify({ ...formData, userRef: currentUser._id }),
            });


            const data = await res.json();
            if (data.success === false) {
                setError(data.message);
                return;
            }

            console.log('Listing created successfully:', data);
            toast.success("Listing created successfully!");

            // Reset form state after success
            setFormData({
                imageUrls: [],
                name: "",
                description: "",
                address: "",
                type: "rent",
                furnished: false,
                offer: false,
                bedrooms: 1,
                bathrooms: 1,
                regularPrice: 50,
                discountPrice: 0,
                parking: false,
            });

            setFiles([]);
            navigator(`/listing/${data._id}`); // Redirect to the new listing page

        } catch (error) {
            setError(error.message);
            toast.error("Failed to create listing.");
        }

    };



    console.log(files);
    return (
        <main className='p-3 max-w-4xl mx-auto '>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <ToastContainer />


            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address} />


                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex  flex-wrap gap-6 '>

                        <div className='flex items-center gap-2'>
                            <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                            <span>Beds</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
                            <span>Baths</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='regularPrice' min='50' max='100000' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />

                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-sm'>($ / Month)</span>

                            </div>

                        </div>
                        {formData.offer && <div className='flex items-center gap-2'>
                            <input type="number" id='discountPrice' min='50' max='100000' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.discountPrice} />
                            <div className='flex flex-col items-center'>
                                <p>Discount Price</p>
                                <span className='text-xs'>($ / Month)</span>

                            </div>
                        </div>}




                    </div>
                </div>

                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images: <span className='font-normal text-gray-600 ml-2'>
                        The first image will be the cover (max 6 images)
                    </span>

                    </p>

                    <div className='flex gap-4'>
                        <input onChange={(e) => {
                            const selectedFiles = Array.from(e.target.files);
                            if (selectedFiles.length > 6) {
                                notifyError(); // show toast
                                e.target.value = null; // reset file input
                                setFiles([]); // clear state
                                return;
                            }
                            setFiles(selectedFiles);
                        }} className='p-3 border border-gray-300 rounded w-full ' type="file" id='images' accept='image/*' multiple />
                        <button
                            type='button'
                            onClick={handleImageSubmit}
                            disabled={loading}
                            className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-green-700" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            ) : (
                                "Upload"
                            )}
                        </button>

                    </div>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt="listing-image" className='w-20 h-20 object-cover rounded-lg' />
                                <div className='flex gap-4'>
                                    <button type='button' onClick={handleDeleteImage(index)} className='p-3 text-red-700 border border-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                    <button type='button' onClick={() => setViewImageUrl(url)} className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:opacity-75'>View</button>

                                </div>


                            </div>
                        ))
                    }


                    <button
                        type='submit'
                        disabled={loading}
                        className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                    >
                        {loading ? "Uploading..." : "Create Listing"}
                    </button>







                </div>



            </form>
            {viewImageUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative bg-white p-4 rounded-xl shadow-lg max-w-md w-[90%]">
                        <button
                            onClick={() => setViewImageUrl(null)}
                            className="absolute top-2 right-2 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg"
                        >
                            &times;
                        </button>
                        <img
                            src={viewImageUrl}
                            alt="popup"
                            className="w-full max-h-[80vh] object-contain rounded-md"
                        />
                    </div>
                </div>
            )}




        </main>
    )
}
