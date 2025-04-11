export const FIREBASE_AUTH_ERRORS = {
  // Custom Claims & Token Errors
  'auth/claims-too-large': 'Custom user permissions exceed the maximum allowed size.',
  'auth/id-token-expired': 'Your session has expired. Please log in again.',
  'auth/id-token-revoked': 'Your session was revoked. Please log in again.',
  'auth/invalid-claims': 'Invalid custom permissions provided.',
  'auth/invalid-id-token': 'Invalid session token. Please log in again.',
  'auth/session-cookie-expired': 'Your login session has expired.',
  'auth/session-cookie-revoked': 'Your login session was revoked.',

  // User Management Errors
  'auth/email-already-exists': 'This email is already in use. Try logging in instead.',
  'auth/email-already-in-use': 'This email is already registered. Please use a different one.',
  'auth/invalid-disabled-field': 'Invalid account status value.',
  'auth/invalid-display-name': 'Display name must be a non-empty string.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/invalid-email-verified': 'Invalid email verification status.',
  'auth/invalid-password': 'Password must be at least 6 characters long.',
  'auth/invalid-phone-number': 'Please enter a valid phone number (e.g., +1234567890).',
  'auth/invalid-photo-url': 'Profile photo must be a valid image URL.',
  'auth/invalid-uid': 'User ID must be between 1 and 128 characters.',
  'auth/phone-number-already-exists': 'This phone number is already in use.',
  'auth/uid-already-exists': 'This user ID is already taken.',
  'auth/user-not-found': 'No account found with these details.',

  // Authentication & Permissions
  'auth/insufficient-permission': 'You do not have permission to perform this action.',
  'auth/invalid-credential': 'Invalid login credentials provided.',
  'auth/operation-not-allowed': 'This login method is not enabled.',
  'auth/unauthorized-continue-uri': 'The redirect URL is not authorized.',

  // System & Configuration Errors
  'auth/internal-error': 'Something went wrong. Please try again later.',
  'auth/invalid-argument': 'Invalid input provided.',
  'auth/project-not-found': 'Authentication service is not properly configured.',
  'auth/too-many-requests': 'Too many attempts. Please wait before trying again.',

  // OAuth & Provider Errors
  'auth/invalid-oauth-responsetype': 'Invalid OAuth response type.',
  'auth/invalid-provider-id': 'Unsupported login provider.',
  'auth/missing-oauth-client-secret': 'OAuth configuration is incomplete.',
  'auth/cancelled-popup-request': 'Login popup was cancelled.',
  'auth/popup-closed-by-user': 'Login window was closed too soon.',

  // Password Hashing & Import
  'auth/invalid-hash-algorithm': 'Unsupported password encryption method.',
  'auth/invalid-password-hash': 'Invalid password format.',
  'auth/invalid-password-salt': 'Invalid password security key.',
  'auth/missing-hash-algorithm': 'Password encryption method is required.',

  // Dynamic Links & Redirects
  'auth/invalid-continue-uri': 'Invalid redirect URL.',
  'auth/invalid-dynamic-link-domain': 'This link domain is not authorized.',
  'auth/missing-continue-uri': 'A redirect URL is required.',

  // Miscellaneous
  'auth/maximum-user-count-exceeded': 'Cannot import more users at this time.',
  'auth/reserved-claims': 'Cannot use restricted property names.',
  'auth/invalid-user-import': 'Invalid user data provided.',
  'default': 'An unexpected error occurred. Please try again.'
};

export function firebaseErrorHandler(errorCode: string) {
  return FIREBASE_AUTH_ERRORS[errorCode] || FIREBASE_AUTH_ERRORS.default;
}