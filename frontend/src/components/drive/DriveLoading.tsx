import { Skeleton } from "../ui/skeleton";

export default function DriveLoading() {
    return (
        <>
            <Skeleton className="w-[200px] h-4 mb-2 mt-8 rounded-full" />
            <Skeleton className="h-4 mb-4 rounded-full" />
            <div className="h-16 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
            <Skeleton className="w-[200px] h-4 mb-2 mt-8 rounded-full" />
            <Skeleton className="h-4 mb-4 rounded-full" />
            <div className="h-48 grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
                <Skeleton className="w-full h-full rounded-xl" />
            </div>
        </>
    );
}
