"use client";
import React, { useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { FaLocationDot } from "react-icons/fa6";
import { MailPlus } from "lucide-react";
import { MdDelete, MdPerson, MdEmail, MdPhone, MdMessage } from "react-icons/md";
import Image from "next/image";
import Toast from "@/utils/toast";

const Contact = () => {
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            // Uncomment the line below and replace placeholders with actual values
            // await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current!);
            Toast.SuccessshowToast("Message Sent Successfully");
            setMessage("");
            form.current!.reset();
        } catch (error) {
            setLoading(false);
            Toast.ErrorShowToast("An error occurred, Please try again");
            console.error("An error occurred:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleDeleteClick = () => {
        setMessage("");
        form.current?.reset();
    };

    return (
        <>
            <Image src="/signupbg.jpeg" alt="Background" width={300} height={300} style={{ width: "100%", marginTop: "-20px" }} />
            <form autoComplete="off" ref={form} onSubmit={sendEmail} className="min-h-[58vh] flex flex-col gap-3 mb-44 m-4 p-4">
                <div className="flex flex-col mt-[-691px]">
                    <h1 className="mt-12 text-center font-bold opacity-90 text-black text-2xl tracking-wide" style={{ fontSize: "24px", whiteSpace: "nowrap" }}>
                        Report New Garbage
                    </h1>
                    <MdDelete className="mt-6 border-2 border-t-white rounded-full ml-32 cursor-pointer p-2" size={65} onClick={handleDeleteClick} />
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-[#0F1C3A] mt-5 text-lg font-semibold">
                            Name
                        </label>
                        <div className="relative">
                            <input id="name" type="text" placeholder="Enter your name" required name="from_name" className="border-2 border-black/40 p-3 mt-1 rounded-lg w-full pr-10 focus:outline-none focus:border-[#0F1C3A]" />
                            <MdPerson size={30} className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <label htmlFor="email" className="text-[#0F1C3A] mt-5 text-lg font-semibold">
                            Email
                        </label>
                        <div className="relative">
                            <input id="email" type="email" placeholder="Enter your email" required name="from_email" className="border-2 border-black/40 p-3 mt-1 rounded-lg w-full pr-10 focus:outline-none focus:border-[#0F1C3A]" />
                            <MdEmail size={30} className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <label htmlFor="phone" className="text-[#0F1C3A] mt-5 text-lg font-semibold">
                            Phone
                        </label>
                        <div className="relative">
                            <input id="phone" type="number" placeholder="Enter your phone" required name="phone" className="border-2 border-black/40 p-3 mt-1 rounded-lg w-full pr-10 focus:outline-none focus:border-[#0F1C3A]" />
                            <MdPhone size={30} className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <label htmlFor="location" className="text-[#0F1C3A] mt-5 text-lg font-semibold">
                            Location
                        </label>
                        <div className="relative">
                            <input id="location" type="text" placeholder="Enter your location" required name="from_location" className="border-2 border-black/40 p-3 mt-1 rounded-lg w-full pr-10 focus:outline-none focus:border-[#0F1C3A]" />
                            <FaLocationDot size={30} className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        <label htmlFor="message" className="text-black mt-5 text-lg font-semibold">
                            Your Message
                        </label>
                        <div className="relative">
                            <textarea id="message" placeholder="Enter Your Message" className="h-64 mb-5 border-black/40 mt-2 p-4 rounded-lg w-full flex-auto border-2 pr-10 focus:outline-none focus:border-[#0F1C3A]" required name="message" value={message} onChange={handleMessageChange}></textarea>
                            <MdMessage size={35} className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                        </div>

                        {loading ? (
                            <button className="flex justify-center items-center bg-[#868182] text-white gap-3 p-4" disabled>
                                <ScaleLoader color="#fff" className="scale-50" /> Processing.....
                            </button>
                        ) : (
                            <button className="flex justify-center items-center gap-3 bg-[#0F1C3A] text-white rounded-lg p-4 ml-[25px] w-[245px]">
                                <MailPlus />
                                Send
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </>
    );
};

export default Contact;
