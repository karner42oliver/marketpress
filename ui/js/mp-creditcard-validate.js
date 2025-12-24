// mp-creditcard-validate.js
// Vanilla JS Kreditkartenvalidierung für MarketPress Checkout
// Unterstützt: Nummer, Ablaufdatum, CVC, Name

export function formatCardNumber(value) {
  return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export function validateCardNumber(value) {
  const num = value.replace(/\D/g, '');
  if (num.length < 13 || num.length > 19) return false;
  // Luhn-Check
  let sum = 0, shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function formatCardExpiry(value) {
  return value.replace(/\D/g, '').replace(/(\d{2})(\d{1,2})/, '$1/$2').substr(0, 5);
}

export function validateCardExpiry(value) {
  const match = value.match(/^(\d{2})\/(\d{2,4})$/);
  if (!match) return false;
  let month = parseInt(match[1], 10);
  let year = parseInt(match[2], 10);
  if (year < 100) year += 2000;
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const expiry = new Date(year, month);
  return expiry > now;
}

export function validateCardCVC(value) {
  return /^\d{3,4}$/.test(value);
}

export function validateCardFullname(value) {
  return /^([a-zA-ZäöüÄÖÜß]+)([ ]{1})([a-zA-ZäöüÄÖÜß]+)$/.test(value.trim());
}
