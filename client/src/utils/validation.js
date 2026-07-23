/**
 * Helper to validate if an email is real/valid and not disposable/fake.
 * @param {string} email 
 * @returns {{valid: boolean, reason?: string}}
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Email address is required.' };
  }
  
  const cleaned = email.trim().toLowerCase();
  
  // Standard RFC 5322 regex for email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  
  if (!emailRegex.test(cleaned)) {
    return { valid: false, reason: 'Please enter a valid email address.' };
  }
  
  const domain = cleaned.split('@')[1];
  if (!domain) {
    return { valid: false, reason: 'Invalid email domain.' };
  }
  
  // Common disposable email domains
  const disposableDomains = [
    'tempmail.com', 'temp-mail.org', 'mailinator.com', 'yopmail.com', 'yopmail.fr', 
    'yopmail.net', 'guerrillamail.com', '10minutemail.com', 'trashmail.com', 
    'dispostable.com', 'sharklasers.com', 'getairmail.com', 'burnermail.io', 
    'fakemailgenerator.com', 'maildrop.cc', 'mailnesia.com', 'mailcatch.com', 
    'safe-mail.net', 'boun.cr', '33mail.com', 'dropmail.me', 'incognitomail.com', 
    'maildominator.com', 'mintemail.com', 'spambox.us', 'throwawaymail.com', 
    'deadaddress.com', 'guerillamailblock.com', 'guerrillamail.de', 
    'guerrillamail.net', 'guerrillamail.org', 'meantinc.com'
  ];
  
  // Dummy/fake domains
  const fakeDomains = [
    'example.com', 'test.com', 'fake.com', 'dummy.com', 'email.com', 
    'domain.com', 'invalid.com', 'none.com', 'abc.com', 'xyz.com',
    'temp.com', 'user.com', 'customer.com', 'seller.com'
  ];
  
  if (disposableDomains.includes(domain) || disposableDomains.some(d => domain.endsWith('.' + d))) {
    return { valid: false, reason: 'Temporary or disposable emails are not allowed.' };
  }
  
  if (fakeDomains.includes(domain) || fakeDomains.some(d => domain.endsWith('.' + d))) {
    return { valid: false, reason: 'Please use a real, non-placeholder email address.' };
  }
  
  return { valid: true };
};

/**
 * Helper to validate if a phone number is real and not obviously fake.
 * @param {string} phone 
 * @returns {{valid: boolean, reason?: string}}
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, reason: 'Phone number is required.' };
  }
  
  const cleaned = phone.trim();
  
  // Check if phone contains disallowed characters (only allow +, digits, spaces, hyphens, and parentheses)
  const allowedCharsRegex = /^[+]?[0-9\s\-()]+$/;
  if (!allowedCharsRegex.test(cleaned)) {
    return { valid: false, reason: 'Phone number can only contain digits, spaces, hyphens, parentheses, and a leading +.' };
  }
  
  // Strip all non-digit characters to analyze the numeric parts
  const digits = cleaned.replace(/\D/g, '');
  
  if (digits.length < 7) {
    return { valid: false, reason: 'Phone number is too short (must be at least 7 digits).' };
  }
  
  if (digits.length > 15) {
    return { valid: false, reason: 'Phone number is too long (must be at most 15 digits).' };
  }
  
  // Reject repeating digits (e.g. 00000000, 111111111, etc.)
  const isRepeating = /^(\d)\1+$/.test(digits);
  if (isRepeating) {
    return { valid: false, reason: 'Repeating phone number sequences are not allowed.' };
  }
  
  // Reject sequential digits (e.g. 123456789, 987654321, 01234567)
  const sequentialUp = '01234567890123456789';
  const sequentialDown = '98765432109876543210';
  if (sequentialUp.includes(digits) || sequentialDown.includes(digits)) {
    return { valid: false, reason: 'Sequential phone number sequences are not allowed.' };
  }
  
  // Special pattern checks (e.g., dummy numbers like 1234567, 5555555, etc.)
  if (digits === '1234567' || digits === '12345678' || digits === '123456789' || digits === '1234567890') {
    return { valid: false, reason: 'Please use a real, non-placeholder phone number.' };
  }
  
  return { valid: true };
};
