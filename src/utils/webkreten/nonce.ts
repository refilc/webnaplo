import { BinaryLike, Hmac, createHmac } from "crypto";

export class Nonce {
    nonce: string;
    key: BinaryLike;
    encoded?: string;
  
    constructor(nonce: string, key: string) {
        this.nonce = nonce;
        this.key = key;
    }
  
    async encode(message: string): Promise<void> {
        const messageBytes = Buffer.from(message);
        const hmac: Hmac = createHmac('sha512', this.key);
        const digest = hmac.update(messageBytes).digest();
        this.encoded = digest.toString('base64');
    }
  
    header(): Map<string, string> {
        return new Map([
            ['X-Authorizationpolicy-Nonce', this.nonce],
            ['X-Authorizationpolicy-Key', (this.encoded ?? '')],
            ['X-Authorizationpolicy-Version', 'v2'],
        ]);
    }
}

export function getNonce(nonce: string, username: string, instituteCode: string) {
    const nonceEncoder = new Nonce(nonce, String.fromCharCode(98, 97, 83, 115, 120, 79, 119, 108, 85, 49, 106, 77));
    nonceEncoder.encode(instituteCode.toUpperCase() + nonce + username.toUpperCase());

    return nonceEncoder;
}