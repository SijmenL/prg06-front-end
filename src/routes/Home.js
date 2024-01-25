// routes/home.js
import React from 'react';

const Home = () => {
    return (
        <main className="p-10">
            <h1 className="text-5xl text-gray-900 font-bold mb-5">Welcome to the Boat Library</h1>
            <div className="flex flex-col items-center md:flex-row">
                <div>
                    <p className="pb-5">The Boat Library is a comprehensive platform designed for boat enthusiasts,
                        providing a user-friendly
                        space to manage and explore a diverse collection of boats. This innovative platform enables
                        users to
                        seamlessly upload information about their boats and gain valuable insights into various
                        aspects
                        of
                        these maritime assets.</p>
                    <p className="pb-5">Boat owners can easily showcase their vessels within the Boat Library,
                        offering a
                        detailed profile
                        that includes key information such as the owner's details, boat type, build year, and the
                        boat's
                        given name. This curated database allows users to share their passion for boating, connect
                        with
                        like-minded individuals, and contribute to a growing community of boat enthusiasts.</p>
                    <p className="pb-5">For boat seekers and enthusiasts, the Boat Library serves as an invaluable
                        resource
                        for exploring a
                        wide array of boats. Whether you are interested in a specific boat type, searching for
                        vessels built
                        in a particular year, or simply looking for inspiration, the platform's intuitive interface
                        makes it
                        easy to navigate and discover boats that match your preferences.</p>
                    <p className="pb-5">
                        The Boat Library goes beyond a traditional showcase by fostering a sense of community among
                        boat
                        enthusiasts. Users can connect with boat owners, share experiences, and exchange information
                        about
                        maintenance, modifications, and the unique stories behind each vessel. This collaborative
                        space aims
                        to create a vibrant community where individuals with a shared love for boating can come
                        together.
                    </p>
                    <p className="pb-5">
                        With its user-friendly features and a wealth of boat-related information, the Boat Library
                        stands as
                        a go-to platform for both boat owners and enthusiasts alike. Whether you are a proud boat
                        owner
                        looking to share the details of your vessel or someone eager to explore the fascinating
                        world of
                        boats, the Boat Library provides a seamless and enjoyable experience for all maritime
                        enthusiasts.
                    </p>
                </div>
                <img className="w-96 p-10" alt="boat"
                     src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Motorboat_at_Kankaria_lake.JPG/1200px-Motorboat_at_Kankaria_lake.JPG"></img>
            </div>

            <div className="flex flex-row justify-center md:justify-start">
            <button className="rounded bg-gray-900 hover:bg-gray-700 py-2 px-4 text-white">
                <a href="/boats" className="flex flex-row align-middle ">
                <span className="material-symbols-outlined mr-1">arrow_forward</span>Explore the Library!
                </a>
            </button>
            </div>

        </main>
    );
};

export default Home;