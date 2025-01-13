import Animate from "@/components/global/Animate";
import goingUp from "@/assets/going_up.svg";
import { Subtitle, Title } from "@/components/global/Titles";
import { getFilesAndFolders } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { DragEvent, useEffect, useState } from "react";
import File from "@/components/drive/File";
import Folder from "@/components/drive/Folder";
import DriveLoading from "@/components/drive/DriveLoading";
import CreateFolder from "@/components/drive/CreateFolder";
import { ChevronLeft, HardDriveUpload } from "lucide-react";
import UploadFile from "@/components/drive/UploadFile";
import { CustomButton } from "@/components/global/FormElements";

export interface FileProps {
    _id: string; 
    parent: string; 
    originalName: string; 
    mimeType: string;
    type: string; 
    isStarred: boolean;
    isDeleted: boolean;
    publicKey: string | null;
}

export interface FolderProps {
    _id: string; 
    parent: string; 
    name: string; 
    isStarred: boolean;
    isDeleted: boolean;
}

export default function Drive() {
    const [parent, setParent] = useState<string>("root");
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [folderStack, setFolderStack] = useState<{_id: string, name: string}[]>([{ _id: parent, name: "My Drive"}]);
    const [droppedFiles, setDroppedFiles] = useState<FileList | null>(null);
    const [dragging, setDragging] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["drive", parent],
        queryFn: () => getFilesAndFolders(parent),
        staleTime: 2 * 60 * 1000,
    });

    useEffect(() => {
        setFileNames([]);
        if (data && data.files !== null) {
            const newFileNames = data.files.map((file: FileProps) => file.originalName);
            setFileNames(newFileNames);
        }
    }, [data]);

    // handle change directory 
    const handleChangeDirectory = (folder: FolderProps) => {
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

    // handle drop files
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDroppedFiles(null);
        setDragging(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setDroppedFiles(droppedFiles);
        }
    };    

    return (
        // drag and drop
        <Animate 
            className="h-full relative"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={() => setDragging(true)}
            onDragLeave={(e) => {
                const relatedTarget = e.relatedTarget as Node | null;
                if (e.relatedTarget && e.currentTarget.contains(relatedTarget)) return;
                setDragging(false);
            }}
            onDragExit={() => setDragging(false)}
            onDrop={handleDrop}
        > 
            <div
            className={`transition-all shadow-md flex items-center justify-center gap-2 p-4 text-xs text-white bg-bluedefault rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 z-[1000] 
                ${dragging ? `visible opacity-1 -translate-y-10` : `invisible opacity-0`} `}
            >
                <HardDriveUpload className="scale-75" /> Drop files to upload
            </div>

            {/* title & buttons*/}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center justify-start gap-2">
                    {
                        folderStack[folderStack.length - 1].name !== "My Drive" && 
                        <CustomButton onClick={handleGoBack} type="button" variant="ghost" effect={false} className="rounded-full p-0 h-8 w-8" >
                            <ChevronLeft />
                        </CustomButton>
                    }
                    <Title>{folderStack[folderStack.length - 1].name}</Title>
                </div>
                <div className="flex gap-2">
                    <UploadFile  parent={parent} fileNames={fileNames} isLoading={isLoading} droppedFiles={droppedFiles} />
                    <CreateFolder parent={parent} isLoading={isLoading} />
                </div>
            </div>
                    
            {
                isLoading ? <DriveLoading /> : 
                !data.files && !data.folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-36 select-none pointer-events-none">
                    <img src={goingUp} alt="Upload file" className="w-48 lg:w-72"/>
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                        It looks like the space is empty. 
                        <br /> 
                        <span className="font-semibold">Please upload a file or create a folder to add content</span>
                    </p>
                </div> :
                <> 
                {
                    data.folders && <>
                        <Subtitle className="mt-8 text-xs text-zinc-800 dark:text-zinc-200">Folders</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-2 text-xs">
                            {
                                data.folders.map((folder: FolderProps) => (
                                    <Folder 
                                        key={folder._id}
                                        folder={folder}
                                        handleChangeDirectory={handleChangeDirectory}
                                    />
                                ))
                            }
                        </div>
                    </>
                }
                {
                    data.files && <>
                        <Subtitle className="mt-8 text-xs text-zinc-800 dark:text-zinc-200">Files</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs transition-all duration-300">
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
                                        isDeleted={file.isDeleted}
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
