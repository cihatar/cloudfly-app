import Animate from "@/components/global/Animate";
import folderIcon from "@/assets/folder_icon.svg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Subtitle, Title } from "@/components/global/Titles";
import { EllipsisVertical } from "lucide-react";

export default function Drive() {
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

        {/* folders */}
        <Subtitle title="Folders" className="mt-8 text-sm text-blackdefault/75"/>
        <Separator className="mb-4" />

        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-xs">

          <div className="flex justify-between items-center bg-blackdefault/[0.02] rounded p-2 cursor-pointer group">
            <div className="flex items-center gap-2 overflow-hidden">
              <img src={folderIcon} className="w-8 md:w-10"/>
              <p>test1</p>
            </div>
            <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible"/>
          </div>

          <div className="flex justify-between items-center bg-blackdefault/[0.02] rounded p-2 cursor-pointer group">
            <div className="flex items-center gap-2 overflow-hidden">
              <img src={folderIcon} className="w-8 md:w-10"/>
              <p>test2</p>
            </div>
            <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible"/>
          </div>

        </div>

        {/* files */}
        <Subtitle title="Files" className="mt-8 text-sm text-blackdefault/75"/>
        <Separator className="mb-4" />

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-xs">

            <div className="w-full h-48 flex flex-col items-start border rounded p-2 cursor-pointer group overflow-hidden">
                <div className="flex items-center justify-center w-full h-full p-2 bg-purple-400 font-semibold text-xl text-whitedefault rounded mb-2 relative overflow-hidden">
                    MP3
                    <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible absolute top-2 right-2"/>
                </div>
                <p className="">testaudio.mp3</p>
                <p className="text-blackdefault/50">mp3</p>
            </div>

            <div className="w-full h-48 flex flex-col items-start border rounded p-2 cursor-pointer group overflow-hidden">
                <div className="flex items-center justify-center w-full h-full p-2 bg-teal-400 font-semibold text-xl text-whitedefault rounded mb-2 relative">
                    JPG
                    <EllipsisVertical className="w-8 h-8 p-2 invisible rounded-full hover:bg-blackdefault/5 group-hover:visible absolute top-2 right-2"/>
                </div>
                <p>testimage.jpg</p>
                <p className="text-blackdefault/50">jpg</p>
            </div>

        </div>

    </Animate>
  )
}
