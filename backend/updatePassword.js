require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./modals/userModal");
const config = require("./config/config");

async function updatePassword() {
    try {
        // Connect to MongoDB
        await mongoose.connect(config.databaseURI);
        console.log('📦 Connected to MongoDB');

        // Find and update the user
        const user = await User.findOne({ email: 'mbaivanovsky@gmail.com' });
        if (!user) {
            console.log('❌ User not found');
            process.exit(0);
        }

        console.log('👤 Found user:', user.email);
        
        // Update password - this will trigger the pre-save hook to hash it
        user.password = 'password123';
        await user.save();
        
        console.log('✅ Password updated successfully!');
        console.log('📧 Email: mbaivanovsky@gmail.com');
        console.log('🔒 New Password: password123');
        
    } catch (error) {
        console.error('💥 Error:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

updatePassword();
