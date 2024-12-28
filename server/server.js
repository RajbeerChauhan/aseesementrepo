const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.log('MongoDB connection error:', err));

// Schemas
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const postJobSchema = new mongoose.Schema({
    name: String, // Use name as per your database schema
    title: String,
    description: String,
    requirements: String,
    stipend: String,
});

const Student = mongoose.model('Student', studentSchema);
const Company = mongoose.model('Company', companySchema);
const PostJob = mongoose.model('PostJob', postJobSchema);

// Routes
app.post('/auth/student/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const student = new Student({ name, email, password });
        await student.save();
        res.status(201).send('Student registered successfully');
    } catch (err) {
        res.status(500).send('Error registering student');
    }
});

app.post('/auth/company/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const company = new Company({ name, email, password });
        await company.save();
        res.status(201).send('Company registered successfully');
    } catch (err) {
        res.status(500).send('Error registering company');
    }
});

app.post('/auth/student/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Student.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post('/auth/company/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Company.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post('/jobs', async (req, res) => {
    const { name, title, description, requirements, stipend } = req.body;
    try {
        const job = new PostJob({ name, title, description, requirements, stipend });
        await job.save();
        res.status(201).json({ message: 'Job posted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error posting job' });
    }
});

app.get('/jobs', async (req, res) => {
    try {
        const jobs = await PostJob.find(); // Fetch all jobs
        res.json(jobs); // Return the jobs
    } catch (err) {
        console.error('Error fetching jobs:', err.message);
        res.status(500).json({ message: 'Error fetching jobs' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
