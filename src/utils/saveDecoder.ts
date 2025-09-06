import CryptoJS from 'crypto-js';

// AES Key from the documentation
const AES_KEY = 'UKu52ePUBwetZ9wNX88o54dnfKRu0T1l';

// C# Binary Header from the documentation
const CSHARP_HEADER = new Uint8Array([0, 1, 0, 0, 0, 255, 255, 255, 255, 1, 0, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0]);

/**
 * Remove header from save file data
 */
function removeHeader(data: Uint8Array): Uint8Array {
  let offset = 22; // C# header length
  
  // Parse length-prefixed string header (LEB128 encoding)
  let length = 0;
  let shift = 0;
  let lengthBytes = 0;
  
  for (let i = 0; i < 5 && offset + i < data.length; i++) {
    const byte = data[offset + i];
    length |= (byte & 0x7F) << shift;
    lengthBytes++;
    if ((byte & 0x80) === 0) {
      break;
    }
    shift += 7;
  }
  
  offset += lengthBytes;
  
  // Remove trailing byte (11) - return without last byte
  return data.slice(offset, -1);
}

/**
 * Add header to save file data
 */
function addHeader(base64Data: Uint8Array): Uint8Array {
  const dataLength = base64Data.length;
  
  // Generate length header (LEB128)
  const lengthHeader: number[] = [];
  let length = dataLength;
  
  while (length >= 0x80) {
    lengthHeader.push((length & 0x7F) | 0x80);
    length >>>= 7;
  }
  lengthHeader.push(length & 0x7F);
  
  // Combine all parts
  const result = new Uint8Array(CSHARP_HEADER.length + lengthHeader.length + base64Data.length + 1);
  let offset = 0;
  
  // C# header
  result.set(CSHARP_HEADER, offset);
  offset += CSHARP_HEADER.length;
  
  // Length header
  result.set(lengthHeader, offset);
  offset += lengthHeader.length;
  
  // Base64 data
  result.set(base64Data, offset);
  offset += base64Data.length;
  
  // Trailing byte
  result[offset] = 11;
  
  return result;
}

/**
 * Convert string to Uint8Array
 */
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

/**
 * Convert Uint8Array to string
 */
function uint8ArrayToString(data: Uint8Array): string {
  const decoder = new TextDecoder();
  return decoder.decode(data);
}

/**
 * Decode Silksong save file
 */
export function decodeSilksongSave(fileData: ArrayBuffer): any {
  try {
    const data = new Uint8Array(fileData);
    
    // 1. Remove header
    const dataNoHeader = removeHeader(data);
    
    // 2. Base64 decode
    const base64String = uint8ArrayToString(dataNoHeader)
      .replace(/\n/g, '')
      .replace(/\r/g, '')
      .trim();
    
    const encryptedData = CryptoJS.enc.Base64.parse(base64String);
    
    // 3. AES decrypt
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: encryptedData },
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    // 4. Parse JSON
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
    
  } catch (error) {
    console.error('Error decoding save file:', error);
    throw new Error('Failed to decode save file. Please check the file format.');
  }
}

/**
 * Encode Silksong save file
 */
export function encodeSilksongSave(saveData: any): Uint8Array {
  try {
    // 1. Convert to JSON string
    const jsonString = JSON.stringify(saveData, null, 0);
    
    // 2. AES encrypt
    const encrypted = CryptoJS.AES.encrypt(
      jsonString,
      CryptoJS.enc.Utf8.parse(AES_KEY),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    // 3. Base64 encode
    const base64String = encrypted.toString();
    const base64Data = stringToUint8Array(base64String);
    
    // 4. Add header
    return addHeader(base64Data);
    
  } catch (error) {
    console.error('Error encoding save file:', error);
    throw new Error('Failed to encode save file. Please check your modifications.');
  }
}

/**
 * Validate JSON string
 */
export function validateJson(jsonString: string): { isValid: boolean; error?: string } {
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    return { 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format'
    };
  }
}

/**
 * Download file with given data and filename
 */
export function downloadFile(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}