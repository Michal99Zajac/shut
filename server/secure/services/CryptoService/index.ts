import crypto from 'crypto'

import { config } from '#/config'

/**
 * Crypto service
 */
export class CryptoService {
  private algorithm = config.secure.data.algorithm
  private salt = Buffer.from(config.secure.data.salt)
  private secret = config.secure.data.secret
  private key = crypto.scryptSync(this.secret, this.salt, 32)

  /**
   * Encrypt data
   *
   * @param data Data to encrypt
   * @returns Encrypted data
   */
  encrypt(data: string | Object) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv)
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), 'utf8'), cipher.final()])
    return {
      iv: iv.toString('hex'),
      content: encrypted.toString('hex'),
    }
  }

  /**
   * Decrypt data
   *
   * @param iv Initialization vector
   * @param content Encrypted data
   * @returns Decrypted data
   */
  decrypt(content: string, iv: string) {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, Buffer.from(iv, 'hex'))
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final(),
    ])
    return JSON.parse(decrypted.toString('utf8'))
  }
}

export default CryptoService
