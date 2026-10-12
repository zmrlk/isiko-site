(() => {
  function attribution() {
    // Read the same v2 consent contract as isiko-site.js at submission time.
    // A later refusal, withdrawal or expiry must also apply to a retry.
    try {
      const consent = JSON.parse(localStorage.getItem('isiko_consent_v2'));
      const age = Date.now() - consent?.at;
      if (consent?.v !== 2 || typeof consent.analytics !== 'boolean' || consent.marketing !== true ||
          !Number.isFinite(consent.at) || age < 0 || age >= 180 * 86400000) return {};
    } catch {
      return {};
    }
    const result = {};
    const query = new URLSearchParams(location.search);
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'adset_id', 'ad_id', 'placement']) {
      const value = query.get(key)?.trim();
      if (value && /^[a-zA-Z0-9_. -]{1,100}$/.test(value)) result[key] = value;
    }
    return result;
  }
  for (const form of document.querySelectorAll('[data-isiko-contact]')) {
    const copy = JSON.parse(form.querySelector('[data-contact-copy]').textContent);
    const fields = form.querySelector('fieldset');
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('[role="status"]');
    const receipt = form.querySelector('[data-contact-receipt]');
    let submission = null;
    let submitted = false;
    fields.disabled = false;
    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (submitted || fields.disabled || !form.reportValidity()) return;
      const values = Object.fromEntries(new FormData(form));
      const signature = JSON.stringify(values);
      if (!submission || submission.signature !== signature) submission = { signature, id: crypto.randomUUID() };
      fields.disabled = true;
      form.setAttribute('aria-busy', 'true');
      button.textContent = copy.sending;
      status.textContent = copy.sending;
      receipt.textContent = '';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 45000);
      try {
        const response = await fetch('https://app.isiko.pl/api/leads/intake', {
          method: 'POST', credentials: 'omit', signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...values, ...attribution(), source: 'web', submission_id: submission.id, form_version: 'isiko-contact-v1',
            language: document.documentElement.lang, page_url: 'https://isiko.pl' + location.pathname })
        });
        const result = await response.json();
        if (!response.ok || result.success !== true || result.delivery !== 'delivered') {
          status.textContent = response.status === 429 ? copy.limit : copy.error;
          return;
        }
        submitted = true;
        fields.hidden = true;
        status.textContent = copy.delivered;
        receipt.textContent = result.confirmation === 'sent' ? copy.mail_sent : copy.mail_pending;
        status.focus();
      } catch {
        status.textContent = copy.error;
      } finally {
        clearTimeout(timeout);
        form.removeAttribute('aria-busy');
        fields.disabled = submitted;
        button.textContent = copy.send;
      }
    });
  }
})();
