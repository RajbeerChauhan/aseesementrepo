import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [registerType, setRegisterType] = useState('student');
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }
        try {
            const endpoint = registerType === 'student'
                ? 'https://aseesementr-interchalaclone.onrender.com/auth/student/register'
                : 'https://aseesementr-interchalaclone.onrender.com/auth/company/register';

            const response = await axios.post(endpoint, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 201) {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (error) {
            setMessage('Registration failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Join Us</h2>
                <div style={styles.toggle}>
                    <button
                        style={registerType === 'student' ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setRegisterType('student')}
                    >
                        Student
                    </button>
                    <button
                        style={registerType === 'company' ? styles.activeTab : styles.inactiveTab}
                        onClick={() => setRegisterType('company')}
                    >
                        Company
                    </button>
                </div>
                <form style={styles.form} onSubmit={handleRegister}>
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        style={styles.input}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" style={styles.submitButton}>Register</button>
                </form>
                {message && <p style={styles.message}>{message}</p>}
                <div style={styles.footer}>
                    <p style={styles.footerText}>Already have an account? <a href="/login" style={styles.link}>Login here</a></p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #007bff 0%, #6c757d 100%)',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        width: '350px',
        borderRadius: '12px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#007bff',
        marginBottom: '30px',
    },
    toggle: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    activeTab: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '25px',
        cursor: 'pointer',
        margin: '0 8px',
    },
    inactiveTab: {
        backgroundColor: '#fff',
        color: '#007bff',
        border: '1px solid #007bff',
        padding: '12px 24px',
        borderRadius: '25px',
        cursor: 'pointer',
        margin: '0 8px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
    },
    submitButton: {
        padding: '14px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    message: {
        color: '#333',
        fontSize: '14px',
        marginTop: '15px',
    },
    footer: {
        marginTop: '20px',
        fontSize: '14px',
        color: '#6c757d',
    },
    footerText: {
        marginBottom: '5px',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    },
};

export default RegisterPage;
