import Animate from '@/components/global/Animate'
import throwAway from "@/assets/throw_away.svg";
import { getTrashedFilesAndFolders } from '@/api/api';
import { Title } from '@/components/global/Titles'
import { useQuery } from '@tanstack/react-query';
import DriveLoading from '@/components/drive/DriveLoading';
import FilesAndFolders from '@/components/drive/FilesAndFolders';
import { useState } from 'react';
import { SelectedItemsProps } from './Drive';
import SelectionBar from '@/components/drive/selection-bar/SelectionBar';

export default function Trash() {
    const [selectedItems, setSelectedItems] = useState<SelectedItemsProps>({ files: [], folders: [], count: 0 });

    const { data, isLoading } = useQuery({
        queryKey: ["trash"],
        queryFn: () => getTrashedFilesAndFolders(),
        staleTime: 2 * 60 * 1000,
    });
    
    return (
        <>
        <Animate>
            {/* title */}  
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                <div className="flex items-center justify-start gap-2">
                    <Title>Trash</Title>
                </div>
            </div>

            {/* not found */}
            {
                isLoading ? <DriveLoading /> : 
                !data.files && !data.folders ? 
                <div className="flex flex-col text-center items-center justify-center gap-4 mt-56 select-none pointer-events-none">
                    <img src={throwAway} alt="Trash" className="w-48 lg:w-72"/>
                    <p className="text-zinc-800 dark:text-zinc-200 text-sm">
                        Nothing to see here, your trash is clean.
                    </p>
                </div> : 
                // files and folders
                <FilesAndFolders 
                    data={data}
                    setSelectedItems={setSelectedItems}
                    selectedItems={selectedItems}
                />
            }

        </Animate>

        {/* selection bar */}
        <SelectionBar selectedItems={selectedItems} page="trash" />

        </>
    )
}
