import Animate from "@/components/global/Animate";
import { CustomButton } from "@/components/global/FormElements";
import { Title } from "@radix-ui/react-toast";
import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <div className="min-h-screendefault flex items-center justify-center relative overflow-hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                preserveAspectRatio="none"
                viewBox="0 0 1440 560"
                className="absolute bottom-0"
            >
                <g mask='url("#SvgjsMask1002")' fill="none">
                    <rect
                        width="1440"
                        height="560"
                        x="0"
                        y="0"
                        className="dark:fill-blackdefault fill-whitedefault"
                    ></rect>
                    <path
                        d="M1512 560L0 560 L0 318.1Q58.8 256.9, 120 315.7Q205.75 281.45, 240 367.2Q261.78 268.98, 360 290.75Q431.82 242.57, 480 314.39Q549.44 263.83, 600 333.28Q611.87 273.15, 672 285.02Q714.53 255.55, 744 298.09Q809.2 291.29, 816 356.5Q857 277.5, 936 318.49Q964.08 274.57, 1008 302.65Q1086.01 260.66, 1128 338.68Q1196.46 287.14, 1248 355.6Q1280.66 268.26, 1368 300.93Q1409.48 270.41, 1440 311.89Q1497.59 297.48, 1512 355.07z"
                        className="dark:fill-[#182f5d] fill-[#e9e9e9]"
                    ></path>
                    <path
                        d="M1464 560L0 560 L0 404.05Q11.46 343.51, 72 354.98Q115.88 326.87, 144 370.75Q214.74 321.49, 264 392.22Q318.01 374.23, 336 428.24Q380.81 401.06, 408 445.87Q414.85 380.72, 480 387.57Q530.02 317.6, 600 367.62Q691.33 338.94, 720 430.27Q743 333.27, 840 356.27Q885.56 329.83, 912 375.39Q979.18 370.57, 984 437.76Q1003.17 384.94, 1056 404.11Q1084.86 360.97, 1128 389.82Q1180.06 369.88, 1200 421.93Q1224.3 326.23, 1320 350.52Q1362.58 321.1, 1392 363.68Q1445.01 344.69, 1464 397.7z"
                        className="dark:fill-[#25467d] fill-[#c5ceda]"
                    ></path>
                    <path
                        d="M1488 560L0 560 L0 506.64Q38.93 473.56, 72 512.49Q83.07 451.56, 144 462.63Q174.86 421.49, 216 452.34Q263.63 379.96, 336 427.59Q391.56 411.15, 408 466.71Q469.09 455.8, 480 516.89Q508.11 473, 552 501.11Q600.13 429.25, 672 477.38Q714.89 400.27, 792 443.16Q821.38 400.54, 864 429.91Q919.82 413.74, 936 469.56Q985.86 447.42, 1008 497.28Q1040.32 409.6, 1128 441.91Q1157.56 399.47, 1200 429.02Q1249.79 406.8, 1272 456.59Q1336.34 448.92, 1344 513.26Q1345.09 442.35, 1416 443.44Q1445.94 401.38, 1488 431.33z"
                        className="dark:fill-[#356cb1] fill-[#839fc2]"
                    ></path>
                </g>
                <defs>
                    <mask id="SvgjsMask1002">
                        <rect width="1440" height="560" fill="#ffffff"></rect>
                    </mask>
                </defs>
            </svg>
            <Animate className="w-96 flex flex-col items-center justify-center z-10">
                <Title className="text-9xl font-bold">404</Title>
                <p className="text-center text-sm mb-6">
                    The page you are trying to access doesn&#39;t exist
                </p>
                <CustomButton
                    asChild
                    className="h-12 w-40 rounded-full"
                >
                    <Link to="/drive">Return drive</Link>
                </CustomButton>
            </Animate>
        </div>
    );
}
