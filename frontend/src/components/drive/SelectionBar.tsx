import { CustomButton } from '../global/FormElements'
import { SelectedItemsProps } from '@/pages/Drive'

export default function SelectionBar({ selectedItems, page }: { selectedItems: SelectedItemsProps, page: string }) {
    return (
        <div className={`transition-all shadow-md flex items-center justify-center gap-2 p-2 pl-4 text-xs rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 border bg-white dark:bg-zinc-900 
            ${selectedItems.count ? `visible opacity-1 -translate-y-10` : `invisible opacity-0`} `}
        >
            <p className="text-xs text-center">{selectedItems.count + " items selected"}</p>
            {
                page === "drive" && <>
                <CustomButton className="rounded-full text-xs" variant="destructive">Move to Trash</CustomButton>
                <CustomButton className="rounded-full text-xs" variant="secondary">Add to Starred</CustomButton>
                <CustomButton className="rounded-full text-xs" variant="secondary">Move</CustomButton>
                </>
            }

            {
                page === "starred" && <>
                <CustomButton className="rounded-full text-xs" variant="destructive">Move to Trash</CustomButton>
                <CustomButton className="rounded-full text-xs" variant="secondary">Remove from Starred</CustomButton>
                </>
            }

            {
                page === "trash" && <>
                <CustomButton className="rounded-full text-xs" variant="destructive">Delete permanently</CustomButton>
                <CustomButton className="rounded-full text-xs" variant="secondary">Restore</CustomButton>
                </>
            }
            
        </div>
  )
}
