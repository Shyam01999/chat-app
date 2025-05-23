const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop();
    if (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') {
        return 'video';
    }

    if (fileExt === 'mp3' || fileExt === 'wav' || fileExt === 'audio') {
        return 'audio';
    }

    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
        return 'image';
    }

    return "file"
}

export { fileFormat };