import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const [isLogin, setIsLogin] = useState(true); // Toggle state for login/signup
const router = useRouter();

// Handle login
// Handle login
const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
        const response = await axios.post('http://localhost:3000/api/login', { username, password });
        // Store the auth token and username in localStorage
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('username', response.data.user.username); // Save the username
        alert('Login successful!');
        router.push('/hello-world');
    } catch (err) {
        setError('Invalid credentials. Please try again.');
    }
};


// Handle signup
const handleSignup = async (e) => {
e.preventDefault();
setError('');
setSuccess('');
try {
    const response = await axios.post('http://localhost:3000/api/register', { username, password });
    setSuccess('User registered successfully! Please log in.');
    alert('Signup successful!');
} catch (err) {
    setError(err.response?.data?.error || 'Error creating user. Please try again.');
}
};

return (
<div style={styles.container}>
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    {error && <p style={styles.error}>{error}</p>}
    {success && <p style={styles.success}>{success}</p>}

    {/* Toggle between Login and Sign Up */}
    {isLogin ? (
    <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
        <label style={styles.label}>Username</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
        />
        </div>
        <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
        />
        </div>
        <button type="submit" style={styles.button}>Login</button>
    </form>
    ) : (
    <form onSubmit={handleSignup} style={styles.form}>
        <div style={styles.inputGroup}>
        <label style={styles.label}>Username</label>
        <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
        />
        </div>
        <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
        />
        </div>
        <button type="submit" style={styles.button}>Sign Up</button>
    </form>
    )}

    {/* Toggle between Login and Sign Up */}
    <p style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
    {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
    </p>
</div>
);
};

// Styles for the login page
const styles = {
container: {
maxWidth: '400px',
margin: '0 auto',
padding: '20px',
textAlign: 'center',
border: '1px solid #ccc',
borderRadius: '10px',
boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
backgroundColor: '#f9f9f9',
},
form: {
marginBottom: '20px',
},
inputGroup: {
marginBottom: '15px',
},
label: {
fontSize: '14px',
color: '#555',
textAlign: 'left',
display: 'block',
marginBottom: '5px',
},
input: {
width: '100%',
padding: '10px',
fontSize: '16px',
borderRadius: '5px',
border: '1px solid #ccc',
},
button: {
backgroundColor: '#007BFF',
color: 'white',
padding: '10px 15px',
fontSize: '16px',
border: 'none',
borderRadius: '5px',
cursor: 'pointer',
width: '100%',
},
error: {
color: 'red',
fontSize: '14px',
},
success: {
color: 'green',
fontSize: '14px',
},
toggleText: {
color: '#007BFF',
cursor: 'pointer',
textDecoration: 'underline',
fontSize: '14px',
},
};

export default Login;
