import { cn } from "@/lib/utils";

interface TitleProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
    return (
        <>
            <h1 className={cn(`text-3xl font-bold ${subtitle && "mb-1"} ${className}`)}>{title}</h1>
            {subtitle && (
                <p className="text-blackdefault/75 text-xs">{subtitle}</p>
            )}
        </>
    );
}

export const Subtitle = ({ title, subtitle, className }: TitleProps) => {
    return (
        <>
            <h2 className={cn(`text-xl font-semibold ${subtitle ? "mb-1" : "mb-4"} ${className}`)}>{title}</h2>
            {subtitle && (
                <p className="text-blackdefault/75 text-xs mb-4">{subtitle}</p>
            )}
        </>
    );
}