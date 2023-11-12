import * as forge from 'node-forge';

export const encryptRsa = (payload: string, publicKey: string) =>
  forge.util.encode64(forge.pki.publicKeyFromPem(publicKey).encrypt(forge.util.encodeUtf8(payload), 'RSA-OAEP'));

export const decryptRsa = (payload: string, privateKey: string) =>
  forge.util.decodeUtf8(forge.pki.privateKeyFromPem(privateKey).decrypt(forge.util.decode64(payload), 'RSA-OAEP'));
