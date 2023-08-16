import { Nonce } from "@/utils/webkreten/nonce"

export function getNonce(nonce: string, username: string, instituteCode: string) {
    var nonceEncoder = new Nonce(nonce, String.fromCharCode(98, 97, 83, 115, 120, 79, 119, 108, 85, 49, 106, 77));
    nonceEncoder.encode(instituteCode.toUpperCase() + nonce + username.toUpperCase());

    return nonceEncoder;
}