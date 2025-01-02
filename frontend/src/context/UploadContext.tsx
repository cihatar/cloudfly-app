import { createContext, ReactNode, useContext, useState } from "react";

interface UploadedFilesProps {
    id: string;
    files: File[];
    progress: number;
}

interface UploadContextProps {
    uploadedFiles: UploadedFilesProps[];
    updateUploadedFiles: (data: UploadedFilesProps) => void;
    updateUploadedFilesProgress: (id: string, progress: number) => void;
    closeUploadProgress: () => void;
    isMinimized: boolean;
    updateIsMinimized: () => void;
}

const UploadContext = createContext<UploadContextProps | null>(null);

export const UploadProvider = ({ children }: { children: ReactNode }) => {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFilesProps[] | []>([]);
    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    // add newly uploaded files to uploaded files array
    const updateUploadedFiles = (data: UploadedFilesProps) => setUploadedFiles([ ...uploadedFiles, data]);

    // update the progress of uploaded files
    const updateUploadedFilesProgress = (id: string, progress: number) => {
        setUploadedFiles(prev => prev.map(file => file.id === id ? { ...file, progress} : file))
    }

    // close upload progress component
    const closeUploadProgress = () => setUploadedFiles([]);
    
    const updateIsMinimized = () => setIsMinimized(!isMinimized);

    return (
        <UploadContext.Provider
            value={{
                uploadedFiles, 
                updateUploadedFiles, 
                updateUploadedFilesProgress, 
                closeUploadProgress, 
                isMinimized, 
                updateIsMinimized
            }}
        >
            {children}
        </UploadContext.Provider>
    );
}

export const useUploadContext = () => {
    const context = useContext(UploadContext);
    if (!context) {
      throw new Error("useUploadContext must be used within UploadProvider");
    }
    return context;
};


