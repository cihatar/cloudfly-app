import Animate from "@/components/global/Animate";
import logo from "@/assets/my_files.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [index, setIndex] = useState(0);

    const words = ["storage", "sharing"];

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[calc(100vh-48px)] flex flex-col items-center justify-center overflow-hidden relative bg-blackdefault text-whitedefault">
            <Animate className="flex-1 w-[1200px] flex flex-col lg:flex-row items-center justify-center gap-8 px-12">
                <img
                    src={logo}
                    alt="My Files"
                    width={500}
                    className="w-72 lg:w-[500px]"
                />
                <div className="flex flex-col items-center text-center justify-center gap-y-8">
                    <h2 className="font-semibold text-4xl lg:text-5xl">
                        <span className="text-bluedefault text-4xl lg:text-6xl">
                            Cloud-based
                        </span>
                        <br /> file{" "}
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={words[index]}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.2, ease: "circOut" }}
                                className="inline-block"
                            >
                                {words[index]}
                            </motion.p>
                        </AnimatePresence>
                        <br /> application
                    </h2>
                    <Button
                        asChild
                        className="h-12 w-40 rounded-full"
                        variant="secondary"
                    >
                        <Link to="/auth/login">Login/Register</Link>
                    </Button>
                </div>
            </Animate>

            {/* github */}
            <Link
                to="https://github.com/cihatar/cloudfly-app"
                target="_blank"
                className="self-end p-4"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0 0 30 30"
                    className="fill-whitedefault"
                >
                    <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                </svg>
            </Link>
        </div>
    );
}
