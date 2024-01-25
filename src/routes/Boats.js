import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import AddBoatForm from "./AddBoat";


const Boats = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [boatData, setBoatData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [itemLimit] = useState(12);
    const navigate = useNavigate();
    const location = useLocation();
    const [showAddForm, setShowAddForm] = useState(false);
    const [refreshEffect, setRefreshEffect] = useState(false);

    useEffect(() => {
        // Read the 'page' query parameter from the URL
        const queryParams = new URLSearchParams(location.search);
        const pageParam = queryParams.get('page');
        let page = pageParam ? parseInt(pageParam, 10) : 1;

        setShowAddForm(location.pathname.includes('/create'));

        fetch(`http://145.24.222.58:8000/boats?limit=${itemLimit}&start=${((page) * itemLimit) - (itemLimit - 1)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('JSON data:', data);
                setBoatData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

        // Set the current page
        setCurrentPage(page);
    }, [location.search, itemLimit, location.pathname, refreshEffect]);


    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        navigate(`/boats?page=${nextPage}`);
    };

    const handlePreviousPage = () => {
        const previousPage = Math.max(currentPage - 1, 1);
        navigate(`/boats?page=${previousPage}`);
    };

    const handleFirstPage = () => {
        navigate(`/boats?page=1`);
    };

    const handleLastPage = () => {
        navigate(`/boats?page=${boatData.pagination.totalPages}`);
    };

    const handleAddClick = () => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = queryParams.get('page');

        navigate(`/boats/create?page=${currentPage}`);
        setShowAddForm(true);
    };

    const handleAddClose = () => {
        const queryParams = new URLSearchParams(location.search);
        const currentPage = queryParams.get('page');

        navigate(`/boats?page=${currentPage}`);
        setShowAddForm(false);
    };

    const handleAddCreate = async (boatDetails) => {
        try {
            const response = await fetch('http://145.24.222.58:8000/boats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(boatDetails),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Close the form after successful creation
            setShowAddForm(false);

            // Perform any additional logic after a successful creation
            console.log('Boat created successfully:', boatDetails);
            setRefreshEffect(prev => !prev);

            const queryParams = new URLSearchParams(location.search);
            const currentPage = queryParams.get('page');

            navigate(`/boats?page=${currentPage}`);

        } catch (error) {
            console.error('Create error:', error);
            // Handle error appropriately
        }
    };



    return (
        <>
            {isLoading && (
                <main className="p-10">
                    <div className={'flex md:flex-row flex-col justify-between md:items-center mb-5'}>
                        <h1 className="w-1/4 mb-4 h-12 animate-pulse bg-gray-900"></h1>

                        <button
                            className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white flex flex-row align-middle opacity-50 cursor-not-allowed" disabled={true}>
                            <span className="material-symbols-outlined mr-1">add</span>Add a boat!
                        </button>
                    </div>


                    <section className="text-gray-700 body-font">
                        <div className="container flex flex-row flex-wrap gap-5 justify-center">

                            {[...Array(itemLimit)].map((_, index) => (
                                <div className="flex flex-wrap -m-4">
                                    <div className="p-4 sm:w-96">
                                        <div
                                            className="h-full border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                                            <div className="p-6">
                                                <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
                                                <h1 className="w-1/2 mb-4 h-6 animate-pulse bg-gray-500"></h1>
                                                <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
                                                <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
                                                <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
                                                <div className="flex items-center flex-wrap ">
                                                    <a className="bg-indigo-300 h-4 animate-pulse mt-2 w-32 inline-flex items-center md:mb-2 lg:mb-0">
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </section>
                    <section className="flex justify-center mt-4">
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white rounded-l opacity-50 cursor-not-allowed`}
                            disabled="true">
                            <span className="material-symbols-outlined">first_page</span>
                        </button>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white opacity-50 cursor-not-allowed`}
                            disabled="true">
                            <span className="material-symbols-outlined">navigate_before</span>
                        </button>
                        <p className="bg-gray-100 hover:bg-gray-200 py-2 px-4">
                            1/1
                        </p>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white opacity-50 cursor-not-allowed`}
                            disabled="true">
                            <span className="material-symbols-outlined">navigate_next</span>
                        </button>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white rounded-r opacity-50 cursor-not-allowed`}
                            disabled="true">
                            <span className="material-symbols-outlined">last_page</span>
                        </button>
                    </section>
                </main>
            )}

            {!isLoading && (
                <main className="p-10">

                    {showAddForm && (
                        <AddBoatForm onClose={handleAddClose} onCreate={handleAddCreate} />
                    )}

                    <div className={'flex md:flex-row flex-col justify-between md:items-center mb-5'}>
                        <h1 className="text-5xl text-gray-900 font-bold mb-5">
                            View all <strong>{boatData.pagination.totalItems}</strong> boats
                        </h1>

                        <button onClick={handleAddClick}
                            className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white flex flex-row align-middle">
                            <span className="material-symbols-outlined mr-1">add</span>Add a boat!
                        </button>
                    </div>

                    <section className="text-gray-700 body-font">
                        <div className="container flex flex-row flex-wrap gap-5 justify-center items-center">

                            {boatData.items && boatData.items.map(boat => (
                                <div className="flex flex-wrap -m-4" key={boat.id}>
                                    <div className="p-4 sm:w-96">
                                        <div
                                            className="h-full border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">{boat.type}</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{boat.name}</h1>
                                                <p className="leading-relaxed mb-3">Owned by {boat.owner}</p>
                                                <div className="flex items-center flex-wrap">
                                                    <a href={`/boats/${boat.id}`}
                                                       className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0">Learn
                                                        More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </section>

                    <section className="flex justify-center mt-4">
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white rounded-l ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleFirstPage}
                            disabled={currentPage === 1}>
                            <span className="material-symbols-outlined">first_page</span>
                        </button>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}>
                            <span className="material-symbols-outlined">navigate_before</span>
                        </button>
                        <p className="bg-gray-100 hover:bg-gray-200 py-2 px-4">
                            {boatData.pagination.currentPage} / {boatData.pagination.totalPages}
                        </p>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white ${currentPage * itemLimit >= boatData.pagination.totalItems ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleNextPage}
                            disabled={currentPage * itemLimit >= boatData.pagination.totalItems}>
                            <span className="material-symbols-outlined">navigate_next</span>
                        </button>
                        <button
                            className={`bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white rounded-r ${currentPage === boatData.pagination.totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleLastPage}
                            disabled={currentPage === boatData.pagination.totalPages}>
                            <span className="material-symbols-outlined">last_page</span>
                        </button>
                    </section>
                </main>
            )}
        </>
    );
};

export default Boats;
