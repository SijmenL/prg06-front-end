import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


const BoatEditForm = ({match}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [boatDetails, setBoatDetails] = useState({});
    const boatId = useParams();
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);

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

    const handleCancelEdit = () => {
        navigate(`/boats/${boatId.id}`);
    };

    const handleSaveEdit = async () => {
        try {
            console.log(boatDetails)
            const response = await fetch(`http://145.24.222.58:8000/boats/${boatId.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(boatDetails),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            navigate(`/boats/${boatId.id}`);
        } catch (error) {
            console.error('Update error:', error);

            setHasError(true);
        }
    };

    const handleInputChange = (e) => {
        // Update the boatDetails state when the input value changes
        setBoatDetails({
            ...boatDetails,
            [e.target.name]: e.target.value,
        });
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
                </main>
            )}

            {!isLoading && (
                <main className="p-10">
                    <h1 className="text-5xl text-gray-900 font-bold mb-5">
                        Edit {boatDetails.name}
                    </h1>

                    <form className="flex flex-col gap-4 mt-4 md:w-1/2">
                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor={'name'} className="flex items-center gap-2"><span
                                className="material-symbols-outlined">directions_boat</span><span>Name:</span></label>
                            <input onChange={handleInputChange} value={boatDetails.name}
                                   className="border-2 rounded w-full" type={"text"}
                                   name={'name'} id={"name"} maxLength={30} required={true}></input>
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor={'type'} className="flex items-center gap-2"><span
                                className="material-symbols-outlined">build</span><span>Type:</span></label>
                            <input onChange={handleInputChange} value={boatDetails.type}
                                   className="border-2 rounded w-full" type={"text"}
                                   name={'type'} id={"type"} required={true}></input>
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor="owner" className="flex items-center gap-2">
                                <span className="material-symbols-outlined">person</span>
                                <span>Owner:</span>
                            </label>
                            <input
                                onChange={handleInputChange}
                                value={boatDetails.owner}
                                className="border-2 rounded w-full"
                                type="text"
                                name="owner"
                                id="owner"
                                required={true}
                            />
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor="depth" className="flex items-center gap-2">
                                <span className="material-symbols-outlined">south</span>
                                <span>Depth:</span>
                            </label>
                            <input
                                onChange={handleInputChange}
                                value={boatDetails.depth}
                                className="border-2 rounded w-full"
                                type="number"
                                name="depth"
                                id="depth"
                            />
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor="height" className="flex items-center gap-2">
                                <span className="material-symbols-outlined">north</span>
                                <span>Height:</span>
                            </label>
                            <input
                                onChange={handleInputChange}
                                value={boatDetails.height}
                                className="border-2 rounded w-full"
                                type="number"
                                name="height"
                                id="height"
                            />
                        </div>

                        <div className="flex md:flex-row flex-col gap-2">
                            <label htmlFor="buildyear" className="flex items-center gap-2">
                                <span className="material-symbols-outlined">construction</span>
                                <span>Buildyear:</span>
                            </label>
                            <input
                                onChange={handleInputChange}
                                value={boatDetails.buildyear}
                                className="border-2 rounded w-full"
                                type="text"
                                name="buildyear"
                                id="buildyear"
                            />
                        </div>

                    </form>

                    <section className="flex flex-row gap-2 mt-10">
                        <button onClick={handleSaveEdit}
                                className="rounded bg-green-900 hover:bg-green-700 py-2 px-4 text-white flex flex-row align-middle">
                            <span className="material-symbols-outlined mr-1">save</span>Save
                        </button>
                        <button onClick={handleCancelEdit}
                                className="rounded bg-red-900 hover:bg-red-700 py-2 px-4 text-white flex flex-row align-middle">
                            <span className="material-symbols-outlined mr-1">cancel</span>Cancel
                        </button>
                    </section>
                    {hasError && (
                        <p className={'text-red-600 font-bold mt-2'}>Name, type and owner are required.</p>
                    )}
                </main>
            )}
        </>
    );
};

export default BoatEditForm;
