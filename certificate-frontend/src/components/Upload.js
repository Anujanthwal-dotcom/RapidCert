// src/components/Upload.js
import React, { useState } from 'react';
import { auth } from '../authentication/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import * as XLSX from 'xlsx';




const Upload = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [templateFile, setTemplateFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');

    const navigate = useNavigate();



    //function for counting rows
    async function CountRows() {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    resolve(rows.length);
                }
                catch (error) {
                    console.error('Error reading Excel file:', error);
                    reject(error);
                }
            }

            reader.onerror = (error) => {
                console.error('Error reading Excel file:', error);
                reject(error);
            }

            reader.readAsArrayBuffer(excelFile);
        });

    }



    const handleUpload = async (e) => {
        e.preventDefault();

        if (!excelFile || !templateFile) {
            setUploadMessage('Please select both files before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', excelFile);
        formData.append('templateFile', templateFile);

        //to count the number of rows in the excel file. Assuming that one second is taken for sending one certificate
        const rows = await CountRows();

        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }


            navigate('/success', { state: { rowCount: rows - 1 } });


        } catch (error) {
            console.error('Upload error:', error);
            setUploadMessage('Failed to upload files. Please try again.');
        }

    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md space-y-4 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-100">Upload Files</h2>
                    <button
                        onClick={handleLogout}
                        className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition duration-200"
                    >
                        Logout
                    </button>
                </div>
                {uploadMessage && <p className="text-center text-green-400">{uploadMessage}</p>}
                <form onSubmit={handleUpload} className="space-y-4">
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => setExcelFile(e.target.files[0])}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => setTemplateFile(e.target.files[0])}
                        className="w-full px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 focus:outline-none transition duration-200"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Upload;
