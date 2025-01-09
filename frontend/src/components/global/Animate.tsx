import React from "react";
import { motion, MotionProps } from "framer-motion";

interface AnimateProps extends Omit<React.HTMLProps<HTMLDivElement>, keyof MotionProps> {
    children: React.ReactNode;
}

export default function Animate({ children, ...props }: AnimateProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: .99 }}
            transition={{ duration: 0.3, ease: "circInOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
