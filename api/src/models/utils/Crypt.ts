import CryptoJS from 'crypto-js';

class Crypt {
  public cryptText(plainText: string): string {
    if (typeof (process.env.CRYPT_KEY) === 'undefined')
      throw new Error("Key não definida");

    return CryptoJS.AES.encrypt(plainText, process.env.CRYPT_KEY).toString();
  };

  public decryptText(cipherText: string): string {
    if (typeof (process.env.CRYPT_KEY) === 'undefined')
      throw new Error("Key não definida");

    var bytes = CryptoJS.AES.decrypt(cipherText, process.env.CRYPT_KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
  };

  public cryptObject(data: Object): string {
    if (typeof (process.env.CRYPT_KEY) === 'undefined')
      throw new Error("Key não definida");

    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.CRYPT_KEY).toString();
  };

  public decryptObject(cipherText: string): Object {
    return JSON.parse(this.decryptText(cipherText));
  };
};

export default Crypt;