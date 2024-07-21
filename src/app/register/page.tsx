"use client";
import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stateandcity } from "@/assets/StateList";
import useDebounce from "@/hooks/debounce";
import { Error } from "@/types/ErrorTypes";
import Toast from "@/utils/toast";
import { IoChevronBackCircle } from "react-icons/io5";

const Page = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState<string>("");

    const handlePasswordChange = useDebounce((value) => {
        setPassword(value);
        if (confirmPassword && confirmPassword !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);

    const handleConfirmPasswordChange = useDebounce((value) => {
        setConfirmPassword(value);
        if (password && password !== value) {
            setPasswordMismatch(true);
        } else {
            setPasswordMismatch(false);
        }
    }, 800);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const UserData = {
                username: userName,
                email: email,
                password: password,
                state: selectedState,
            };
            const res = await axios.post("/api/auth/register", UserData);
            if (res) {
                Toast.SuccessshowToast(`Email sent to ${email} please verify` || "Something went wrong");
            } else {
                Toast.ErrorShowToast("Something went wrong");
            }
            router.push("/login");
        } catch (error: unknown) {
            const Error = error as Error;
            console.log(Error);
            Toast.ErrorShowToast(Error?.response?.data?.error || "Something went wrong");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        setSelectedState(state);
    };

    return (
        <>
            <section className="bg-cover bg-center bg-no-repeat min-h-[80vh] flex justify-center items-center" style={{ backgroundImage: `url('/signupbg.jpeg')` }}>
                <div className="mt-[-760px]">
                    <Link href={"/login"} className="font-bold text-lg p-4 flex items-center gap-2">
                        <IoChevronBackCircle className="text-white" size={50} />
                    </Link>
                </div>
                <div className="mt-[190px] ml-[-78px] border-2 border-white text-black w-full  md:m-auto p-4 rounded-tr-lg" style={{ borderTopRightRadius: "3.5rem" }}>
                    <h1 className="font-extrabold text-2xl text-center mb-5" style={{ fontFamily: " initial", fontSize: "xx-large" }}>
                        Create New <br /> Account
                    </h1>
                    <Link href={"/login"}>
                        <span className="text-center  text-[#0F1C3A] text-medium font-bold" style={{ marginLeft: "50px", color: "lightslategray", whiteSpace: "nowrap" }}>
                            Already have an account?
                            <Link href={"/login"} className="text-medium font-bold" style={{ color: "lightslategray" }}>
                                Login
                            </Link>
                        </span>
                    </Link>
                    <form autoComplete="false" className="flex flex-col gap-2" onSubmit={handleRegister} style={{ width: "225px", marginLeft: "44px" }}>
                        <label style={{ marginTop: "10px" }} htmlFor="text" className="text-lg text-semibold font-semibold">
                            Username
                        </label>
                        <input style={{ borderRadius: "25px" }} type="text" placeholder="Username" className="bg-transparent border-2 border-gray-400 duration-200 text-black p-2 focus:outline-[#0F1C3A] focus:border-[#0F1C3A] rounded-lg" onChange={(e) => setUserName(e.target.value)} />
                        <label htmlFor="Email" className="text-lg text-semibold font-semibold">
                            Email
                        </label>
                        <input style={{ borderRadius: "25px" }} type="email" placeholder="Email" className="bg-transparent border-2 border-gray-400 duration-200 text-black p-2 focus:outline-[#0F1C3A] focus:border-[#0F1C3A] rounded-lg" onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="text" className="text-lg text-semibold font-semibold">
                            Select Your State
                        </label>
                        <select onChange={handleStateChange} className="bg-transparent border-2 border-gray-400 p-2 focus:outline-none duration-200 rounded-lg text-black w-full" style={{ borderRadius: "25px" }}>
                            {Object.keys(stateandcity).map((state) => (
                                <option className="bg-black text-white w-[30px]" value={state} key={state}>
                                    {state}
                                </option>
                            ))}
                        </select>

                        <label className="text-lg text-semibold font-semibold" htmlFor="Password">
                            Password
                        </label>
                        <div className={`flex justify-between items-center border-2 rounded-lg text-black focus:outline-[#0F1C3A] focus:border-[#0F1C3A] ${passwordMismatch ? "border-red-500" : "border-gray-400"} p-2`} style={{ borderRadius: "25px", width: "227px", height: "45px" }}>
                            <input type={`${showPassword ? "text" : "password"}`} placeholder="Enter a password" className="bg-transparent border-none  text-black p-2 focus:outline-none rounded-lg w-[200%]" onChange={(e) => handlePasswordChange(e.target.value)} />
                            {showPassword ? <EyeOff size={35} onClick={() => setShowPassword(!showPassword)} /> : <Eye size={35} onClick={() => setShowPassword(!showPassword)} />}
                        </div>
                        <label className="text-lg text-semibold font-semibold" htmlFor="password">
                            Confirm Password
                        </label>
                        <div className={`flex justify-between items-center border-2 rounded-lg text-black ${passwordMismatch ? "border-red-500" : "border-gray-400"} p-2`} style={{ borderRadius: "25px", width: "227px", height: "45px" }}>
                            <input type={`${showConfirmPassword ? "text" : "password"}`} placeholder="Enter a password" className="bg-transparent border-none text-black p-2 focus:outline-none rounded-lg w-[200%]" onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                            {showConfirmPassword ? <EyeOff size={35} onClick={() => setShowConfirmPassword(!showConfirmPassword)} /> : <Eye size={35} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />}
                        </div>
                        {passwordMismatch && <span className="text-red-500 font-semibold">Password Didn't Match</span>}
                        {password && confirmPassword.length < 8 && <span className="text-red-500 font-semibold">Password should have at least 8 characters</span>}
                        {loading ? (
                            <button className="font-semibold flex gap-3 p-3 bg-[#0F1C3A] text-white rounded-lg items-center justify-center" disabled={true}>
                                <ClockLoader size={25} color="#fff" />
                                <span>Registering...</span>
                            </button>
                        ) : (
                            <button className={`p-3 ${userName && email && password && confirmPassword && password === confirmPassword ? "bg-[#0F1C3A] text-white cursor-pointer" : "bg-gray-300 text-white cursor-not-allowed"} rounded-lg mt-3 font-semibold duration-200`} style={{ width: "170px", marginLeft: "30px" }}>
                                Register
                            </button>
                        )}
                    </form>
                </div>
            </section>
        </>
    );
};

export default Page;
