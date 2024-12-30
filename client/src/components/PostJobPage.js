import React, { useState } from 'react';
import axios from 'axios';

function PostJobPage() {
    const [formData, setFormData] = useState({ name: '', title: '', description: '', requirements: '', stipend: '' });
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        if (!formData.name) return setMessage('Company name is required.');

        try {
            const { data } = await axios.post('https://aseesement.onrender.com/jobs', formData);
            setMessage(data.message);
            setFormData({ name: '', title: '', description: '', requirements: '', stipend: '' });
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error posting job.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Post a Job</h2>
                {message && <p style={styles.message}>{message}</p>}
                <form style={styles.form} onSubmit={handlePostJob}>
                    {['name', 'title', 'stipend'].map((field) => (
                        <input
                            key={field}
                            type="text"
                            placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            style={styles.input}
                            required
                        />
                    ))}
                    {['description', 'requirements'].map((field) => (
                        <textarea
                            key={field}
                            placeholder={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            style={styles.textarea}
                            required
                        />
                    ))}
                    <button type="submit" style={styles.button}>Post Job</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to bottom, #007bff, #00d2ff)' },
    card: { backgroundColor: '#fff', padding: '40px', width: '400px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', textAlign: 'center' },
    title: { fontSize: '1.8rem', fontWeight: '600', color: '#007bff', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column' },
    input: { padding: '12px 15px', marginBottom: '15px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' },
    textarea: { padding: '12px 15px', marginBottom: '15px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', resize: 'none', height: '100px' },
    button: { padding: '14px', fontSize: '16px', fontWeight: 'bold', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '15px' },
    message: { color: '#d9534f', marginBottom: '15px' },
};

export default PostJobPage;
