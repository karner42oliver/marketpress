// Vanilla JS Checkout Validation (Prototyp)
// Ersetzt jQuery Validate für MarketPress Checkout
// Noch nicht produktiv! Nur Grundstruktur für weitere Integration

export function validateCheckoutForm(form) {
  const errors = {};

  // Login Felder (wenn sichtbar)
  const email = form.querySelector('[name="mp_login_email"]');
  if (email && email.offsetParent !== null && !email.value.trim()) {
    errors['mp_login_email'] = 'E-Mail ist erforderlich.';
  }
  const pass = form.querySelector('[name="mp_login_password"]');
  if (pass && pass.offsetParent !== null && !pass.value.trim()) {
    errors['mp_login_password'] = 'Passwort ist erforderlich.';
  }

  // Pflichtfelder für Rechnungsadresse
  const billingFields = [
    { name: 'billing[first_name]', label: 'Vorname' },
    { name: 'billing[last_name]', label: 'Nachname' },
    { name: 'billing[email]', label: 'E-Mail' },
    { name: 'billing[address1]', label: 'Adresse' },
    { name: 'billing[city]', label: 'Stadt' },
    { name: 'billing[country]', label: 'Land' },
    { name: 'billing[state]', label: 'Bundesland' },
    { name: 'billing[zip]', label: 'PLZ' }
  ];
  billingFields.forEach(f => {
    const input = form.querySelector(`[name="${f.name}"]`);
    if (input && !input.value.trim()) {
      errors[f.name] = `${f.label} ist erforderlich.`;
    }
  });

  // Wenn Lieferadresse aktiviert, auch diese prüfen
  const shippingCheckbox = form.querySelector('input[name="enable_shipping_address"]');
  if (shippingCheckbox && shippingCheckbox.checked) {
    const shippingFields = [
      { name: 'shipping[first_name]', label: 'Vorname (Lieferung)' },
      { name: 'shipping[last_name]', label: 'Nachname (Lieferung)' },
      { name: 'shipping[email]', label: 'E-Mail (Lieferung)' },
      { name: 'shipping[address1]', label: 'Adresse (Lieferung)' },
      { name: 'shipping[city]', label: 'Stadt (Lieferung)' },
      { name: 'shipping[country]', label: 'Land (Lieferung)' },
      { name: 'shipping[state]', label: 'Bundesland (Lieferung)' },
      { name: 'shipping[zip]', label: 'PLZ (Lieferung)' }
    ];
    shippingFields.forEach(f => {
      const input = form.querySelector(`[name="${f.name}"]`);
      if (input && !input.value.trim()) {
        errors[f.name] = `${f.label} ist erforderlich.`;
      }
    });
  }

  // Versandmethode (shipping_method) required
  const shippingMethod = form.querySelector('[name="shipping_method"]');
  if (shippingMethod && !shippingMethod.value) {
    errors['shipping_method'] = 'Bitte wähle eine Versandart.';
  }

  // Kreditkartenfelder (wenn vorhanden)
  const ccNum = form.querySelector('.mp-input-cc-num');
  if (ccNum && ccNum.offsetParent !== null && !ccNum.value.trim()) {
    errors['cc_num'] = 'Kreditkartennummer ist erforderlich.';
  }
  const ccExp = form.querySelector('.mp-input-cc-exp');
  if (ccExp && ccExp.offsetParent !== null && !ccExp.value.trim()) {
    errors['cc_exp'] = 'Ablaufdatum ist erforderlich.';
  }
  const ccCvc = form.querySelector('.mp-input-cc-cvc');
  if (ccCvc && ccCvc.offsetParent !== null && !ccCvc.value.trim()) {
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
