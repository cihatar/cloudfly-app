import { Skeleton } from "../ui/skeleton";

export default function DriveLoading() {
    return (
        <>
            <Skeleton className="w-24 h-4 mb-2 mt-8 rounded-full" />
            <div className="h-24 lg:h-14 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 mt-4">
                <Skeleton className="w-full h-full rounded-full" />
                <Skeleton className="w-full h-full rounded-full" />
                <Skeleton className="w-full h-full rounded-full" />
                <Skeleton className="w-full h-full rounded-full" />
            </div>
            <Skeleton className="w-24 h-4 mb-2 mt-8 rounded-full" />
            <div className="h-80 lg:h-48 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 mt-4">
                <Skeleton className="w-full h-full rounded-md" />
                <Skeleton className="w-full h-full rounded-md" />
                <Skeleton className="w-full h-full rounded-md" />
                <Skeleton className="w-full h-full rounded-md" />
            </div>
        </>
    );
}
