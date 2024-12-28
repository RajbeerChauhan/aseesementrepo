const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // You need to install bcryptjs

// User schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Added required validation
    },
    email: {
        type: String,
        unique: true,
        required: true, // Added required validation
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Added email validation
    },
    password: {
        type: String,
        required: true,  // Password is required
    },
    role: {
        type: String,
        enum: ['student', 'employer', 'admin'],
        default: 'student',
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt
});

// Password hashing before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Only hash the password if it has been modified
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare entered password with stored hash
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create a model based on the schema
module.exports = mongoose.model('User', userSchema);
