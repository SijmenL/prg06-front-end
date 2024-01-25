// BoatDetail.js
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const BoatDetail = ({match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boatDetails, setBoatDetails] = useState({});
    const boatId = useParams();

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

    return (
        <>
            {isLoading && (
                <main className="p-10">
                    <h1 className="w-1/4 mb-4 h-12 animate-pulse bg-gray-900"></h1>
                    <button className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white">
                        <a href="/boats" className="flex flex-row align-middle ">
                            <span className="material-symbols-outlined mr-1">arrow_back</span>Go back!
                        </a>
                    </button>

                    <section className="flex flex-col gap-4 mt-4">
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">directions_boat</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">build</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">person</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">south</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">north</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">construction</span><span className="leading-relaxed mb-3 w-1/4 h-2.5 animate-pulse bg-gray-400"></span></p>
                    </section>
                </main>
            )}

            {!isLoading && (
                <main className="p-10">
                    <h1 className="text-5xl text-gray-900 font-bold mb-5">
                        Boat {boatDetails.name}
                    </h1>
                    <button className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white">
                        <a href="/boats" className="flex flex-row align-middle ">
                            <span className="material-symbols-outlined mr-1">arrow_back</span>Go back!
                        </a>
                    </button>

                    <section className="flex flex-col gap-4 mt-4">
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">directions_boat</span><span>Name:</span><span className="font-bold">{boatDetails.name}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">build</span><span>Type:</span><span className="font-bold">{boatDetails.type}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">person</span><span>Owner:</span><span className="font-bold">{boatDetails.owner}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">south</span><span>Depth:</span><span className="font-bold">{boatDetails.depth}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">north</span><span>Height:</span><span className="font-bold">{boatDetails.height}</span></p>
                        <p className="flex items-center gap-2"><span className="material-symbols-outlined">construction</span><span>Buildyear:</span><span className="font-bold">{boatDetails.buildyear}</span></p>
                    </section>

                    <section className="flex flex-row gap-2 mt-10">
                        <button className="rounded bg-yellow-900 hover:bg-yellow-700 py-2 px-4 text-white">
                            <a href="" className="flex flex-row align-middle ">
                                <span className="material-symbols-outlined mr-1">edit</span>Edit
                            </a>
                        </button>
                        <button className="rounded bg-red-900 hover:bg-red-700 py-2 px-4 text-white">
                            <a href="" className="flex flex-row align-middle ">
                                <span className="material-symbols-outlined mr-1">delete</span>Delete
                            </a>
                        </button>
                    </section>
                </main>
            )}
        </>
    );
};

export default BoatDetail;
