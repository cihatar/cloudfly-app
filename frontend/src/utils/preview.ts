let currentUrl: string | null = null;

export const previewFile = (mimeType: string, data: ArrayBuffer) => {
    if (currentUrl) URL.revokeObjectURL(currentUrl);

    if (mimeType.startsWith("image/")) {
        const image = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(image);
        return url;
    }  else if (mimeType.startsWith("video/")) {
        const video = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(video);
        return url;
    } else if (mimeType.startsWith("audio/")) {
        const audio = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(audio);
        return url;
    } else if (mimeType.startsWith("text/plain")) {
        const decoder = new TextDecoder('utf-8');
        const text = decoder.decode(data);
        return text;
    }

    return undefined;
}