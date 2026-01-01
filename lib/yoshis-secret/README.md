# Yoshi's Secret Module

Cryptographic encoding framework using finite Young Fields for secure data transformation.

## Overview

Yoshi's Secret is a cryptographic encoding system built on finite field mathematics. It provides encoding/decoding, hashing, authentication, and various cryptographic primitives for secure data transformation. Inspired by childhood curiosity and data exploration.

## Features

- **Encoding/Decoding**: Transform data using finite field operations
- **String Encoding**: Convert strings to/from numeric representations
- **Hashing**: Generate deterministic hashes using field operations
- **Authentication**: HMAC-like message authentication
- **Random Generation**: Deterministic random sequences
- **Commitments**: Pedersen-like commitment schemes
- **Oblivious Transfer**: Privacy-preserving value transfer

## API

### Classes

#### `YoshisSecret`

Main cryptographic encoding class.

```javascript
const secret = new YoshisSecret(prime);
```

**Constructor Parameters:**
- `prime` - Prime number for finite field (default: 31337)

**Methods:**

##### Basic Encoding
- `encode(value)` - Encode a number
- `decode(encoded)` - Decode an encoded number
- `encodeString(message)` - Encode a string to numeric array
- `decodeString(encoded)` - Decode numeric array to string

##### Hashing & Authentication
- `hash(data)` - Generate hash of data
- `authenticate(message, key)` - Generate authentication code
- `verifyAuthentication(message, authCode, key)` - Verify authentication

##### Batch Operations
- `encodeBatch(values)` - Encode array of values
- `decodeBatch(encoded)` - Decode array of values

##### Cryptographic Primitives
- `fieldXOR(a, b)` - XOR-like operation in finite field
- `generateRandomSequence(seed, length)` - Generate deterministic random sequence
- `commit(value, randomness)` - Create commitment to a value
- `verifyCommitment(value, commitment, randomness)` - Verify commitment
- `obliviousTransferSend(message0, message1)` - Setup oblivious transfer
- `obliviousTransferReceive(package, choice, mask)` - Receive from oblivious transfer

### Examples

#### `yoshisSecretExample()`

Demonstrates basic encoding/decoding operations.

```javascript
const result = yoshisSecretExample();
console.log(result.original);  // "Hello Yoshi!"
console.log(result.decoded);   // "Hello Yoshi!"
console.log(result.hash);      // Numeric hash
```

## Usage Examples

### Basic Encoding/Decoding

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Encode a number
const encoded = secret.encode(42);
console.log('Encoded:', encoded);

// Decode it back
const decoded = secret.decode(encoded);
console.log('Decoded:', decoded); // 42
```

### String Encoding

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Encode a message
const message = "Hello Yoshi!";
const encoded = secret.encodeString(message);
console.log('Encoded:', encoded); // Array of numbers

// Decode back to string
const decoded = secret.decodeString(encoded);
console.log('Decoded:', decoded); // "Hello Yoshi!"
```

### Hashing

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Hash data
const hash1 = secret.hash("Important message");
const hash2 = secret.hash({ data: "complex", nested: true });

console.log('Hash:', hash1);

// Hashes are deterministic
console.log(secret.hash("test") === secret.hash("test")); // true
```

### Message Authentication

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

const message = "Secure message";

// Generate authentication code
const authCode = secret.authenticate(message);

// Verify authentication
const isValid = secret.verifyAuthentication(message, authCode);
console.log('Valid:', isValid); // true

// Tampered message won't verify
const isTampered = secret.verifyAuthentication("Modified message", authCode);
console.log('Tampered:', isTampered); // false
```

### Batch Operations

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Encode multiple values at once
const values = [10, 20, 30, 40, 50];
const encoded = secret.encodeBatch(values);

// Decode them back
const decoded = secret.decodeBatch(encoded);
console.log(decoded); // [10, 20, 30, 40, 50]
```

### Deterministic Random Sequence

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Generate deterministic random sequence
const seed = 1337;
const sequence = secret.generateRandomSequence(seed, 10);
console.log('Random sequence:', sequence);

// Same seed produces same sequence
const sequence2 = secret.generateRandomSequence(seed, 10);
console.log('Identical:', JSON.stringify(sequence) === JSON.stringify(sequence2)); // true
```

### Commitment Scheme

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Commit to a value
const secretValue = 42;
const { commitment, randomness } = secret.commit(secretValue);

console.log('Commitment:', commitment);

// Later, reveal and verify
const isValid = secret.verifyCommitment(secretValue, commitment, randomness);
console.log('Commitment valid:', isValid); // true

// Wrong value won't verify
const isFake = secret.verifyCommitment(99, commitment, randomness);
console.log('Fake value:', isFake); // false
```

### Oblivious Transfer

```javascript
const { YoshisSecret } = require('reality-simulation-code');

const secret = new YoshisSecret(31337);

// Sender prepares two messages
const package = secret.obliviousTransferSend(100, 200);

// Receiver chooses one without sender knowing which
const received = secret.obliviousTransferReceive(package, 1, package.mask);
console.log('Received:', received); // 200 (chose second message)
```

## Security Notes

⚠️ **Important**: This implementation uses `Math.random()` in some functions (like `commit` and `obliviousTransferSend`), which is **NOT cryptographically secure**. For production use:

1. Replace `Math.random()` with a CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)
2. Use `crypto.getRandomValues()` in browsers
3. Use `crypto.randomBytes()` in Node.js
4. Consider using established cryptographic libraries for production security

## Use Cases

- **Data Encoding**: Transform sensitive data using finite field operations
- **Message Integrity**: Verify data hasn't been tampered with
- **Secret Sharing**: Distribute secrets across multiple parties
- **Zero-Knowledge Proofs**: Commitments for cryptographic protocols
- **Learning & Exploration**: Understand cryptographic primitives

## Mathematics

Yoshi's Secret is built on finite field arithmetic (ℤₚ where p is prime). The encoding uses:
- Multiplicative encoding with a secret key derived from special primes
- Additive shift for additional security
- Finite field inverse for decoding

## References

- See `YOSHIS_SECRET_BAE_MATH.md` for comprehensive documentation
- See Young Field module for the underlying field mathematics
- See God Generator module for applications in entity creation
