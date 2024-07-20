// pages/index.js
"use client"
import React from "react";

const Videopage = () => {
    return (
        <div className="container h-screen flex flex-col justify-center items-center">
            <h1 className="heading text-3xl font-bold mb-8">Drone View</h1>
            <div className="webcam-container w-full h-full overflow-hidden">
                <iframe src="http://192.168.2.101:8080/browserfs.html" className="webcam-video w-full h-full" allow="autoplay" frameBorder="0" onError={(e) => console.error("Error loading iframe:", e)}></iframe>
            </div>
        </div>
    );
};

export default Videopage;
