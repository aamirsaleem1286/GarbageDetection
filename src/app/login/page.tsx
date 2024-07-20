"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { ClockLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Toast from "@/utils/toast"; // Replace with actual Toast utility

// Define the type for WelcomePage props
interface WelcomePageProps {
    onAnimationEnd: () => void;
}

// WelcomePage component
const WelcomePage: React.FC<WelcomePageProps> = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, 2000); // Duration of the animation in milliseconds

        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="get-started text-center">
            <div className="image-container">
                <Image className="sliding-image w-full h-[700px]" src="/droneimg.jpeg" alt="DroneGarbage" width={250} height={700} style={{ objectFit: "fill" }} />
            </div>
        </div>
    );
};

// Define the type for LoginPage props
interface LoginPageProps {
    onLoginSuccess: () => void;
}

// LoginPage component
const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const loginData = { email, password };
            const response = await axios.post(`/api/auth/login`, loginData);
            Toast.SuccessshowToast(response?.data?.message || "Login Successful");
            console.log(response);
            router.push("/");
            onLoginSuccess(); // Trigger callback to hide login form and show welcome page again
        } catch (error) {
            // Check if error is an AxiosError and has a response
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data?.error || "Something went wrong";
                Toast.ErrorShowToast(errorMessage);
            } else {
                Toast.ErrorShowToast("An unexpected error occurred");
            }
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            className="flex min-h-[88vh] justify-center items-center text-black"
            style={{
                backgroundImage: `url('/loginimg.png')`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="mt-[300px] w-full max-w-md mx-[10px] p-4 my-8">
                <h1 className="font-semibold text-2xl text-[#0F1C3A] text-center ml-3 mb-5" style={{ fontFamily: "initial", fontSize: "35px" }}>
                    Login Here
                </h1>
                <form autoComplete="false" className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <label htmlFor="Email" className="font-semibold ml-[35px] mt-[-2px]">
                        Email
                    </label>
                    <div className="flex items-center border-2 rounded-lg p-2 w-[270px] ml-[18px] mt-[-8px] focus:outline-[#0F1C3A] focus:border-[#0F1C3A]" style={{ borderRadius: "25px" }}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-none flex-grow text-black p-2 w-0 focus:outline-none" autoComplete="off" />
                        <FaEnvelope size={20} className="text-black ml-2" />
                    </div>
                    <label htmlFor="Password" className="font-semibold ml-[35px]">
                        Password
                    </label>
                    <div className="flex items-center border-2 rounded-lg p-2 w-[270px] ml-[18px] mt-[-8px]" style={{ borderRadius: "25px" }}>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="bg-transparent border-none flex-grow text-black p-2 w-0 focus:outline-none" onChange={(e) => setPassword(e.target.value)} />
                        {showPassword ? <EyeOff size={20} onClick={() => setShowPassword(!showPassword)} className="cursor-pointer ml-2" /> : <Eye size={20} onClick={() => setShowPassword(!showPassword)} className="cursor-pointer ml-2" />}
                    </div>
                    <div className="flex justify-start mt-3">
                        <Link href={"/forgot-password"} className="text-[#0F1C3A] ml-[50px] mt-[-20px]">
                            Forgot Password?
                        </Link>
                    </div>
                    {loading ? (
                        <button className="font-semibold flex gap-3 p-3 ml-[50px] w-[225px] bg-[#0F1C3A] text-white rounded-lg items-center justify-center" disabled={true}>
                            <ClockLoader size={26} color="#fff" />
                            <span>Logging in...</span>
                        </button>
                    ) : (
                        <button className={`p-3 ml-[50px] w-[170px] ${email && password ? "bg-[#0F1C3A] text-white cursor-pointer" : "bg-black/30 text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200`} style={{ fontFamily: "ui-rounded", fontSize: "18px", marginLeft: "64px" }} disabled={!email || !password}>
                            Login
                        </button>
                    )}
                    <span className="text-center">
                        Don&apos;t have an account?{" "}
                        <Link href={"/register"} className="text-[#0F1C3A]">
                            Signup
                        </Link>
                    </span>
                </form>
            </div>
        </section>
    );
};

// Main Page component
const Page: React.FC = () => {
    const [showGetStarted, setShowGetStarted] = useState(true);

    const handleLoginSuccess = () => {
        setShowGetStarted(true); // Show WelcomePage again after successful login
    };

    return (
        <>
            {showGetStarted ? <WelcomePage onAnimationEnd={() => setShowGetStarted(false)} /> : null}
            {!showGetStarted ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : null}

            <style jsx>{`
                .get-started {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #4caf50;
                    animation: fadeOut 3s forwards;
                }
                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default Page;
