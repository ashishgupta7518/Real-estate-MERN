import React from 'react'

const popupUser = ({ handlebtn, setbtn , name }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 scroll-py=0'>
            <div className='bg-slate-600 p-10 rounded-lg shadow-lg scroll-py-0'>
                <h2 className='text-xl font-semibold mb-4'>Are you sure you want to {name} your account?</h2>

                <button
                    onClick={handlebtn}
                    className='bg-red-600 text-white px-4 py-2 rounded mr-2'
                >
                    Yes, Delete
                </button>
                <button
                    onClick={() => setbtn(false)}
                    className='bg-gray-300 text-gray-800 px-4 py-2 rounded'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default popupUser