/**
 * Biometric utility using the Web Authentication API (WebAuthn).
 *
 * Performs a user-verification challenge using a platform authenticator
 * (Face ID, Touch ID, Windows Hello, device PIN, etc.).
 *
 * No server-side credential storage is required — this is purely a
 * "prove you are the device owner" check using userVerification.
 */

export interface BiometricResult {
  /** true if the biometric check passed */
  success: boolean;
  /** true if the device / browser doesn't support WebAuthn at all */
  unsupported: boolean;
  /** human-readable error message when success === false && unsupported === false */
  error?: string;
}

/**
 * Request a biometric / PIN verification from the user.
 *
 * Usage:
 *   const { success, unsupported, error } = await requestBiometric();
 *   if (unsupported)  // show phrase with a note
 *   if (success)      // show phrase normally
 *   else              // show error
 */
export async function requestBiometric(): Promise<BiometricResult> {
  // Feature detection
  if (
    typeof window === "undefined" ||
    typeof window.PublicKeyCredential === "undefined"
  ) {
    return { success: false, unsupported: true };
  }

  // Check that a platform authenticator (on-device biometric / PIN) is available
  try {
    const available =
      await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    if (!available) {
      return { success: false, unsupported: true };
    }
  } catch {
    return { success: false, unsupported: true };
  }

  // Build a random 32-byte challenge
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  try {
    await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname,
        allowCredentials: [], // any registered credential on this device
        userVerification: "required",
        timeout: 60_000,
      },
    });

    return { success: true, unsupported: false };
  } catch (err) {
    const name = err instanceof Error ? err.name : "";
    // NotAllowedError means cancelled / failed / timed out
    const message =
      name === "NotAllowedError"
        ? "Biometric check failed. Please try again."
        : "Biometric check failed. Please try again.";
    return { success: false, unsupported: false, error: message };
  }
}
