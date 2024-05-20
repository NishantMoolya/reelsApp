const fileToBinary = (file) => {
    try {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const binaryData = reader.result;
            resolve(binaryData);
        };
        reader.onerror = () => {
            reject(new Error('Unable to read the file as binary data'));
        };
        reader.readAsArrayBuffer(file);
    }); 
    } catch (err) {
        console.log(`an error in converting into binary:${err}`);
        return false;
    }
};

export { fileToBinary };