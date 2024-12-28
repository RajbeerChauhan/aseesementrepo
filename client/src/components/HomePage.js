import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const navLinks = [
        { path: '/login', label: 'Login' },
        { path: '/register', label: 'Register' },
        { path: '/login', label: 'Browse Internships' }, // Redirect Browse Internships to Login
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.logo}>Internshala</div>
                <nav>
                    <ul style={styles.navList}>
                        {navLinks.map((link, index) => (
                            <li key={index} style={styles.navItem}>
                                <Link to={link.path} style={styles.navLink}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <section style={styles.heroSection}>
                <div style={styles.heroText}>
                    <h1 style={styles.heroHeading}>Find Your Dream Internship</h1>
                    <p style={styles.heroDescription}>Explore thousands of internships and kickstart your career with us.</p>
                    <Link to="/login" style={styles.heroButton}>Browse Internships</Link>
                </div>
            </section>

            <section style={styles.featuresSection}>
                <h2 style={styles.featuresHeading}>Why Internshala Clone?</h2>
                <div style={styles.featuresContainer}>
                    {features.map((feature, index) => (
                        <div key={index} style={styles.featureCard}>
                            <h3 style={styles.featureTitle}>{feature.title}</h3>
                            <p style={styles.featureDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={styles.footer}>
                <p style={styles.footerText}>&copy; 2024 Internshala Clone. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

const features = [
    { title: 'Verified Internships', description: 'All internships are vetted to ensure quality opportunities.' },
    { title: 'Easy Application', description: 'Apply to internships with just a single click.' },
    { title: 'Career Growth', description: 'Gain experience and boost your resume.' },
];

const styles = {
    container: { fontFamily: "'Roboto', sans-serif", backgroundColor: '#f8f9fa', margin: 0, padding: 0 },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' },
    logo: { fontSize: '1.8rem', fontWeight: 'bold' },
    navList: { listStyle: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0 },
    navLink: { textDecoration: 'none', color: '#fff', fontSize: '1rem', padding: '8px 15px', borderRadius: '5px', transition: 'background-color 0.3s' },
    heroSection: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '70vh', background: 'linear-gradient(135deg, #007bff, #0056b3)', color: '#fff', textAlign: 'center', padding: '20px' },
    heroHeading: { fontSize: '3rem', fontWeight: 'bold' },
    heroDescription: { fontSize: '1.2rem', margin: '15px 0' },
    heroButton: { padding: '12px 25px', fontSize: '1rem', fontWeight: 'bold', color: '#fff', backgroundColor: '#28a745', border: 'none', borderRadius: '5px', textDecoration: 'none', cursor: 'pointer', transition: 'transform 0.3s ease' },
    featuresSection: { padding: '40px 20px', textAlign: 'center', backgroundColor: '#fff' },
    featuresHeading: { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' },
    featuresContainer: { display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' },
    featureCard: { flex: '0 1 300px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease' },
    featureTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' },
    featureDescription: { fontSize: '1rem', color: '#555' },
    footer: { backgroundColor: '#007bff', color: '#fff', textAlign: 'center', padding: '15px 0', marginTop: '30px' },
    footerText: { fontSize: '0.9rem' },
};

export default HomePage;
