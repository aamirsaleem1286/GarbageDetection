"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart, registerables } from "chart.js";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import SpinLoading from "@/components/loading/SpinLoading";
import Toast from "@/utils/toast";
import { Edit, LogOut } from "lucide-react";
import Image from "next/image";

Chart.register(...registerables);

interface UserData {
    username: string;
    email: string;
    password: string;
    city: string;
    state: string;
    profilePicture?: string;
}

interface UserResponse {
    userData?: UserData;
}

const Page = () => {
    const [user, setUserData] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState<UserData>({
        username: "",
        email: "",
        password: "",
        city: "",
        state: "",
    });
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`/api/auth/profile`);
                const data = await response.json();
                setUserData(data);
                setEditFormData({
                    username: data?.userData?.username || "",
                    email: data?.userData?.email || "",
                    password: data?.userData?.password || "sasasa",
                    city: data?.userData?.city || "",
                    state: data?.userData?.state || "",
                });
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        getUserData();
    }, []);

    const handleEditModalOpen = () => {
        setShowEditModal(true);
    };

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleFormSubmit = () => {
        // Directly update profile image in the UI
        // Display success toast message
        Toast.SuccessshowToast("Profile image updated successfully");
        setShowEditModal(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); // Update profile image preview
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const logout = async () => {
        try {
            await axios.get("/api/auth/logout");
            Toast.SuccessshowToast("Logout Successful");
            router.refresh();
            router.push("/");
        } catch (error) {
            const errorMessage =  "Something went wrong";
            Toast.ErrorShowToast(errorMessage);
        }
    };

    return (
        <>
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <div>
                    <Image src="/signupbg.jpeg" alt="" width={300} height={300} style={{ width: "100%", marginTop: "-20px" }} />
                    <div className="flex flex-col min-h-[130vh] mt[-620px]" style={{ marginTop: "-620px" }}>
                        <div className="rounded-3xl w-full h-48 mt-3">
                            <div className="flex relative flex-col text-white justify-center items-center h-full">
                                <div className="flex flex-col gap-2 relative">
                                    <div className="relative" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <label htmlFor="profileImage" className="cursor-pointer">
                                            <img src={profileImage || user?.userData?.profilePicture || "https://i.pinimg.com/564x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg"} className="w-[130px] h-[130px] rounded-full" alt="" />
                                            <input type="file" id="profileImage" name="profileImage" className="hidden" accept="image/*" onChange={handleFileChange} />
                                        </label>
                                        <div className="absolute bottom-0 right-0 left-0 p-1 cursor-pointer" style={{ marginLeft: "133px" }} onClick={handleEditModalOpen}>
                                            <Edit size={30} className="text-black" />
                                        </div>
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-wide capitalize text-black">{user?.userData?.username}</h1>
                                </div>
                            </div>
                        </div>
                        <Modal title="Edit Profile Picture" visible={showEditModal} onOk={handleFormSubmit} onCancel={handleEditModalClose} okText="Save" cancelText="Cancel">
                            <form>
                                <div className="mb-4">
                                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                        Profile Picture
                                    </label>
                                    <input type="file" id="profileImage" name="profileImage" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" accept="image/*" onChange={handleFileChange} />
                                </div>
                            </form>
                        </Modal>
                        <div className="p-4 rounded-xl ">
                            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
                            <form
                                style={{ width: "260px", marginLeft: "40px" }}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleFormSubmit();
                                }}
                            >
                                <div className="mb-4">
                                    <label htmlFor="username" className="block font-semibold text-xl text-gray-700">
                                        Username
                                    </label>
                                    <input style={{ borderRadius: "25px" }} type="text" id="username" name="username" value={editFormData.username} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F1C3A] focus:border-[#0F1C3A] sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block font-semibold text-xl text-gray-700">
                                        Email
                                    </label>
                                    <input style={{ borderRadius: "25px" }} type="email" id="email" name="email" value={editFormData.email} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F1C3A] focus:border-[#0F1C3A] sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block font-semibold text-xl text-gray-700">
                                        Password
                                    </label>
                                    <input style={{ borderRadius: "25px" }} type="password" id="password" name="password" value={editFormData.password} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F1C3A] focus:border-[#0F1C3A] sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block font-semibold text-xl text-gray-700">
                                        City
                                    </label>
                                    <input style={{ borderRadius: "25px" }} type="text" id="city" name="city" value={editFormData.city} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F1C3A] focus:border-[#0F1C3A] sm:text-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state" className="block font-semibold text-xl text-gray-700">
                                        State
                                    </label>
                                    <input type="text" style={{ borderRadius: "25px" }} id="state" name="state" value={editFormData.state} onChange={handleInputChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0F1C3A] focus:border-[#0F1C3A] sm:text-sm" />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <button type="submit" className="bg-[#0F1C3A] w-[130px] text-white px-4 py-2 rounded-md">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div style={{marginTop: "20px",backgroundColor:" #0F1C3A",color: "white",width: "220px",height: "40px",marginLeft: "80px",display: "flex",alignItems: "center",justifyContent: "center",borderRadius: "20px"}}>
                            <button onClick={logout} className="flex gap-2 items-center bg-[#0F1C3A] text-white">
                                <LogOut size={20} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
