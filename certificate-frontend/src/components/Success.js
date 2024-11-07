import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();

    //setting rowCount to zero if it is not available, or if it is undefined
    const { rowCount = 0 } = location.state || {};


    function handleTimeCount() {
        const timeCount = Number(rowCount);
        if (timeCount / 60 > 59) {
            let hours = 0;
            let minutes = 0;
            let seconds = 0;
            hours = Math.floor((timeCount / 60) / 60);
            minutes = Math.floor((timeCount / 60) % 60);
            seconds = Math.floor(timeCount % 60);
            return `${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        }
        else {
            let minutes = 0;
            let seconds = 0;

            minutes = Math.floor((timeCount / 60));
            seconds = Math.floor(timeCount % 60);

            return `${minutes} minutes, and ${seconds} seconds`;
        }

    }


    return (
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center">Success!</h1>
                <p className="text-lg text-center mt-4">Your file has been uploaded successfully. Certificates will be generated shortly. <br /> If you want to send more certificates then try after <span className="font-semibold">{handleTimeCount()}</span></p>
                <div className="flex justify-center mt-8">
                    <button onClick={() => navigate('/upload')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;