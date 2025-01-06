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
            className={cn(`focus-visible:ring-offset-0 ${className}`)}
            required
            ref={ref} 
            {...props}
        />
    );
});

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, id, ...props }, ref) => {
    return (
        <>
            <Label htmlFor={id} className="text-gray-700 text-xs">
                {label}
            </Label>
            <Input
                className={cn(`focus-visible:ring-offset-0 ${className}`)}
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
    asChild?: boolean;
    effect?: boolean;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, loading, variant, asChild = false, effect = true, ...props }, ref) => {
    const rippleEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!effect) return;
        const button = e.target as HTMLButtonElement;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('absolute', 'bg-whitedefault/75', 'rounded-full', 'animate-ripple');
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.pointerEvents = 'none'; 

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600); 
    };

    return (
        <Button 
            className={cn(`relative overflow-hidden ${className}`)} 
            disabled={loading} 
            variant={variant} 
            ref={ref}
            onClick={rippleEffect}
            asChild={asChild}
            {...props}
        >
            {(loading) ? (<><Loader2 className="animate-spin" />Please wait</>) : (children)}
        </Button>
    )
});
