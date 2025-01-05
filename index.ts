const RADIX = 16;
const DELIMITER = '-';

export const encryptText = (text: string): string => {
    return Array.from(text)
        .map(char => char.charCodeAt(0).toString(RADIX))
        .join(DELIMITER);
};

export const decryptText = (encryptedText: string): string => {
    return encryptedText.split(DELIMITER)
        .map(hex => String.fromCharCode(parseInt(hex, RADIX)))
        .join('');
};
