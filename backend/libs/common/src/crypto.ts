import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const iv = randomBytes(16);
const password = 'Password used to generate key';

const key = randomBytes(32);

export const encryption = (text: any) => {
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  let encryptedText = cipher.update(text, 'utf-8', 'hex');
  return (encryptedText += cipher.final());
};

export const decryption = (hash: any) => {
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  let decryptedText = decipher.update(hash, 'hex', 'utf-8');
  return (decryptedText += decipher.final('utf-8'));
};
