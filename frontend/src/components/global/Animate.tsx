import React from "react";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function Animate({ children, className }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "circOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
