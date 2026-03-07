export const code1 = 
`
def ENCRYPT(text, shift):
    result = ""
    for char in text:
        if char.isalpha():
            shift_base = 65 if char.isupper() else 97
            result += chr((ord(char) - shift_base + shift) % 26 + shift_base)
        else:
            result += char
    return result

def DECRYPT(text, shift):
    return ENCRYPT(text, -shift)

text = input("Enter the message: ")
shift = int(input("Enter shift value: "))

encryptedText = ENCRYPT(text, shift)
print(f"{text} -> ENCRYPTED -> {encryptedText}")

decryptedText = DECRYPT(encryptedText, shift)
print(f"{encryptedText} -> DECRYPTED -> {decryptedText}")
`

export const code2 =
`
import string

def generate_matrix(key):
    key = key.upper().replace("J", "I")
    matrix = []
    used = set()

    for char in key:
        if char not in used and char in string.ascii_uppercase:
            matrix.append(char)
            used.add(char)

    for char in string.ascii_uppercase:
        if char not in used and char != "J":
            matrix.append(char)
            used.add(char)

    return [matrix[i:i+5] for i in range(0, 25, 5)]


def prepare_text(text):
    text = text.upper().replace("J", "I")
    text = "".join([c for c in text if c.isalpha()])

    pairs = []
    i = 0

    while i < len(text):
        a = text[i]
        b = text[i+1] if i+1 < len(text) else "X"

        if a == b:
            pairs.append(a + "X")
            i += 1
        else:
            pairs.append(a + b)
            i += 2

    return pairs


def find_position(matrix, char):
    for r in range(5):
        for c in range(5):
            if matrix[r][c] == char:
                return r, c



def encrypt(text, key):
    matrix = generate_matrix(key)
    pairs = prepare_text(text)

    result = ""

    for a, b in pairs:
        r1, c1 = find_position(matrix, a)
        r2, c2 = find_position(matrix, b)

        if r1 == r2:
            result += matrix[r1][(c1+1)%5]
            result += matrix[r2][(c2+1)%5]

        elif c1 == c2:
            result += matrix[(r1+1)%5][c1]
            result += matrix[(r2+1)%5][c2]

        else:
            result += matrix[r1][c2]
            result += matrix[r2][c1]

    return result


text = input("Enter message: ")
key = input("Enter key: ")

cipher = encrypt(text, key)

print("Encrypted Text:", cipher)
`

export const code3 =
`
import numpy as np

def hill_encrypt(message, key):
    message = message.upper().replace(" ", "")

    if len(message) % 2 != 0:
        message += 'X'

    message_vector = [ord(c) - 65 for c in message]

    key_matrix = np.array(key)

    result = ""

    for i in range(0, len(message_vector), 2):
        pair = np.array(message_vector[i:i+2])
        cipher_pair = key_matrix.dot(pair) % 26
        result += chr(cipher_pair[0] + 65)
        result += chr(cipher_pair[1] + 65)

    return result


key = [[3,3],[2,5]]

message = input("Enter message: ")

cipher = hill_encrypt(message, key)

print("Encrypted message:", cipher)
`

export const code4 =
`
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a


def mod_inverse(e, phi):
    for d in range(1, phi):
        if (e*d) % phi == 1:
            return d


p = 3
q = 11

n = p * q
phi = (p-1)*(q-1)

e = 7

d = mod_inverse(e, phi)

msg = int(input("Enter message (number): "))

cipher = (msg ** e) % n
print("Encrypted message:", cipher)

plain = (cipher ** d) % n
print("Decrypted message:", plain)
`

export const code5 =
`
def diffie_hellman(p, g, a_private, b_private):
    A_public = pow(g, a_private, p)
    B_public = pow(g, b_private, p)

    key_alice = pow(B_public, a_private, p)
    key_bob = pow(A_public, b_private, p)

    return key_alice, key_bob

ka, kb = diffie_hellman(23, 5, 69, 67)
print(f"Alice's Key: {ka}, Bob's Key: {kb}")
`

export const code6 = `=== COMPLETE ALGORITHM FOR DES (Data Encryption Standard) ===

BACKGROUND:
Developed by IBM and adopted by NIST in 1977. DES is a symmetric-key block cipher based on a 16-round Feistel Network. It encrypts data in 64-bit blocks using an effective 56-bit key.

PHASE 1: KEY GENERATION (Key Schedule)
1. The user provides a 64-bit key.
2. Permuted Choice 1 (PC-1): Every 8th bit is stripped (used for parity checking), leaving a 56-bit active key.
3. The 56 bits are split into two 28-bit registers: C0 and D0.
4. For each of the 16 rounds, C and D are Left-Circular-Shifted by 1 or 2 bits (depending on the round).
5. Permuted Choice 2 (PC-2): The combined 56 bits are compressed down to a 48-bit Subkey (K_i) for the current round.

PHASE 2: ENCRYPTION PROCESS
1. Initial Permutation (IP): The 64-bit plaintext block is scrambled using a fixed IP table.
2. Splitting: The 64-bit block is divided into a 32-bit Left half (L0) and a 32-bit Right half (R0).
3. The 16 Feistel Rounds. For rounds 1 through 16:
   a. Expansion Permutation (E-Box): The 32-bit Right half (R[i-1]) is expanded to 48 bits by duplicating 16 specific bits.
   b. Key Mixing: The 48-bit expanded right half is XORed with the 48-bit Subkey (K_i).
   c. Substitution (S-Boxes): This is the non-linear heart of DES.
      - The 48-bit result is split into eight 6-bit blocks.
      - Each 6-bit block enters a specific Substitution Box (S1 through S8).
      - The 1st and 6th bits determine the Row (0-3). The 2nd, 3rd, 4th, and 5th bits determine the Column (0-15).
      - The intersection in the S-Box table yields a 4-bit output.
      - 8 blocks * 4 bits = 32-bit output.
   d. Permutation (P-Box): The 32-bit output from the S-Boxes is rearranged using a fixed P-Box table.
   e. The Round Swap:
      - L[i] = R[i-1]
      - R[i] = L[i-1] XOR f(R[i-1], K_i)
4. Final Swap: After round 16, the halves are NOT swapped normally. They combine as (R16 || L16).
5. Final Permutation (IP^-1): The inverse of the Initial Permutation is applied to the 64-bit block to produce the final Ciphertext.`;

export const code7 = `=== COMPREHENSIVE STUDY OF MD5 (Message Digest 5) ===

BACKGROUND:
Designed by Ronald Rivest in 1991 (RFC 1321). MD5 is a cryptographic hash function that takes a message of arbitrary length and produces a fixed 128-bit (16-byte) hash value, typically rendered as a 32-character hexadecimal string.

PHASE 1: PRE-PROCESSING
1. Padding: The original message is padded so its length in bits is congruent to 448 modulo 512 (Length % 512 == 448).
   - The padding consists of a single '1' bit, followed by as many '0' bits as necessary.
2. Length Append: A 64-bit representation of the original message length (before padding) is appended to the end.
   - The total length of the message is now an exact multiple of 512 bits.

PHASE 2: BUFFER INITIALIZATION
MD5 uses four 32-bit chaining variables (A, B, C, D) initialized with specific constants (Little Endian format):
- A = 0x67452301
- B = 0xefcdab89
- C = 0x98badcfe
- D = 0x10325476

PHASE 3: THE COMPRESSION FUNCTION
The padded message is processed in successive 512-bit chunks. Each chunk is divided into sixteen 32-bit words (M0 to M15).
Each 512-bit chunk goes through 4 Rounds of 16 operations (64 total operations).
Each round uses a different non-linear auxiliary function:
- Round 1: F(B,C,D) = (B AND C) OR (NOT B AND D)
- Round 2: G(B,C,D) = (B AND D) OR (C AND NOT D)
- Round 3: H(B,C,D) = B XOR C XOR D
- Round 4: I(B,C,D) = C XOR (B OR NOT D)

The Step Operation Formula (executed 64 times per block):
A = B + ((A + Function(B,C,D) + M_i + K_i) <<< s)
- M_i: The 32-bit message block.
- K_i: A 32-bit constant derived from the sine function: K_i = floor(2^32 * abs(sin(i))).
- <<< s: A left circular shift by 's' bits.

SECURITY STATUS:
MD5 is officially broken and deprecated for cryptographic security. It is highly vulnerable to "Collision Attacks" (where two different files produce the exact same MD5 hash) and "Pre-image Attacks". Today, it is only used for non-security checksums to verify file transfers against accidental corruption.`;

export const code8 = `=== COMPREHENSIVE STUDY OF SHA-256 (Secure Hash Algorithm) ===

BACKGROUND:
Published by NIST in 2001 (FIPS 180-4). SHA-256 is part of the SHA-2 family and is the current global enterprise standard for digital signatures, certificates, and blockchain (e.g., Bitcoin Proof-of-Work). It outputs a 256-bit hash.

PHASE 1: PRE-PROCESSING
Padding works identically to MD5: pad with a '1' bit, fill with '0' bits until Length % 512 == 448, and append the 64-bit original message length. The message is processed in 512-bit blocks.

PHASE 2: INITIALIZATION
SHA-256 initializes EIGHT 32-bit working variables (a through h). These constants are the fractional parts of the square roots of the first 8 prime numbers:
a=0x6a09e667, b=0xbb67ae85, c=0x3c6ef372, d=0xa54ff53a
e=0x510e527f, f=0x9b05688c, g=0x1f83d9ab, h=0x5be0cd19

It also utilizes an array of 64 constants (K_0 to K_63), representing the fractional parts of the cube roots of the first 64 primes.

PHASE 3: MESSAGE SCHEDULE (W_t)
The 512-bit block is split into sixteen 32-bit words (W_0 to W_15).
SHA-256 expands these 16 words into 64 words (W_0 to W_63) to feed the 64 rounds of compression:
For t = 16 to 63:
  W_t = sigma_1(W_{t-2}) + W_{t-7} + sigma_0(W_{t-15}) + W_{t-16}
  Where:
  sigma_0(x) = ROTR^7(x) XOR ROTR^18(x) XOR SHR^3(x)
  sigma_1(x) = ROTR^17(x) XOR ROTR^19(x) XOR SHR^10(x)

PHASE 4: THE COMPRESSION LOOP
For each of the 64 rounds, two temporary variables (T1 and T2) are calculated using heavily non-linear functions:
- Ch(e,f,g) = (e AND f) XOR (NOT e AND g) -> The "Choice" function.
- Maj(a,b,c) = (a AND b) XOR (a AND c) XOR (b AND c) -> The "Majority" function.
- Sigma_0(a) = ROTR^2(a) XOR ROTR^13(a) XOR ROTR^22(a)
- Sigma_1(e) = ROTR^6(e) XOR ROTR^11(e) XOR ROTR^25(e)

T1 = h + Sigma_1(e) + Ch(e,f,g) + K_t + W_t
T2 = Sigma_0(a) + Maj(a,b,c)

The working variables are then shifted down (h=g, g=f, f=e, e=d+T1, d=c, c=b, b=a, a=T1+T2).

AVALANCHE EFFECT:
Because every bit of the input message is mixed through modular addition, right-rotates (ROTR), and bitwise XORs 64 times, altering even a single bit of the original message completely and unpredictably changes the final 256-bit hash.`;

export const code9 = `=== COMPREHENSIVE STUDY OF HMAC (Hash-Based Message Authentication Code) ===

BACKGROUND:
Defined in RFC 2104. HMAC is a specific type of MAC involving a cryptographic hash function and a secret cryptographic key. 

PURPOSE:
Standard hashes (MD5, SHA) only provide Data Integrity (proving a message hasn't been altered). HMAC provides both Data Integrity AND Origin Authentication. Because the hash is generated using a Secret Key, anyone who can successfully generate or verify the HMAC must possess the shared secret.

THE CORE CONSTANTS & VARIABLES:
- H: The underlying cryptographic hash function (e.g., SHA-256).
- B: The byte-length of the hash block (64 bytes for SHA-256).
- L: The byte-length of the hash output (32 bytes for SHA-256).
- K: The shared secret key.
- M: The plaintext message to be authenticated.
- ipad (Inner Pad): The byte 0x36 repeated B times (0x363636...).
- opad (Outer Pad): The byte 0x5C repeated B times (0x5C5C5C...).

PHASE 1: KEY FORMATTING
1. If Key (K) is longer than Block Size (B): K is hashed down to size L (K_new = H(K)).
2. If Key (K) is shorter than Block Size (B): K is padded on the right with zeros until its length equals B.
We call this strictly formatted key K+.

PHASE 2: THE CRYPTOGRAPHIC FORMULA
HMAC(K, M) = H( (K+ XOR opad) || H( (K+ XOR ipad) || M ) )

EXECUTION STEPS:
1. XOR the formatted key (K+) with the inner pad (ipad). This prevents trivial length-extension attacks.
2. Concatenate (||) the original message (M) to the result of Step 1.
3. Pass the combined string through the Hash function (H) to get the Inner Hash.
4. XOR the formatted key (K+) with the outer pad (opad).
5. Concatenate (||) the Inner Hash (from Step 3) to the result of Step 4.
6. Pass this final string through the Hash function (H) one last time to generate the HMAC.

APPLICATIONS:
- API Authentication (e.g., Stripe webhooks use HMAC-SHA256 to prove the payload is actually from Stripe).
- JSON Web Tokens (JWT) using the HS256 algorithm.
- IPsec and TLS protocols for securing packet payloads.`;

export const code10 = `=== COMPREHENSIVE STUDY OF WEB SECURITY PROTOCOLS ===

Web security relies on a stack of cryptographic protocols operating at different layers of the OSI model to ensure Confidentiality (Encryption), Integrity (Hashing/MACs), and Authentication (Certificates/Keys).

1. TRANSPORT LAYER SECURITY (TLS 1.3) - OSI Layer 4/7
TLS is the protocol that powers HTTPS. It replaces the deprecated SSL protocols.
Core Architecture:
- Handshake Protocol: Uses asymmetric cryptography (RSA, ECDSA, Diffie-Hellman) to authenticate parties and securely exchange a shared session key.
- Record Protocol: Uses symmetric cryptography (AES-GCM, ChaCha20) for high-speed bulk data encryption.

The TLS 1.3 Handshake (1-RTT Protocol):
a. ClientHello: The client sends a random nonce, supported Cipher Suites, and an Ephemeral Diffie-Hellman (ECDHE) Key Share.
b. ServerHello: The server responds with its own nonce, its chosen Key Share, and a CA-signed Digital Certificate to prove its identity.
c. Key Derivation: Both sides independently calculate the Symmetric Master Secret using the Diffie-Hellman parameters.
d. Finished: The server sends a MAC over the entire handshake, encrypted with the new symmetric key. The secure tunnel is now established.
*Perfect Forward Secrecy (PFS): Because TLS 1.3 uses ephemeral keys, even if the server's master RSA key is stolen years later, past traffic cannot be decrypted.

2. INTERNET PROTOCOL SECURITY (IPsec) - OSI Layer 3
IPsec operates at the Network Layer (in the OS kernel). It secures raw IP packets without applications needing to know about it. It relies on IKE (Internet Key Exchange) to establish security associations.
Core Sub-Protocols:
a. Authentication Header (AH - Protocol 51): Provides connectionless integrity, data origin authentication, and anti-replay protection. It signs the entire IP packet (including the header). It provides NO encryption.
b. Encapsulating Security Payload (ESP - Protocol 50): Provides payload confidentiality (AES encryption), authentication, and integrity.

Modes of Operation:
a. Transport Mode: Encrypts only the IP payload (the TCP/UDP segment). The original IP headers are left unencrypted. Used for end-to-end host communication.
b. Tunnel Mode: Encrypts the entire original IP packet and encapsulates it inside a brand new outer IP header. This hides the original source and destination IPs. This is the backbone architecture for Site-to-Site Corporate VPNs.

3. SECURE SHELL (SSH) - OSI Layer 7
Used for secure remote command-line execution over unsecured networks (typically Port 22).
- Validates the host identity using RSA or Ed25519 public keys to prevent Man-in-the-Middle attacks.
- Establishes a symmetric session key (usually AES) for the terminal traffic.
- Authenticates the client using password or, more securely, SSH Keypairs.`;
