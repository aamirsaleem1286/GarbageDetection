// src/app/welcome/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WelcomePage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem("welcomeShown", "true");
            router.push("/login");
        }, 2000); // Duration of the animation in milliseconds

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="get-started text-center">
            <div className="image-container">
                <Image className="sliding-image w-full h-[700px]" src="/droneimg.jpeg" alt="DroneGarbage" width={250} height={700} style={{ objectFit: "fill" }} />
            </div>
        </div>
    );
};

export default WelcomePage;
