import { cn } from "@/lib/utils";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    subtitle?: string;
    className?: string;
}

export const Title = ({ children, subtitle, className, ...props }: TitleProps) => {
    return (
        <>
            <h1 className={cn(`text-2xl font-bold ${subtitle && "mb-1"} ${className}`)} {...props}>{children}</h1>
            {subtitle && (
                <p className="dark:text-zinc-200 text-zinc-800 text-xs">{subtitle}</p>
            )}
        </>
    );
}

export const Subtitle = ({ children, subtitle, className, ...props }: TitleProps) => {
    return (
        <>
            <h2 className={cn(`text-lg font-semibold ${subtitle ? "mb-1" : "mb-4"} ${className}`)} {...props}>{children}</h2>
            {subtitle && (
                <p className="dark:text-zinc-200 text-zinc-800 text-xs mb-4">{subtitle}</p>
            )}
        </>
    );
}