"use client";
import React, { useEffect, useState } from "react";
import { Bell, CircleCheck, CircleX, History, X } from "lucide-react";
import Link from "next/link";
import { FaMapMarkerAlt, FaVideo } from "react-icons/fa";
import SpinLoading from "@/components/loading/SpinLoading";

export interface ApiResponse {
    message: string;
    userData: UserData;
}

export interface UserData {
    city: string;
    email: string;
    isVerified: boolean;
    isWorker: boolean;
    phoneNumber: string;
    profilePicture: string;
    state: string;
    totalPointsEarned: number;
    userDescription: string;
    username: string;
    wasteDumped: any[]; // You might want to define a type for wasteDumped if it has a specific structure
}
interface MaterialData {
    [key: string]: {
        merits: string;
        demerits: string;
    };
}

const materialData: MaterialData = {
    Plastic: {
        merits: "Plastic is versatile and lightweight.",
        demerits: "Plastic is non-biodegradable and contributes to pollution.",
    },
    Glass: {
        merits: "Glass is recyclable and does not degrade over time.",
        demerits: "Glass production requires a lot of energy.",
    },
    Paper: {
        merits: "Paper is biodegradable and recyclable.",
        demerits: "Paper production can lead to deforestation.",
    },
    Metal: {
        merits: "Metal is durable and can be recycled repeatedly.",
        demerits: "Metal extraction and processing can be energy-intensive.",
    },
};

const Page = () => {
    const [user, setUserData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [openNotification, setOpenNotification] = useState<boolean>(false);
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null); // State to hold the selected material
    const [openModal, setOpenModal] = useState<boolean>(false);

    const getUserData = async () => {
        try {
            const response = await fetch(`/api/auth/profile`);
            const data = await response.json();
            console.log(data);
            setUserData(data);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            console.log(error);
            return [];
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    // Function to handle opening the modal and setting the selected material
    const handleMaterialClick = (material: string) => {
        setSelectedMaterial(material);
        setOpenModal(true);
    };

    const calculateTotalCO2Saved = () => {
        if (!user || !user.userData || !user.userData.wasteDumped) return 0;

        let totalCO2Saved = 0;

        user.userData.wasteDumped.forEach((waste) => {
            // Assuming wasteDumped objects have a property named wastePoints indicating CO2 saved
            totalCO2Saved += waste.wastePoints || 0;
        });

        return totalCO2Saved;
    };

    return (
        <section className="flex flex-col gap-3 pt-2">
            {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                    <SpinLoading />
                </div>
            ) : (
                <>
                    {user ? (
                        <section className=" p-2 flex flex-col gap-8 relative">
                            <div className="flex items-center justify-between ">
                                <Link href={"/profile"} className="flex items-center gap-3">
                                    <img src={"/profile.jpg"} className=" w-12 h-12 rounded-xl" alt="" />
                                    <div className="flex flex-col gap-0">
                                        <h1 className=" font-semibold text-xl capitalize text-[#0F1C3A]">Hi,{user?.userData?.username || "Unknown"}</h1>
                                        <span className=" text-sm font-medium opacity-70 text-[#0F1C3A] ">
                                            {user?.userData?.city || "Karachi"}, {user?.userData?.state || "Unknown"}
                                        </span>
                                    </div>
                                </Link>

                                <div className="flex gap-3">
                                    <Link href={"/history"}>
                                        <History size={30} className="text-[#0F1C3A]  opacity-60" />
                                    </Link>
                                    <Bell size={30} className=" opacity-60 relative text-[#0F1C3A] " onClick={() => setOpenNotification(!openNotification)} />
                                    <div className={` w-[200px] h-[100px] z-50 overscroll-y-scroll absolute bg-white ${openNotification ? " scale-100" : "scale-0"} duration-200 rounded-lg top-16 shadow-md shadow-black/40 right-5 border-2 border-black/10`}>
                                        {/* <li className="bg-black text-white text-xl font-bold ">Welcome User</li>*/}
                                        <br />
                                        <span className="ml-2 text-xl font-bold">you have recently log in </span>
                                    </div>
                                </div>
                            </div>
                            {/* <div className=" bg-black shadow-2xl p-6 shadow-black/30 rounded-lg w-full ">
                                <div className="flex items-center justify-between gap-4 p-4 text-white">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Landmark size={32} />
                                        </div> */}
                            {/* {console.log(user?.userData.userpointsearned)} */}
                            {/* <span className=" font-semibold uppercase text-lg">{user?.userData.totalPointsEarned ? user?.userData.totalPointsEarned : 20}</span> */}
                            {/* <span className=" font-semibold uppercase text-lg">user points earned</span> */}
                            {/* <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Points</span>
                                    </div>

                                    <div className=" h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Cloud size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{calculateTotalCO2Saved()}G</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Saved CO2</span>
                                    </div>

                                    <div className=" h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Recycle size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData?.wasteDumped?.length !== 0 ? user?.userData?.wasteDumped?.length : 40}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Recycled</span>
                                    </div>
                                </div>
                            </div> */}
                            <section className="ml-[10px]">
                                <h1 className="text-3xl font-bold">
                                    Revolutionize
                                    <br /> Garbage Detection with Drone Technology
                                </h1>
                                <p className="mt-4 w-[332px]" style={{ textJustify: "inter-word", color: "gray", lineHeight: "1.5" }}>
                                    Our Raspberry Pi-based application harnesses the power of drones to efficiently identify and track garbage
                                    <br /> in your community.
                                </p>
                            </section>
                            {/* <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[325px] h-[325px]">
                                <div className=" mx-auto  px-5 py-12 ml-10 mr-12">
                                    <IoTime className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">RealTime Monitoring</h1>
                                        <p className="mb-8 leading-relaxed">Our drones continuously scan your area, providing real-time data on garbage levels and locations.</p>
                                    </div>
                                </div>
                            </section> */}
                            {/* <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[325px] h-[325px]">
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    <IoAlertCircleSharp className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Automated Alerts</h1>
                                        <p className="mb-8 leading-relaxed">Get instant notifications when garbage levels reach critical thresholds, allowing you to optimize collection schedules.</p>
                                    </div>
                                </div>
                            </section> */}
                            {/* <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[350px] h-[450px]">
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    <GiNuclearWaste className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Waste Management Integration</h1>
                                        <p className="mb-8 leading-relaxed">Seamlessly integrate our system with your existing waste management services, streamlining operations and improving efficiency.</p>
                                    </div>
                                </div>
                            </section> */}
                            {/* <div className=" bg-black shadow-2xl p-6 shadow-black/30 rounded-lg w-full ">
                                <div className="flex items-center justify-between gap-4 p-4 text-white">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Landmark size={32} />
                                        </div>
                                        {/* {console.log(user?.userData.userpointsearned)} */}
                            {/* <span className=" font-semibold uppercase text-lg">{user?.userData.totalPointsEarned ? user?.userData.totalPointsEarned : 20}</span> */}
                            {/* <span className=" font-semibold uppercase text-lg">user points earned</span> */}
                            {/* <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Points</span>
                                    </div>

                                    <div className=" h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Cloud size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{calculateTotalCO2Saved()}G</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Saved CO2</span>
                                    </div>

                                    <div className=" h-16 w-[3px] bg-white/40"></div>

                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border-2 rounded-full p-1">
                                            <Recycle size={32} />
                                        </div>
                                        <span className=" font-semibold uppercase text-lg">{user?.userData?.wasteDumped?.length !== 0 ? user?.userData?.wasteDumped?.length : 40}</span>
                                        <span className="  uppercase text-xs opacity-70 font-semibold tracking-wider">Recycled</span>
                                    </div>
                                </div>
                            </div> */}
                            {/* //{" "}
                            <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[325px] h-[325px]">
                                //{" "}
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    // <SiGoogleanalytics className="text-black ml-[50px]" size={60} />
                                    // <br />
                                    //{" "}
                                    <div className="lg:w-2/3 w-full">
                                        // <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Advanced Analytics</h1>
                                        // <p className="mb-8 leading-relaxed">Leverage our powerful data analytics to gain insights, optimize collection routes, and reduce waste.</p>
                                        //{" "}
                                    </div>
                                    //{" "}
                                </div>
                                //{" "}
                            </section> */}
                            {/* <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[350px] h-[410px]">
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    <AiOutlineSolution className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Scalable Solution</h1>
                                        <p className="mb-8 leading-relaxed">Our modular system can be easily scaled to accommodate the needs of communities of all sizes, from small neighborhoods to large cities.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="text-gray-600 body-font border-2 border-black rounded-lg w-[350px] h-[420px]">
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    <GiRaspberry className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Raspberry Pi Integration</h1>
                                        <p className="mb-8 leading-relaxed">Leverage the power of Raspberry Pi to seamlessly integrate our drone-based system with your existing infrastructure.</p>
                                    </div>
                                </div>
                            </section> */}
                            {/* <section className="text-gray-600 body-font">
                                <div className="">
                                    <div className=" ">
                                        <h1 className="title-font sm:text-2xl text-2xl  mb-4 font-bold text-gray-900">Drone-based Garbage Detection</h1>
                                        <p className="mb-8 leading-relaxed">Our Raspberry Pi-based application uses drone technology to detect and classify garbage in real-time. Report issues and view live drone footage.</p>
                                        <div className="flex justify-center">
                                            <button className="inline-flex text-white bg-[#e10531] border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contact Us</button>
                                            <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">View life footage</button>
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                            <div className="bg-gray-300" style={{ width: "105%", margin: "-8px" }}>
                                <Link href="/location">
                                    <section className="text-black mt-5 ml-[30px] body-font border-2 border-[#0F1C3A] bg-[#0F1C3A] rounded-lg w-[300px] h-[270px]">
                                        <div className=" mx-auto  px-5 py-12 ml-12">
                                            <FaMapMarkerAlt className="text-white ml-[50px]" size={60} />
                                            <br />
                                            <div className="lg:w-2/3 w-full">
                                                <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-white">Map View</h1>
                                                <p className="mb-12 leading-relaxed text-white">Visualize the location of detected garbage sites on an interactive map.</p>
                                            </div>
                                        </div>
                                    </section>
                                </Link>
                                <Link href="/video">
                                    <section className="text-black mt-5 ml-[30px] mb-7  border-2 border-[#0F1C3A] bg-[#0F1C3A] body-font  rounded-lg w-[300px] h-[270px]">
                                        <div className=" mx-auto  px-5 py-12 ml-12">
                                            <FaVideo className="text-white ml-[50px]" size={60} />
                                            <br />
                                            <div className="lg:w-2/3 w-full">
                                                <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-white" style={{ whiteSpace: "nowrap" }}>
                                                    Live Streaming
                                                </h1>
                                                <p className="mb-12 leading-relaxed text-white">Monitor the drone's camera feed in real-time.</p>
                                            </div>
                                        </div>
                                    </section>
                                </Link>
                            </div>
                            <section className="text-black  ml-3 body-font border-2 border-white bg-white rounded-lg w-[325px] h-[270px]">
                                <div className=" mx-auto  px-5 py-12 mt-[-40px]">
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-bold text-gray-900">Intelligent Garbage Classification</h1>
                                        <p className=" mb-4" style={{ textJustify: "inter-word", color: "gray", lineHeight: "1.5" }}>
                                            Our application can accurately classify the detected garbage into different categories, providing valuable insights for efficient waste management.
                                        </p>
                                    </div>
                                    <div className="flex justify-center">
                                        <button style={{ width: "290px", height: "60px", whiteSpace: "nowrap", display: "flex", justifyContent: " center", alignItems: "center", padding: "5px" }} className="inline-flex font-bold text-white bg-[#0F1C3A]  py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                            <Link href="/dashboard">View Dashboard</Link>
                                        </button>
                                        {/* <button style={{ width: "140px", height: "60px", whiteSpace: "nowrap", display: "flex",marginRight:"10px", justifyContent: " center", alignItems: "center" }} className="ml-4 inline-flex text-black bg-white  border-2 border-black py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                            Learn More
                                        </button> */}
                                    </div>
                                </div>
                            </section>
                            <section className="mt-[70px] mb-[40px] text-black  ml-3 bg-gray-300 border-2 border-white  body-font border-2 border-black rounded-lg w-[325px] h-[270px]">
                                <div className=" mx-auto  px-5 py-12 ">
                                    {/* <FaVideo className="text-black ml-[50px]" size={60} /> */}
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-bold text-gray-900" style={{ whiteSpace: "nowrap" }}>
                                            Connect with Us
                                        </h1>
                                        <p className="mb-8 leading-relaxed" style={{ textJustify: "inter-word", color: "gray", lineHeight: "1.5" }}>
                                            Have questions, feedback, or concerns? We're here to help.
                                        </p>
                                    </div>
                                    <div className="flex justify-center ">
                                        <button style={{ width: "230px", height: "60px", whiteSpace: "nowrap", display: "flex", justifyContent: " center", alignItems: "center", padding: "5px" }} className="inline-flex text-white font-bold bg-[#0F1C3A] py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                            <Link href="/report">Contact Us</Link>
                                        </button>
                                        <button style={{ width: "180px", height: "60px", whiteSpace: "nowrap", display: "flex", marginRight: "10px", justifyContent: " center", alignItems: "center" }} className="ml-4 inline-flex font-bold text-black bg-white  border-2 border-black py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                                            <Link href="/report"> Report a Complaint</Link>
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <label htmlFor="message" className="text-white mt-12 text-lg text-semibold font-semibold">
                                Your Message
                            </label>
                            {/* <Report /> */}
                            {/* <section className="text-white bg-white body-font border-2 border-black rounded-lg w-[325px] h-[300px]">
                                <div className=" mx-auto  px-5 py-12 ml-12">
                                    <SiGoogleanalytics className="text-black ml-[50px]" size={60} />
                                    <br />
                                    <div className="lg:w-2/3 w-full">
                                        <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-gray-900">Detailed Statistics</h1>
                                        <p className="mb-8 leading-relaxed">Analyze comprehensive data on the garbage detection service.</p>
                                    </div>
                                </div>
                            </section> */}
                            {/* <div className="flex flex-col gap-3 ">
                                <div className="flex justify-between items-center">
                                    <h1 className=" font-semibold  opacity-90 text-green-900 text-2xl tracking-wide">Materials</h1>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div onClick={() => handleMaterialClick("Plastic")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
                                        <Image src={bottle} alt="bottle" height={200} className=" h-24 w-24" width={200} />
                                        <h1>Plastic</h1>
                                    </div>
                                    <div onClick={() => handleMaterialClick("Glass")} className="flex justify-center items-center flex-col  gap-2 shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
                                        <Image src={glass} alt="bottle" height={200} className=" h-24 w-24" width={200} />
                                        <h1>Glass</h1>
                                    </div>
                                    <div onClick={() => handleMaterialClick("Paper")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
                                        <Image src={paper} alt="bottle" height={200} className=" h-24 w-24" width={200} />
                                        <h1>Paper</h1>
                                    </div>
                                    <div onClick={() => handleMaterialClick("Metal")} className="flex justify-center items-center flex-col gap-2  shadow-lg rounded-xl p-3 border-2 border-black/10 shadow-black/10">
                                        <Image src={metal} alt="bottle" height={200} className=" h-24 w-24" width={200} />
                                        <h1>Metal</h1>
                                    </div>
                                </div>
                            </div> */}
                        </section>
                    ) : (
                        <h1 className=" text-3xl font-bold text-red-500 min-h-screen">Error loading user profile</h1>
                    )}
                </>
            )}
            <div className={`w-full min-h-screen bg-black/70 fixed top-0 left-0 right-0 z-50 ${openModal ? "scale-100" : "scale-0"} duration-200`}>
                <div className="flex justify-center items-center min-h-screen rounded-lg">
                    <div className=" bg-white rounded-xl w-[90%] h-72 shadow-lg shadow-white/10 overflow-y-scroll ">
                        <div className="flex justify-end items-end p-4">
                            <X size={40} onClick={() => setOpenModal(!openModal)} />
                        </div>
                        {selectedMaterial && (
                            <div className="p-4 flex flex-col gap-3">
                                <h2 className="text-2xl font-semibold">{selectedMaterial}</h2>
                                <p className="text-xl font-bold">
                                    <CircleCheck size={20} color="green" /> {materialData[selectedMaterial].merits}
                                </p>
                                <p className=" gap-3 items-center text-xl font-medium ">
                                    <div className=" text-xl font-bold">
                                        <CircleX color="red" size={20} /> {materialData[selectedMaterial].demerits}
                                    </div>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <Contact /> */}
        </section>
    );
};

export default Page;
