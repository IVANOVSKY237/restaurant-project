require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./modals/userModal");
const config = require("./config/config");

async function createTestUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.databaseURI);
        console.log('📦 Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ email: 'mbaivanovsky@gmail.com' });
        if (existingUser) {
            console.log('👤 User already exists!');
            console.log('📧 Email: mbaivanovsky@gmail.com');
            console.log('🔒 Password: password123');
            process.exit(0);
        }

        // Create user
        const testUser = new User({
            name: 'MBA Ivanovsky',
            email: 'mbaivanovsky@gmail.com',
            phone: 123456789,
            password: 'password123',
            role: 'admin'
        });

        await testUser.save();
        console.log('✅ User created successfully!');
        console.log('📧 Email: mbaivanovsky@gmail.com');
        console.log('🔒 Password: password123');

    } catch (error) {
        console.error('💥 Error creating test user:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

createTestUser();
