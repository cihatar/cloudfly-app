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
    const [folderStack, setFolderStack] = useState<{_id: string, name: string}[]>([{ _id: parent, name: "My Drive"}]);
    const [files, setFiles] = useState<FileProps[] | null>(null);
    const [folders, setFolders] = useState<FolderProps[] | null>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["drive", parent],
        queryFn: () => getFilesAndFolders(parent),
        staleTime: 2 * 60 * 1000,
    });
    
    useEffect(() => {
        if (data) {
            setFiles(data.files);
            setFolders(data.folders);
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
                    <Button className="rounded bg-bluedefault hover:bg-bluedefault/95 w-24 h-8 text-xs lg:w-32 lg:h-10 lg:text-sm shadow-md" variant="default">Upload File</Button>
                    <CreateFolder parent={parent}/>
                </div>
            </div>

            {
                isLoading ? <DriveLoading /> : 
                !files && !folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-36">
                    <img src={goingUp} alt="Upload file" className="w-48 lg:w-72"/>
                    <p className="text-blackdefault/75 text-sm">
                        It looks like the space is empty. 
                        <br /> 
                        <span className="font-semibold">Please upload a file or create a folder to add content</span>
                    </p>
                </div> :
                <> 
                {
                    folders && <>
                        <Subtitle title="Folders" className="mt-8 text-sm text-blackdefault/75"/>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
                            {
                                folders.map((folder) => (
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
                    files && <>
                        <Subtitle title="Files" className="mt-8 text-sm text-blackdefault/75"/>
                        <Separator className="mb-4" />
                        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-xs">
                            {
                                files.map(({ _id, parent, originalName, mimeType, type, isStarred }) => (
                                    <File 
                                        key={_id} 
                                        _id={_id} 
                                        parent={parent} 
                                        originalName={originalName} 
                                        mimeType={mimeType}
                                        type={type} 
                                        isStarred={isStarred}
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
