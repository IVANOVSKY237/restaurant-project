// Simple test to check logout functionality
const axios = require('axios');

async function testLogout() {
    try {
        // First, let's test if the server is running
        const healthCheck = await axios.get('http://localhost:8000/');
        console.log('✅ Backend server is running:', healthCheck.data);

        // Test logout endpoint (this will fail without auth, but we can see if the endpoint exists)
        try {
            const logoutResponse = await axios.post('http://localhost:8000/api/user/logout');
            console.log('✅ Logout endpoint response:', logoutResponse.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.log('✅ Logout endpoint exists but requires authentication (expected)');
            } else {
                console.log('❌ Logout endpoint error:', error.message);
            }
        }

    } catch (error) {
        console.log('❌ Backend server is not running or not accessible:', error.message);
    }
}

testLogout();
