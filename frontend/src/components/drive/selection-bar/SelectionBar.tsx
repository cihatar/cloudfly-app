import { SelectedItemsProps } from '@/pages/Drive'
import MovetoTrash from './MovetoTrash'
import { useEffect, useState } from 'react'
import Star from './Star';
import Unstar from './Unstar';
import Delete from './Delete';
import Restore from './Restore';
import Move from './Move';

export default function SelectionBar({ selectedItems, page }: { selectedItems: SelectedItemsProps, page: string }) {
    const [items, setItems] = useState<SelectedItemsProps>({ files: [], folders: [], count: 0 });
    
    // keep selected item information in items state when files or folders are unselected
    useEffect(() => {
        if (selectedItems.count > 0) {
            setItems(selectedItems);
        }
    }, [selectedItems]);
    
    return (
        <div className={`transition-all shadow-md flex items-center justify-center gap-2 p-2 pl-4 text-xs rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 border bg-white dark:bg-zinc-900 
            ${selectedItems.count ? `visible opacity-1 -translate-y-10` : `invisible opacity-0`} `}
        >
            <p className="text-xs text-center">{selectedItems.count + " items selected"}</p>
            {
                page === "drive" && <>
                <MovetoTrash items={items} />
                <Star items={items} />
                <Move items={items} parent={items?.files[0]?.parent || items?.folders[0]?.parent} />
                </>
            }

            {
                page === "starred" && <>
                <MovetoTrash items={items} />
                <Unstar items={items} />
                </>
            }

            {
                page === "trash" && <>
                <Delete items={items} />
                <Restore items={items} />
                </>
            }
            
        </div>
  )
}
