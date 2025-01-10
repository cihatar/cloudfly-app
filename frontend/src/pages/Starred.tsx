import Animate from '@/components/global/Animate'
import stars from "@/assets/stars.svg";
import { useState } from 'react';
import { Subtitle, Title } from '@/components/global/Titles'
import { ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFilesAndFolders, getStarredFilesAndFolders } from '@/api/api';
import { FileProps, FolderProps } from './Drive';
import { CustomButton } from '@/components/global/FormElements';
import DriveLoading from '@/components/drive/DriveLoading';
import File from '@/components/drive/File';
import Folder from '@/components/drive/Folder';

export default function Starred() {
    const [parent, setParent] = useState<string>("root");
    const [folderStack, setFolderStack] = useState<{_id: string, name: string}[]>([{ _id: parent, name: "Starred"}]);

    const { data, isLoading } = useQuery({
        queryKey: ["starred", parent],
        queryFn: () => parent === "root" ? getStarredFilesAndFolders(parent) : getFilesAndFolders(parent),
        staleTime: 2 * 60 * 1000,
    });

    // handle folder double click
    const handleDoubleClick = (folder: FolderProps) => {
        setFolderStack([...folderStack, { _id: folder._id, name: folder.name }]);
        setParent(folder._id);
    }

    // handle go back
    const handleGoBack = () => {
        const currentFolderId = folderStack[folderStack.length - 1]._id;
        const prevFolderId = folderStack[folderStack.length - 2]._id || 'root';
        setFolderStack((stack) => stack.filter((s) => s._id !== currentFolderId));
        setParent(prevFolderId);
    }

    return (
        <Animate>
            {/* title & button */}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center justify-start gap-2">
                    {
                        folderStack[folderStack.length - 1].name !== "Starred" && 
                        <CustomButton onClick={handleGoBack} type="button" variant="ghost" effect={false} className="rounded-full p-0 h-8 w-8" >
                            <ChevronLeft />
                        </CustomButton>
                    }
                    <Title>{folderStack[folderStack.length - 1].name}</Title>
                </div>
            </div>

            {
                isLoading ? <DriveLoading /> : 
                !data.files && !data.folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-36 select-none pointer-events-none">
                    <img src={stars} alt="Upload file" className="w-48 lg:w-72"/>
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                        No files or folders found. 
                        <br /> 
                        <span className="font-semibold">You can star a file or folder to easily access it later</span>
                    </p>
                </div> : 
                <> 
                {
                    data.folders && <>
                        <Subtitle className="mt-8 text-xs text-zinc-800 dark:text-zinc-200">Folders</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 text-xs">
                            {
                                data.folders.map((folder: FolderProps) => (
                                    <div key={folder._id} onDoubleClick={() => handleDoubleClick(folder)}>
                                        <Folder 
                                            _id={folder._id} 
                                            parent={folder.parent} 
                                            name={folder.name}
                                            isStarred={folder.isStarred}
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
                                    <File 
                                        key={file._id} 
                                        _id={file._id} 
                                        parent={file.parent} 
                                        originalName={file.originalName} 
                                        mimeType={file.mimeType}
                                        type={file.type} 
                                        isStarred={file.isStarred}
                                        publicKey={file.publicKey}
                                    />
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
