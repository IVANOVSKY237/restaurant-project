require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./modals/userModal");
const config = require("./config/config");
const bcrypt = require("bcrypt");

async function checkUser() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.databaseURI);
        console.log('📦 Connected to MongoDB');

        // Find the user
        const user = await User.findOne({ email: 'mbaivanovsky@gmail.com' });
        if (!user) {
            console.log('❌ User not found');
            process.exit(0);
        }

        console.log('👤 User found:');
        console.log('📧 Email:', user.email);
        console.log('👤 Name:', user.name);
        console.log('📱 Phone:', user.phone);
        console.log('🔑 Role:', user.role);
        console.log('🔒 Password hash:', user.password);
        
        // Test password comparison
        const testPassword = 'password123';
        const isMatch = await bcrypt.compare(testPassword, user.password);
        console.log('🔐 Password "password123" matches:', isMatch);
        
        // Test with different passwords
        const testPasswords = ['password123', 'Password123', 'PASSWORD123', '123password'];
        for (const pwd of testPasswords) {
            const match = await bcrypt.compare(pwd, user.password);
            console.log(`🔐 Password "${pwd}" matches:`, match);
        }
        
    } catch (error) {
        console.error('💥 Error:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

checkUser();
