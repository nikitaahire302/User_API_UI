import React, { useState } from 'react';
import { API_URL } from './utils/constants';
import axios from 'axios';
import cors from 'cors';


const App = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});
    const [appId,setAppId] = useState('');
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        email: '',
        job_title: ''
    });
    const [updateData, setUpdateData] = useState({});
    const [response, setResponse] = useState('');

    // Replace with your actual API calls
    const getUsers = async () => {
        try {
            const res = await axios.get(API_URL);
            console.log("Fetched users:", res.data);
            setUsers(res.data.data); // Adjust based on the structure of the response
        } catch (error) {
            console.error("Error fetching users:", error.response ? error.response.data : error.message);
        }
    };
    
    const getUserById = async () => {
        try {
            const res = await axios.get(`${API_URL}/${userId}`);
            setUserData(res.data);
        } catch (error) {
            console.error("Error fetching user by ID:", error.response ? error.response.data : error.message);
        }
    };
    

    const postUser = async () => {
        // Example API call
        const res = await axios.post(API_URL, newUser,{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                appid:appId
              }
        });
        setResponse(`User created: ${JSON.stringify(res.data)}`); //Js - Json
        setNewUser({ first_name: '', last_name: '', gender: '', email: '', job_title: '' }); //Reset the object
        setAppId('');

    };

   // PUT Request - Update user
    const putUser = async () => {
        try {
            const res = await axios.put(`${API_URL}/${userId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    appid: appId
                }
            });
            setResponse(`User updated: ${JSON.stringify(res.data)}`);
            setUserId('');
            setUpdateData({});
            setAppId('');
        } catch (error) {
            console.error(error);
            setResponse('Error updating user');
        }
    };

    // PATCH Request - Partially update user
    const patchUser = async () => {
        try {
            const res = await axios.patch(`${API_URL}/${userId}`, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    appid: appId
                }
            });
            setResponse(`User partially updated: ${JSON.stringify(res.data)}`);
            setUserId('');
            setUpdateData({});
            setAppId('');
        } catch (error) {
            console.error(error);
            setResponse('Error partially updating user');
        }
    };

    // DELETE Request - Delete user
    const deleteUser = async () => {
        if (!userId) {
            setResponse('User ID is required');
            return;
        }
        
        try {
            await axios.delete(`${API_URL}/${userId}`, {
                headers: {
                    appid: appId
                }
            });
            setResponse('User deleted successfully');
            setUserId('');
            setAppId('');
        } catch (error) {
            console.error("Error deleting user:", error.response ? error.response.data : error.message);
            setResponse('Error deleting user');
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">User API UI</h1>

                <div className="mb-6">
                    <button
                        onClick={getUsers}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Get All Users
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h2 className="text-xl font-semibold mb-2">Users</h2>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(users, null, 2)}</pre>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Get User by ID</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={getUserById}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    >
                        Get User
                    </button>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap">{JSON.stringify(userData, null, 2)}</pre>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Create User</h2>
                    <input
                        type="text"
                        value={newUser.first_name}
                        onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.last_name}
                        onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.gender}
                        onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={newUser.job_title}
                        onChange={(e) => setNewUser({ ...newUser, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                      <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={postUser}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Update User (PUT)</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.last_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.gender || ''}
                        onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={updateData.email || ''}
                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.job_title || ''}
                        onChange={(e) => setUpdateData({ ...updateData, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                     <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={putUser}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
                    >
                        Update User
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Partially Update User (PATCH)</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.first_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, first_name: e.target.value })}
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.last_name || ''}
                        onChange={(e) => setUpdateData({ ...updateData, last_name: e.target.value })}
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.gender || ''}
                        onChange={(e) => setUpdateData({ ...updateData, gender: e.target.value })}
                        placeholder="Gender"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="email"
                        value={updateData.email || ''}
                        onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                        placeholder="Email"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        value={updateData.job_title || ''}
                        onChange={(e) => setUpdateData({ ...updateData, job_title: e.target.value })}
                        placeholder="Job Title"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                     <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={patchUser}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600"
                    >
                        Partially Update User
                    </button>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">Delete User</h2>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="User ID"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                     <input
                        type="text"
                        value={appId}
                        onChange={(e) => setAppId(e.target.value)}
                        placeholder="API KEY"
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-2"
                    />
                    <button
                        onClick={deleteUser}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                        Delete User
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Response</h2>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap">{response}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
