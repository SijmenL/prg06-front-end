import logo from '../logo.png'

export default function Footer() {
    return (
        <footer className="bg-gray-900 h-40 flex flex-col items-center mt-auto">
            <div className="text-white font-bold text-lg flex flex-row gap-4 items-center mt-3">
                <img className="max-w-20" alt="logo" src={logo}></img>
                <p>The Boat Library</p>
            </div>
            <p className="text-white mt-5s">&copy;2024 Sijmen Lokers</p>
            <p className="text-white">PRG06</p>
        </footer>
    );
};
