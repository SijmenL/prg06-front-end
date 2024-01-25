import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

const BoatDetail = ({match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boatDetails, setBoatDetails] = useState({});
    const boatId = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const fetchBoatDetails = async () => {
            try {
                const response = await fetch(`http://145.24.222.58:8000/boats/${boatId.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Boat details:', data);
                setBoatDetails(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchBoatDetails();
    }, [boatId]);

    const handleEditClick = () => {
        setIsEditing(true);
        // Add "/edit" to the URI
        navigate(`/boats/${boatId.id}/edit`);
    };

    // Function to handle boat deletion
    const handleDeleteClick = async () => {
        if (!isConfirmed) {
            // If not confirmed, set isConfirmed to true to show the confirmation prompt
            setIsConfirmed(true);

            // Set a timeout to reset isConfirmed to false after 5 seconds (5000 milliseconds)
            setTimeout(() => {
                setIsConfirmed(false);
            }, 5000);
        } else {
            try {
                const response = await fetch(`http://145.24.222.58:8000/boats/${boatId.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Redirect to the boats page after successful deletion
                navigate('/boats');
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    };

    return (
        <>
            {isLoading && (
                <main className="p-10">
                    <h1 className="w-1/4 mb-4 h-12 animate-pulse bg-gray-900"></h1>


                    <section className="flex flex-col gap-4 mt-4">
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">directions_boat</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">build</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">person</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">south</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">north</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">construction</span><span
                            className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                    </section>
                    <section className="flex flex-row gap-2 mt-10">
                        <button className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white">
                            <a href="/boats" className="flex flex-row align-middle ">
                                <span className="material-symbols-outlined mr-1">arrow_back</span>Go back!
                            </a>
                        </button>
                    </section>
                </main>
            )}

            {!isLoading && !isEditing && (
                <main className="p-10">
                    <h1 className="text-5xl text-gray-900 font-bold mb-5">
                        Boat {boatDetails.name}
                    </h1>

                    <section className="flex flex-col gap-4 mt-4">
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">directions_boat</span><span>Name:</span><span
                            className="font-bold">{boatDetails.name}</span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">build</span><span>Type:</span><span
                            className="font-bold">{boatDetails.type}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">person</span><span>Owner:</span><span
                            className="font-bold">{boatDetails.owner}</span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">south</span><span>Depth:</span><span
                            className="font-bold">{boatDetails.depth}</span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">north</span><span>Height:</span><span
                            className="font-bold">{boatDetails.height}</span></p>
                        <p className="flex items-center gap-2"><span
                            className="material-symbols-outlined">construction</span><span>Buildyear:</span><span
                            className="font-bold">{boatDetails.buildyear}</span></p>
                    </section>

                    <section className="flex flex-row gap-2 mt-10">
                        <button className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white">
                            <a href="/boats" className="flex flex-row align-middle ">
                                <span className="material-symbols-outlined mr-1">arrow_back</span>Go back!
                            </a>
                        </button>
                        <button onClick={handleEditClick}
                                className="rounded bg-yellow-900 hover:bg-yellow-700 py-2 px-4 text-white flex flex-row align-middle">
                            <span className="material-symbols-outlined mr-1">edit</span>Edit
                        </button>
                        {!isConfirmed && (
                            <button onClick={handleDeleteClick}
                                    className="rounded bg-red-900 hover:bg-red-700 py-2 px-4 text-white flex flex-row align-middle">
                                <span className="material-symbols-outlined mr-1">delete</span>Delete
                            </button>
                        )}
                        {isConfirmed && (
                            <button onClick={handleDeleteClick}
                                    className="rounded bg-red-700 hover:bg-red-500 py-2 px-4 text-white flex flex-row align-middle">
                                <span className="material-symbols-outlined mr-1">delete</span>Sure?
                            </button>
                        )}
                    </section>
                </main>
            )}
        </>
    );
};

export default BoatDetail;
