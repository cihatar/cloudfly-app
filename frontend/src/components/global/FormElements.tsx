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
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    text?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, disabled, loading = disabled, text, variant, ...props }, ref) => {
    return (
        <Button 
            className={cn(`${className}`)} 
            disabled={disabled} 
            variant={variant} 
            ref={ref}
            {...props}
        >
            {(loading) ? (<><Loader2 className="animate-spin" />Please wait</>) : (text)}
        </Button>
    )
});
