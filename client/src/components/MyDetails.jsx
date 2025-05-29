import React from 'react'

const MyDetails = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center py-5 px-4 max-w-6xl mx-auto mb-10'>

                <div href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-[90%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <img src="https://res.cloudinary.com/dzlmfjtuv/image/upload/v1748115401/rpgo4yhmbhn80lamwnor.jpg" alt="" className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"' />

                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Ashish Maddhesiya <span className='text-slate-300'>(Frontend Developer)</span>  </h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Passionate frontend developer with a focus on crafting responsive, user-friendly web interfaces using modern technologies.</p>
                        <a href="https://github.com/ashishgupta7518" className="inline-flex w-[40%] md:w-[20%] lg:w-[18%] items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Read more
                            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg>
                        </a>
                    </div>

                </div>


            </div>


        </>
    )
}

export default MyDetails