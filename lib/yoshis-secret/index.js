/**
 * Yoshi's Secret Module
 * 
 * Cryptographic encoding framework using finite Young Fields
 * Inspired by childhood curiosity and data exploration
 * 
 * @module yoshis-secret
 * @author xaoex
 */

const { createFiniteField } = require('../young-field');

/**
 * Yoshi's Secret - A cryptographic encoding system using Young Field mathematics
 * 
 * This implements a secret encoding/decoding system based on finite fields,
 * allowing messages to be encoded using mathematical transformations.
 * Inspired by childhood curiosity and data exploration.
 */
class YoshisSecret {
  constructor(prime = 31337) {
    // Use a large prime for the finite field
    this.field = createFiniteField(prime);
    this.prime = prime;
    this.secretKey = this._generateSecretKey();
  }

  /**
   * Generate a secret key based on special primes
   * Uses primes significant to the creator
   */
  _generateSecretKey() {
    const specialPrimes = [1993, 1991, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    let key = 1;
    for (const p of specialPrimes) {
      key = this.field.multiply(key, p % this.prime);
    }
    return key;
  }

  /**
   * Encode a number using Yoshi's Secret transformation
   */
  encode(value) {
    const normalized = value % this.prime;
    const encoded = this.field.multiply(normalized, this.secretKey);
    return this.field.add(encoded, 1337 % this.prime);
  }

  /**
   * Decode a number using Yoshi's Secret inverse transformation
   */
  decode(encoded) {
    const shifted = this.field.add(encoded, this.field.multiply(-1, 1337 % this.prime));
    const keyInverse = this.field.inverse(this.secretKey);
    return this.field.multiply(shifted, keyInverse);
  }

  /**
   * Encode a string by converting to numeric values
   */
  encodeString(message) {
    const encoded = [];
    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      encoded.push(this.encode(charCode));
    }
    return encoded;
  }

  /**
   * Decode numeric array back to string
   */
  decodeString(encoded) {
    let message = '';
    for (const value of encoded) {
      const charCode = this.decode(value);
      message += String.fromCharCode(charCode);
    }
    return message;
  }

  /**
   * Generate a hash of data using field operations
   */
  hash(data) {
    let hash = 0;
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data);
    
    for (let i = 0; i < dataStr.length; i++) {
      const charCode = dataStr.charCodeAt(i);
      hash = this.field.add(
        this.field.multiply(hash, 31),
        charCode % this.prime
      );
    }
    
    return hash;
  }

  /**
   * Batch encode multiple values
   * Definition: ∀v ∈ V : E(V) = {E(v₁), E(v₂), ..., E(vₙ)}
   */
  encodeBatch(values) {
    return values.map(v => this.encode(v));
  }

  /**
   * Batch decode multiple values
   * Definition: ∀e ∈ E : D(E) = {D(e₁), D(e₂), ..., D(eₙ)}
   */
  decodeBatch(encoded) {
    return encoded.map(e => this.decode(e));
  }

  /**
   * Compute HMAC-like authentication code
   * Definition: HMAC(m, k) = H((k ⊕ opad) || H((k ⊕ ipad) || m))
   * Simplified for field operations
   */
  authenticate(message, key = null) {
    const authKey = key !== null ? key : this.secretKey;
    const innerHash = this.hash(message + authKey);
    const outerHash = this.hash(authKey + innerHash);
    return outerHash;
  }

  /**
   * Verify message authentication
   */
  verifyAuthentication(message, authCode, key = null) {
    const computed = this.authenticate(message, key);
    return computed === authCode;
  }

  /**
   * Generate a deterministic random sequence from seed
   * Definition: Rₙ = (a × Rₙ₋₁ + c) mod p (Linear Congruential Generator)
   */
  generateRandomSequence(seed, length) {
    const sequence = [];
    let current = seed % this.prime;
    
    for (let i = 0; i < length; i++) {
      current = this.field.add(
        this.field.multiply(current, this.secretKey),
        1337 % this.prime
      );
      sequence.push(current);
    }
    
    return sequence;
  }

  /**
   * XOR-like operation in finite field
   * Definition: a ⊕ b = (a + b) mod p
   */
  fieldXOR(a, b) {
    return this.field.add(a, b);
  }

  /**
   * Compute commitment to a value (Pedersen-like commitment)
   * Definition: C(v, r) = E(v) + r mod p
   * 
   * NOTE: This uses Math.random() which is NOT cryptographically secure.
   * For production use, replace with a CSPRNG (e.g., crypto.getRandomValues).
   */
  commit(value, randomness = null) {
    const r = randomness !== null ? randomness : Math.floor(Math.random() * this.prime);
    const encoded = this.encode(value);
    const commitment = this.field.add(encoded, r % this.prime);
    return { commitment, randomness: r };
  }

  /**
   * Verify commitment
   */
  verifyCommitment(value, commitment, randomness) {
    const encoded = this.encode(value);
    const expected = this.field.add(encoded, randomness % this.prime);
    return expected === commitment;
  }

  /**
   * Oblivious transfer-like protocol setup
   * Generate two encoded values where receiver can choose one
   * 
   * NOTE: This uses Math.random() which is NOT cryptographically secure.
   * For production use, replace with a CSPRNG (e.g., crypto.getRandomValues).
   */
  obliviousTransferSend(message0, message1) {
    const encoded0 = this.encode(message0);
    const encoded1 = this.encode(message1);
    const mask = Math.floor(Math.random() * this.prime);
    
    return {
      transfer0: this.field.add(encoded0, mask),
      transfer1: this.field.add(encoded1, mask),
      mask: mask
    };
  }

  /**
   * Receive from oblivious transfer
   */
  obliviousTransferReceive(transferPackage, choice, mask) {
    const chosen = choice === 0 ? transferPackage.transfer0 : transferPackage.transfer1;
    const recovered = this.field.add(chosen, this.field.multiply(-1, mask));
    return this.decode(recovered);
  }
}

/**
 * Example: Yoshi's Secret encoding/decoding
 */
function yoshisSecretExample() {
  const secret = new YoshisSecret(31337);
  
  const message = "Hello Yoshi!";
  const encoded = secret.encodeString(message);
  const decoded = secret.decodeString(encoded);
  
  return {
    original: message,
    encoded: encoded.slice(0, 5).join(',') + '...',
    decoded: decoded,
    hash: secret.hash(message)
  };
}

module.exports = {
  YoshisSecret,
  yoshisSecretExample
};
