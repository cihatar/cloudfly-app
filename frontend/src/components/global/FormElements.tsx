import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface InputProps {
    label?: string;
    className?: string;
    type?: string;
    placeholder?: string;
    id?: string;
    name?: string;
    defaultValue?: string;
    disabled?: boolean;
    ref?: React.Ref<HTMLInputElement>;
}

export const InputField = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, placeholder, id, name, defaultValue, disabled }, ref) => {
    return (
        <Input
            className={cn(`focus-visible:ring-offset-0 ${className}`)}
            type={type}
            placeholder={placeholder}
            required
            id={id}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            ref={ref} 
        />
    );
});

export const InputWithLabel = React.forwardRef<HTMLInputElement, InputProps>(({ label, className, type, placeholder, id, name, defaultValue, disabled }, ref) => {
    return (
        <>
            <Label htmlFor={id} className="text-gray-700 text-xs">
                {label}
            </Label>
            <Input
                className={cn(`focus-visible:ring-offset-0 ${className}`)}
                type={type}
                placeholder={placeholder}
                required
                id={id}
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                ref={ref}
            />
        </>
        
    );
});

interface ButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
    loading?: boolean;
    text?: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    ref?: React.Ref<HTMLButtonElement>;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, onClick, type = "submit", disabled, loading = disabled, text, variant }, ref) => {
    return (
        <Button 
            className={cn(`${className}`)} 
            onClick={onClick} type={type} 
            disabled={disabled} 
            variant={variant} 
            ref={ref}
        >
            {(loading) ? (<><Loader2 className="animate-spin" />Please wait</>) : (text)}
        </Button>
    )
});
