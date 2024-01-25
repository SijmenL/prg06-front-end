import logo from '../logo.png'

export default function Navbar() {
    return (
        <nav className="bg-gray-900 p-2 pl- pr-10 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center flex-col sm:flex-row">
                <a href="/">
                <div className="text-white font-bold text-lg flex flex-row gap-4 items-center">
                    <img className="w-10 sm:w-20 translate-y-3.5 sm:translate-y-0" alt="logo" src={logo}></img>
                    <p>The Boat Library</p>
                </div>
                </a>
                <ul className="ml-4 flex gap-4 justify-between flex-row">
                    <a href="/">
                    <li className="text-white hover:underline">Home</li>
                    </a>
                    <a href="/boats">
                    <li className="text-white hover:underline">Boats</li>
                    </a>
                </ul>
            </div>
        </nav>
    );
};
