export const bytesToSize = (bytes: number = 0): string => {
    if (bytes < 1024 ** 3) {
        return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    } else {
        return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
    }
};

export const convertToPercentage = (minVal: number = 0, maxVal: number = 0): number => {
    return (minVal * 100) / maxVal;
};
