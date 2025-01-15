import Animate from "@/components/global/Animate";
import upload_files from "@/assets/upload_files.svg";
import { getLatestFiles } from "@/api/api";
import File from "@/components/drive/File";
import { InputField } from "@/components/global/FormElements";
import { Subtitle, Title } from "@/components/global/Titles";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { FileProps } from "./Drive";
import { QuickAccessPageLoading } from "@/components/global/Loading";

export default function QuickAccess() {
    const { data, isLoading } = useQuery({
        queryKey: ["quick-access"],
        queryFn: () => getLatestFiles(),
    });
    
    return (
        <>
        <Animate>

            {/* title & search */}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 justify-between">
                <Title className="whitespace-nowrap">Quick Access</Title>
                {
                    !data?.lastUploadedFiles && !data?.lastUpdatedFiles ? <></> :
                    <div className="relative w-full">
                        <InputField className="rounded-full pl-12" type="text" placeholder="Search files and folders" />
                        <Search className="scale-75 absolute top-2 left-4" />
                    </div>
                }
                
            </div>

            {/* not found */}
            {
                isLoading ? <QuickAccessPageLoading /> : 
                !data.lastUploadedFiles && !data.lastUpdatedFiles ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-40 select-none pointer-events-none">
                    <img src={upload_files} alt="Upload files" className="w-48 lg:w-72"/>
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                        It looks like you haven’t uploaded or interacted with any files yet. 
                        <br /> 
                        <span className="font-semibold">Once you start adding files, they will appear here</span>
                    </p>
                </div> :
                <>
                {/* last uploaded files */}
                {
                    data?.lastUploadedFiles && <>
                        <Subtitle className="mt-12 text-xs text-zinc-800 dark:text-zinc-200">Last uploaded files</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs">
                            {
                                data.lastUploadedFiles.map((file: FileProps) => (
                                    <File 
                                        key={file._id} 
                                        file={file}
                                    />
                                ))
                            }
                        </div>
                    </>
                }

                {/* last updated files */}
                {
                    data?.lastUpdatedFiles && <>
                        <Subtitle className="mt-12 text-xs text-zinc-800 dark:text-zinc-200">Last updated files</Subtitle>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 gap-4 text-xs">
                            {
                                data.lastUpdatedFiles.map((file: FileProps) => (
                                    <File 
                                        key={file._id} 
                                        file={file}
                                    />
                                ))
                            }
                        </div>
                    </>
                }
                </>
            }

        </Animate>

        </>
  )
}
