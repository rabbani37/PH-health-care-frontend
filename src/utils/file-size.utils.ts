


export function formateFileSize(bytes: number) {
    if (bytes < (1024 * 1024)) {
        return `${(bytes / 1024).toFixed()} KB`
    }

    return `${(bytes / 1024*1024).toFixed()} MB`

}