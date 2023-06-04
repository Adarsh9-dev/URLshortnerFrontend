import React from "react";
import ShortURL from "./ShortURL";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NoPage from "./NoPage";

const App = ()=> {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ShortURL />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;