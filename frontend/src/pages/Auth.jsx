import React, { useState } from "react";
// Using a placeholder restaurant image URL - replace with your actual image path
import restaurant from "../assets/images/restaurant.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";7
import Login from "../components/auth/Login"

const Auth = () => {

    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Left Section */}
            <div className="w-1/2 relative flex items-center justify-center">
                {/* BG Image */}
                <img className="w-full h-full object-cover" src={restaurant} alt="Restaurant Image" />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-80"></div>

                {/* Quote at bottom */}
                <blockquote className="absolute bottom-6 px-6 text-xl italic text-white">
                    "Serve customers the best food with prompt and friendly service in a
                    welcoming atmosphere, and they'll keep coming back."
                    <br />
                    <span className="block mt-3 text-yellow-400">-- Founder of Restro</span>
                </blockquote>
            </div>

            {/* Right Section*/}
            <div className="w-1/2 min-h-screen bg-[#1a1a1a] pl-6 pr-3 py-6 flex flex-col">
                {/* Logo at top */}
                <div className="flex flex-col items-center gap-1 mb-3">
                    <img src={logo} alt="Restro Logo" className="h-10 w-10 border-2 rounded-full p-1" />
                    <h1 className="text-sm font-semibold text-[#f5f5f5] tracking-wide">Restro</h1>
                </div>

                {/* Title */}
                <h2 className="text-3xl text-center font-semibold text-yellow-400 mb-4">
                   {isRegistering ? "Employee Registration" : "Employee Login"} 
                </h2>
                {isRegistering ? <Register setIsRegister={setIsRegistering} /> : <Login />}

                {/* Registration Form - flex-1 to take remaining space */}
                <div className="flex-1 flex flex-col justify-center px-8">
                    <div className="w-full">
                       

                        <div className="flex justify-center mt-6">
                            <p className="text-base text-[#ababab]">
                                {isRegistering ? "Already have an account?" : "Don't have an account?"}
                                <button
                                    onClick={() => setIsRegistering(!isRegistering)}
                                    className="text-yellow-400 hover:underline bg-transparent border-none cursor-pointer ml-1"
                                >
                                   {isRegistering?"Sign in":"Sign up"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;