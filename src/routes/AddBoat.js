// AddBoatForm.js
import React, {useState} from 'react';

const AddBoatForm = ({onClose, onCreate}) => {
    const [boatDetails, setBoatDetails] = useState({
        name: '',
        type: '',
        owner: '',
    });
    const [hasError, setHasError] = useState(false);

    const handleInputChange = (e) => {
        setBoatDetails({
            ...boatDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        // Perform validation if needed
        if (boatDetails.name === "" || boatDetails.type === "" || boatDetails.owner === "") {
            setHasError(true)
        } else {
            onCreate(boatDetails);
            onClose();
        }
    };

    return (
        <div className={'z-10 w-full h-full bg-opacity-50 bg-black backdrop-blur fixed top-0 left-0 overflow-scroll md:overflow-hidden'}>
            <div className="z-20 bg-white fixed rounded-2xl p-5 w-9/12 top-24 left-14 md:w-2/3 md:h-2/3 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 border-2 overflow-scroll no-scrolbar">
                <div className={'flex flex-row justify-between'}>
                    <h1 className="text-5xl text-gray-900 font-bold mb-7">
                        Add boat {boatDetails.name}
                    </h1>
                    <button onClick={onClose}
                            className="hover:text-red-600 py-2 px-4 flex flex-row align-middle">
                        <span className="material-symbols-outlined mr-1">close</span>
                    </button>
                </div>
                <form className="flex flex-col gap-4 mt-4">
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
                    <button onClick={handleSave}
                            className="rounded bg-green-900 hover:bg-green-700 py-2 px-4 text-white flex flex-row align-middle">
                        <span className="material-symbols-outlined mr-1">save</span>Save
                    </button>
                </section>
                {hasError && (
                    <p className={'text-red-600 font-bold mt-2'}>Name, type and owner are required.</p>
                )}

            </div>
        </div>
    );
};

export default AddBoatForm;
