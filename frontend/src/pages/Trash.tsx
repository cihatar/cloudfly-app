import Animate from '@/components/global/Animate'
import throwAway from "@/assets/throw_away.svg";
import { getTrashedFilesAndFolders } from '@/api/api';
import File from '@/components/drive/File';
import { Subtitle, Title } from '@/components/global/Titles'
import { useQuery } from '@tanstack/react-query';
import { FileProps, FolderProps } from './Drive';
import Folder from '@/components/drive/Folder';
import DriveLoading from '@/components/drive/DriveLoading';

export default function Trash() {
    const { data, isLoading } = useQuery({
        queryKey: ["trash"],
        queryFn: () => getTrashedFilesAndFolders(),
        staleTime: 2 * 60 * 1000,
    });
    
    return (
        <Animate>
            {/* title */}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center justify-start gap-2">
                    <Title>Trash</Title>
                </div>
            </div>

            {
                isLoading ? <DriveLoading /> : 
                !data.files && !data.folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-36 select-none pointer-events-none">
                    <img src={throwAway} alt="Trash" className="w-48 lg:w-72"/>
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                        Nothing to see here, your trash is clean.
                    </p>
                </div> : 
                <> 
                {
                    data.folders && <>
                        <Subtitle className="mt-8 text-xs text-zinc-800 dark:text-zinc-200">Folders</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 text-xs">
                            {
                                data.folders.map((folder: FolderProps) => (
                                    <div key={folder._id}>
                                        <Folder 
                                            _id={folder._id} 
                                            parent={folder.parent} 
                                            name={folder.name}
                                            isStarred={folder.isStarred}
                                            isDeleted={folder.isDeleted}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
                {
                    data.files && <>
                        <Subtitle className="mt-8 text-xs text-zinc-800 dark:text-zinc-200">Files</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs">
                            {
                                data.files.map((file: FileProps) => (
                                    <div key={file._id}>
                                        <File 
                                            _id={file._id} 
                                            parent={file.parent} 
                                            originalName={file.originalName} 
                                            mimeType={file.mimeType}
                                            type={file.type} 
                                            isStarred={file.isStarred}
                                            isDeleted={file.isDeleted}
                                            publicKey={file.publicKey}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </>
                }
                </>
            }

        </Animate>
    )
}
