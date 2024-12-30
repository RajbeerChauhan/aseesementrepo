import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InternshipPage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { data } = await axios.get('https://aseesement.onrender.com/jobs');
                setJobs(data);
            } catch (err) {
                console.error('Error fetching jobs:', err.message);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Explore Exciting Internships</h1>
            <div style={styles.jobList}>
                {jobs.length === 0 ? (
                    <p style={styles.noJobsMessage}>No internships available at the moment.</p>
                ) : (
                    jobs.map((job) => (
                        <div
                            key={job._id}
                            style={styles.jobCard}
                            className="job-card"
                        >
                            <h2 style={styles.jobTitle}>{job.title}</h2>
                            <p style={styles.company}><strong>Company:</strong> {job.name}</p>
                            <p style={styles.jobDescription}>{job.description}</p>
                            <p style={styles.requirements}><strong>Requirements:</strong> {job.requirements}</p>
                            <p style={styles.stipend}><strong>Stipend:</strong> {job.stipend}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

const styles = {
    container: { 
        padding: '60px 20px', 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif', 
        background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#333',
        textAlign: 'center'
    },
    heading: { 
        fontSize: '48px', 
        color: '#2c3e50', 
        fontWeight: '700',
        letterSpacing: '2px',
        marginBottom: '40px',
        textTransform: 'uppercase',
        fontStyle: 'italic'
    },
    jobList: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '40px', 
        justifyContent: 'center', 
        maxWidth: '1200px',
        marginTop: '20px'
    },
    jobCard: { 
        padding: '30px', 
        border: '1px solid #e0e0e0', 
        borderRadius: '12px', 
        backgroundColor: '#fff', 
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)', 
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        textAlign: 'left',
        background: 'linear-gradient(145deg, #fff, #f7f7f7)',
    
    },
    jobCardHover: { 
        transform: 'translateY(-10px)', 
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)' 
    },
    jobTitle: { 
        fontSize: '26px', 
        color: '#2980b9', 
        fontWeight: '600', 
        marginBottom: '15px',
        lineHeight: '1.4',
        textTransform: 'capitalize'
    },
    company: { 
        fontSize: '18px', 
        color: '#7f8c8d', 
        marginBottom: '12px',
        fontWeight: '500',
        fontStyle: 'italic'
    },
    jobDescription: { 
        fontSize: '16px', 
        color: '#34495e', 
        marginBottom: '18px', 
        lineHeight: '1.6',
        fontWeight: '400'
    },
    requirements: { 
        fontSize: '15px', 
        color: '#7f8c8d', 
        marginBottom: '12px', 
        fontStyle: 'italic'
    },
    stipend: { 
        fontSize: '18px', 
        color: '#27ae60', 
        fontWeight: 'bold', 
        marginTop: '10px'
    },
    noJobsMessage: { 
        fontSize: '20px', 
        color: '#bdc3c7',
        fontWeight: '500',
        marginTop: '30px'
    }
};



export default InternshipPage;
