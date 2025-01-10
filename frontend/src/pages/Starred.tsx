import Animate from '@/components/global/Animate'
import { useState } from 'react';
import folderIcon from "@/assets/folder_icon.svg";
import { Subtitle, Title } from '@/components/global/Titles'
import { Separator } from '@/components/ui/separator'
import { ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFilesAndFolders, getStarredFilesAndFolders } from '@/api/api';
import { getColor } from '@/utils/color';
import { FileProps, FolderProps } from './Drive';
import { CustomButton } from '@/components/global/FormElements';
import DriveLoading from '@/components/drive/DriveLoading';

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
                !data.files && !data.folders ? <></> : <> 
                {
                    data.folders && <>
                        <Subtitle className="mt-8 text-sm text-zinc-800 dark:text-zinc-200">Folders</Subtitle>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
                            {
                                data.folders.map((folder: FolderProps) => (
                                    <div key={folder._id} onDoubleClick={() => handleDoubleClick(folder)}>
                                        <div className="flex justify-between items-center dark:bg-zinc-900 dark:hover:bg-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-md p-2 group relative">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <img src={folderIcon} className="w-8 md:w-10 select-none pointer-events-none" />
                                                <p>{folder.name}</p>
                                        </div>
                                    </div>
                                </div>
                                ))
                            }
                        </div>
                    </>
                }
                {
                    data.files && <>
                        <Subtitle className="mt-8 text-sm text-zinc-800 dark:text-zinc-200">Files</Subtitle>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-xs">
                            {
                                data.files.map((file: FileProps) => (
                                    <div key={file._id} className="w-full h-48 flex flex-col items-start border rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 group overflow-hidden relative">
                                        <div className={`flex items-center justify-center w-full h-full ${getColor(file.mimeType)} font-semibold text-xl text-white uppercase rounded-md mb-2 select-none pointer-events-none`}>
                                            mp3
                                        </div>
                                        <p>{file.originalName}</p>
                                        <p className="text-zinc-500">{file.type}</p>
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
