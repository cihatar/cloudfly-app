import Animate from "@/components/global/Animate";
import goingUp from "@/assets/going_up.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Subtitle, Title } from "@/components/global/Titles";
import { getFilesAndFolders } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import File from "@/components/drive/File";
import Folder from "@/components/drive/Folder";
import DriveLoading from "@/components/drive/DriveLoading";
import CreateFolder from "@/components/drive/CreateFolder";
import { ChevronLeft } from "lucide-react";
import UploadFile from "@/components/drive/UploadFile";

export interface FileProps {
    _id: string; 
    parent: string; 
    originalName: string; 
    mimeType: string;
    type: string; 
    isStarred: boolean;
}

export interface FolderProps {
    _id: string; 
    parent: string; 
    name: string; 
    isStarred: boolean;
}

export default function Drive() {
    const [parent, setParent] = useState<string>("root");
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [folderStack, setFolderStack] = useState<{_id: string, name: string}[]>([{ _id: parent, name: "My Drive"}]);

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

            {/* title & buttons*/}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center justify-start gap-2">
                    {
                        folderStack[folderStack.length - 1].name !== "My Drive" && 
                        <Button type="button" variant={"ghost"} className="rounded-full p-0 h-8 w-8" onClick={handleGoBack}>
                            <ChevronLeft />
                        </Button>
                    }
                    <Title title={folderStack[folderStack.length - 1].name} />
                </div>
                <div className="flex gap-2">
                    <UploadFile  parent={parent} fileNames={fileNames} />
                    <CreateFolder parent={parent} />
                </div>
            </div>

            {
                isLoading ? <DriveLoading /> : 
                !data.files && !data.folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-36 select-none pointer-events-none">
                    <img src={goingUp} alt="Upload file" className="w-48 lg:w-72"/>
                    <p className="text-blackdefault/75 text-sm">
                        It looks like the space is empty. 
                        <br /> 
                        <span className="font-semibold">Please upload a file or create a folder to add content</span>
                    </p>
                </div> :
                <> 
                {
                    data.folders && <>
                        <Subtitle title="Folders" className="mt-8 text-sm text-blackdefault/75"/>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
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
                        <Subtitle title="Files" className="mt-8 text-sm text-blackdefault/75"/>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-xs">
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
