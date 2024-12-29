import Animate from "@/components/global/Animate";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Subtitle, Title } from "@/components/global/Titles";
import { getFilesAndFolders } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import File from "@/components/drive/File";
import Folder from "@/components/drive/Folder";
import DriveLoading from "@/components/drive/DriveLoading";

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
  
  return (
    <Animate>

        {/* title & buttons*/}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
            <Title title="My Drive" />
            <div className="flex gap-2">
                <Button className="rounded bg-bluedefault hover:bg-bluedefault/95 w-24 h-8 text-xs lg:w-32 lg:h-10 lg:text-sm shadow-md" variant="default">Upload File</Button>
                <Button className="rounded border w-24 h-8 text-xs
                lg:w-32 lg:h-10 lg:text-sm shadow-md" variant="outline">Create Folder</Button>
            </div>
        </div>

        {
            isLoading ? <DriveLoading /> : 
            <> 
            {
                folders && <>
                    <Subtitle title="Folders" className="mt-8 text-sm text-blackdefault/75"/>
                    <Separator className="mb-4" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">
                        {
                            folders.map(({ _id, parent, name, isStarred }) => (
                                <Folder 
                                    key={_id} 
                                    _id={_id} 
                                    parent={parent} 
                                    name={name}
                                    isStarred={isStarred}
                                />
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
