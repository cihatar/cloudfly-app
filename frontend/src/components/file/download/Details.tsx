import { getFileDetailsPublic } from '@/api/api';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import DownloadFile from './DownloadFile';

export default function Details() {
    const { key } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["file-details", key],
        queryFn: () => getFileDetailsPublic(key || ''),
    });    

    return (
        <>
            
            {
                isLoading ?
                <>
                    <div className='flex items-center gap-2 mb-4 p-2'>
                        <Skeleton className='w-8 h-8' />
                        <div>
                            <Skeleton className='w-32 h-2 mb-1' />
                            <Skeleton className='w-16 h-2' />
                        </div>
                    </div>
                    <div className='p-2'>
                        <Skeleton className='w-16 h-2' />
                    </div>
                    <Skeleton className='w-full h-20' />
                    <Skeleton className='w-full h-10 mt-4' />
                </>
                :
                <>
                    <div className="flex items-center gap-2 mb-4 p-2 border rounded-md">
                        <img src={data.owner.profileImage} alt={data.owner.firstName} className="rounded-md w-8 h-8"/>
                        <div className="text-start">
                            <p className="font-semibold text-sm">
                                {data.owner.firstName} {data.owner.lastName}
                            </p>
                            <p className="text-zinc-500 text-xs">
                                Owner
                            </p>
                        </div>
                    </div>
                    <p className="font-bold text-xs text-muted-foreground p-2">
                        Details
                    </p>
                    <ul className="flex flex-col items-start space-y-2 text-muted-foreground text-sm bg-zinc-200 dark:bg-zinc-800 rounded-md p-2">
                        <li>
                            <p>
                                File name: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{data.originalName}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Size: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{data.size}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Type: <span className="text-zinc-800 dark:text-zinc-200 font-semibold uppercase">{data.type}</span>
                            </p>
                        </li>
                    </ul>
                   <DownloadFile originalName={data.originalName} />
                </>
            }
           
        </>
    )
}
