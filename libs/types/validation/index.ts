
export enum SignupValidation {
  MIN_LENGTH = 'Password should include at least 6 characters',
  SPECIAL_CHARACTER = 'Password should include at least one special character',
  NUMBER = 'Password should include at least one number',
  UPPERCASE = 'Password should include at least one uppercase letter',
  LOWERCASE = 'Password should include at least one lowercase letter',
  EMAIL = 'Invalid email',
  TERMS = 'You must accept terms and conditions',
}