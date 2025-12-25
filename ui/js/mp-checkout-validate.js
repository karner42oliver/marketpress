// Vanilla JS Checkout Validation (Prototyp)
// Ersetzt jQuery Validate für MarketPress Checkout
// Noch nicht produktiv! Nur Grundstruktur für weitere Integration

export function validateCheckoutForm(form) {
  const errors = {};

  // Login Felder (wenn sichtbar und required)
  const email = form.querySelector('[name="mp_login_email"]');
  if (email && email.offsetParent !== null && email.required && !email.value.trim()) {
    errors['mp_login_email'] = 'E-Mail ist erforderlich.';
  }
  const pass = form.querySelector('[name="mp_login_password"]');
  if (pass && pass.offsetParent !== null && pass.required && !pass.value.trim()) {
    errors['mp_login_password'] = 'Passwort ist erforderlich.';
  }

  // Alle sichtbaren und required Rechnungsfelder prüfen
  form.querySelectorAll('[name^="billing["][required]')
    .forEach(input => {
      if (input.offsetParent !== null && !input.value.trim()) {
        errors[input.name] = (input.labels && input.labels[0] ? input.labels[0].innerText : 'Pflichtfeld') + ' ist erforderlich.';
      }
    });

  // Wenn Lieferadresse aktiviert, alle sichtbaren und required Lieferfelder prüfen
  const shippingCheckbox = form.querySelector('input[name="enable_shipping_address"]');
  if (shippingCheckbox && shippingCheckbox.checked) {
    form.querySelectorAll('[name^="shipping["][required]')
      .forEach(input => {
        if (input.offsetParent !== null && !input.value.trim()) {
          errors[input.name] = (input.labels && input.labels[0] ? input.labels[0].innerText : 'Pflichtfeld') + ' ist erforderlich.';
        }
      });
  }

  // Versandmethode (shipping_method) required
  const shippingMethod = form.querySelector('[name="shipping_method"]');
  if (shippingMethod && shippingMethod.required && shippingMethod.offsetParent !== null && !shippingMethod.value) {
    errors['shipping_method'] = 'Bitte wähle eine Versandart.';
  }

  // Kreditkartenfelder (wenn vorhanden und required)
  const ccNum = form.querySelector('.mp-input-cc-num');
  if (ccNum && ccNum.offsetParent !== null && ccNum.required && !ccNum.value.trim()) {
    errors['cc_num'] = 'Kreditkartennummer ist erforderlich.';
  }
  const ccExp = form.querySelector('.mp-input-cc-exp');
  if (ccExp && ccExp.offsetParent !== null && ccExp.required && !ccExp.value.trim()) {
    errors['cc_exp'] = 'Ablaufdatum ist erforderlich.';
  }
  const ccCvc = form.querySelector('.mp-input-cc-cvc');
  if (ccCvc && ccCvc.offsetParent !== null && ccCvc.required && !ccCvc.value.trim()) {
    errors['cc_cvc'] = 'CVC ist erforderlich.';
  }

  // Optional: Telefonnummer prüfen (wenn Feld vorhanden und nicht leer)
  const phone = form.querySelector('[name="billing[phone]"]');
  if (phone && phone.value && !/^\+?[0-9\-\s]{6,}$/.test(phone.value.trim())) {
    errors['billing[phone]'] = 'Telefonnummer ist ungültig.';
  }

  return errors;
}

export function showCheckoutErrors(form, errors) {
  // Entferne alte Fehler
  form.querySelectorAll('.mp_form_input_error').forEach(el => el.classList.remove('mp_form_input_error'));
  form.querySelectorAll('.mp_form_label_error').forEach(el => el.classList.remove('mp_form_label_error'));
  form.querySelectorAll('.mp_tooltip').forEach(el => el.remove());

  Object.entries(errors).forEach(([name, message]) => {
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.classList.add('mp_form_input_error');
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.classList.add('mp_form_label_error');
      }
      // Tooltip-ähnliche Fehlermeldung
      const tooltip = document.createElement('div');
      tooltip.className = 'mp_tooltip error';
      tooltip.textContent = message;
      input.insertAdjacentElement('afterend', tooltip);
    }
  });
}
