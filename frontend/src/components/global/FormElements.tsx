import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    id?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <Input
            className={cn(`focus-visible:ring-offset-0 text-black dark:text-white ${className}`)}
            required
            ref={ref} 
            {...props}
        />
    );
});

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, id, ...props }, ref) => {
    return (
        <>
            <Label htmlFor={id} className="text-xs">
                {label}
            </Label>
            <Input
                className={cn(`focus-visible:ring-offset-0 text-black dark:text-white ${className}`)}
                required
                id={id}
                ref={ref}
                {...props}
            />
        </>
        
    );
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    className?: string;
    loading?: boolean;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null;
    asChild?: boolean;
    effect?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, loading, variant, size, asChild = false, effect = true, onClick, ...props }, ref) => {
    const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('absolute', 'bg-white/50', 'dark:bg-black/50', 'rounded-full', 'animate-ripple');
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.pointerEvents = 'none'; 

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600); 
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (effect) rippleEffect(e);
        if (onClick) onClick(e);
    };

    return (
        <Button 
            className={cn(`relative overflow-hidden ${className}`)} 
            disabled={loading} 
            variant={variant} 
            size={size}
            ref={ref}
            onClick={handleClick}
            asChild={asChild}
            {...props}
        >
            {(loading) ? (<><Loader2 className="animate-spin" />Please wait</>) : (children)}
        </Button>
    )
});
