import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function LoginPage() {
    const [loginType, setLoginType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(
                `https://aseesementr-interchalaclone.onrender.com/auth/${loginType}/login`, 
                { email, password }
            );
            localStorage.setItem('token', data.token);
            alert(`${loginType === 'student' ? 'Student' : 'Company'} Login Successful`);
            window.location.href = loginType === 'student' ? '/internships' : '/post-job';
        } catch (err) {
            setError(err.response?.data.message || 'Login failed. Please check your email and password.');
        }
    };

    // Handle navigation to RegisterPage
    const handleRegisterClick = () => {
        navigate(`/${loginType}/register`); // Navigate to the register page
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <div style={styles.toggle}>
                    {['student', 'company'].map(type => (
                        <button 
                            key={type} 
                            onClick={() => setLoginType(type)} 
                            style={styles.toggleButton(loginType === type)}>{`${type.charAt(0).toUpperCase() + type.slice(1)} Login`}</button>
                    ))}
                </div>
                {error && <p style={styles.error}>{error}</p>}
                <div style={styles.form}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
                    <button onClick={handleLogin} style={styles.button}>Login</button>
                </div>
                <div style={styles.footer}>
                    <p style={styles.footerText}>Don't have an account? 
                        <span onClick={handleRegisterClick} style={styles.link}> Register here</span>
                    </p>
                    <a href={`/${loginType}/forgot-password`} style={styles.link}>Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #007bff 0%, #6c757d 100%)' },
    card: { backgroundColor: '#fff', padding: '40px', width: '350px', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', textAlign: 'center' },
    title: { fontSize: '28px', fontWeight: '700', color: '#007bff', marginBottom: '30px' },
    toggle: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
    toggleButton: active => ({
        padding: '12px 24px', fontSize: '16px', border: '1px solid #007bff', borderRadius: '25px', cursor: 'pointer', margin: '0 8px',
        backgroundColor: active ? '#007bff' : '#fff', color: active ? '#fff' : '#007bff', fontWeight: '500'
    }),
    error: { color: '#e74c3c', fontSize: '14px', marginBottom: '15px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    input: { padding: '12px 15px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '8px' },
    button: { padding: '14px', fontSize: '16px', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    footer: { marginTop: '20px', fontSize: '14px', color: '#6c757d' },
    footerText: { marginBottom: '5px' },
    link: { color: '#007bff', textDecoration: 'none', cursor: 'pointer' }
};

export default LoginPage;
