// pages/hello-world.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const HelloWorld = () => {
    const [message, setMessage] = useState([]);
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const username = localStorage.getItem('username'); // Get the username from localStorage
    
        if (!token) {
            alert('Please log in first!');
            router.push('/login');
        } else {
            let helloMessages = [];
            let count = 0;
            while (count < 50) {
                helloMessages.push(`Hello ${username || 'User'}`); // Default to 'User' if username is not set
                count++;
            }
            setMessage(helloMessages);
        }
    }, [router]);
    

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        alert('Logged out successfully!');
        router.push('/login');
    };

    // Delete user
    const handleDelete = () => {
        const token = localStorage.getItem('auth_token'); // Use correct token key
        if (!token) {
            alert('You need to be logged in to delete your account.');
            return;
        }

        fetch('/api/user', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error Response:', errorText);
                    throw new Error(`Failed to delete user. Server returned ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                    localStorage.removeItem('auth_token'); // Clear token after deletion
                    router.push('/login'); // Redirect to login page
                }
            })
            .catch((error) => {
                console.error('Error:', error.message);
                alert('An error occurred. Please try again.');
            });
    };

    // Update user password
    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            await axios.put(
                'http://localhost:3000/api/user',
                { password: newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Password updated successfully!');
        } catch (err) {
            alert('Error updating password.');
        }
    };

    return (
        <div>
            <h1>Welcome to Hello World Page!</h1>
            <ul>
                {message.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Logout</button>
            <h2>Update Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleUpdate}>Update Password</button>
            <h2>Delete Account</h2>
            <button onClick={handleDelete}>Delete Account</button>
        </div>
    );
};

export default HelloWorld;
