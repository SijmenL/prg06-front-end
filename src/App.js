// App.js
import './App.css';
import * as React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './routes/Home';
import Boats from './routes/Boats';
import Layout from './routes/Layouts';
import NoPage from './routes/NoPage';
import BoatDetail from "./routes/BoatDetail";
import BoatEditForm from "./routes/BoatEdit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="boats" element={<Boats />} />
                    <Route path="boats/create" element={<Boats />} />
                    <Route path="boats/:id" element={<BoatDetail />} />
                    <Route path="/boats/:id/edit" element={<BoatEditForm />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);