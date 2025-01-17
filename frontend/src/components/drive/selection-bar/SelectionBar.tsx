import { FileProps, FolderProps, SelectedItemsProps } from '@/pages/Drive'
import MovetoTrash from './MovetoTrash'
import { useEffect, useState } from 'react'
import Star from './Star';
import Unstar from './Unstar';
import Delete from './Delete';
import Restore from './Restore';
import Move from './Move';
import { CustomButton } from '@/components/global/FormElements';
import { Wand } from 'lucide-react';

export default function SelectionBar({ data, setSelectedItems, selectedItems, page }: {  data: { files: FileProps[], folders: FolderProps[] }; setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItemsProps>>; selectedItems: SelectedItemsProps; page: string; }) {

    const [items, setItems] = useState<SelectedItemsProps>({ files: [], folders: [], count: 0 });
    const [parent, setParent] = useState<string>("");
    
    // keep selected item information in items state when files or folders are unselected
    useEffect(() => {
        if (selectedItems.count > 0) {
            setItems(selectedItems);
            setParent(selectedItems?.files[0]?.parent || selectedItems?.folders[0]?.parent);
        }
    }, [selectedItems]);    

    const setParentFolder = (id: string) => setParent(id); 

    const selectAll = () => setSelectedItems({ files: data?.files || [], folders: data?.folders || [], count: (data?.files?.length || 0) + (data?.folders?.length || 0) });    
    
    return (
        <div className={`selection-bar transition-all shadow-md flex flex-col lg:flex-row items-center justify-center gap-2 p-4 text-xs rounded-md lg:rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 border bg-white dark:bg-zinc-900
            ${selectedItems.count ? `visible opacity-1 -translate-y-10` : `invisible opacity-0`} `}
        >
            <p className="text-xs text-center mx-2">{selectedItems.count + " items selected"}</p>
            <CustomButton onClick={selectAll} type="button" variant="secondary" className="w-full cursor-default rounded-full">
                <Wand />
                Select All
            </CustomButton>
            {
                page === "drive" && <>
                {
                    items?.files.every(i => i.isStarred === true) &&
                    items?.folders.every(i => i.isStarred === true) ?
                    <>
                    <Unstar items={items} />
                    </>
                    :
                    <Star items={items} />
                }
                <Move items={items} parentFolder={parent} setParentFolder={setParentFolder} />
                <MovetoTrash items={items} />
                </>
            }

            {
                page === "quick-access" && <>
                {
                    items?.files.every(i => i.isStarred === true) &&
                    items?.folders.every(i => i.isStarred === true) ?
                    <>
                    <Unstar items={items} />
                    </>
                    :
                    <Star items={items} />
                }
                <MovetoTrash items={items} />
                </>
            }

            {
                page === "starred" && <>
                {
                    items?.files.every(i => i.isStarred === true) &&
                    items?.folders.every(i => i.isStarred === true) ?
                    <>
                    <Unstar items={items} />
                    </>
                    :
                    <Star items={items} />
                }
                <MovetoTrash items={items} />
                </>
            }

            {
                page === "trash" && <>
                <Restore items={items} />
                <Delete items={items} />
                </>
            }
            
        </div>
  )
}
