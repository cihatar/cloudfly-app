export const bytesToSize = (bytes: number = 0): string => {
    if (bytes < 1024 ** 3) {
        return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
    } else {
        return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
    }
};

export const convertToPercentage = (value: number = 0, total: number = 0): number => {
    return (value * 100) / total;
};
