import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { NAV_ITEMS } from '../nav';

// Inquiry categories mirror the site's own nav sections (minus About, which
// isn't something a client would "inquire about") — see nav.js. If a new
// section is added there, it appears here automatically.
const CONTACT_CATEGORIES = NAV_ITEMS.filter((item) => item.label !== 'About').map((item) => item.label);

const EMPTY_FORM = { category: CONTACT_CATEGORIES[0] || '', email: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send your inquiry.');
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex-grow px-page-margin py-section-gap flex flex-col gap-section-gap max-w-3xl">
        <header>
          <h1 className="font-page-title text-page-title">Contact</h1>
        </header>
        <p className="font-body text-body">
          Thanks for reaching out — we've received your inquiry and will get back to you at {form.email} soon.
        </p>
        <Link to="/" className="font-body text-body underline decoration-1 underline-offset-2 hover:text-secondary self-start">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow px-page-margin py-section-gap flex flex-col gap-section-gap max-w-3xl">
      <header>
        <h1 className="font-page-title text-page-title">Contact</h1>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
        <div>
          <label className="font-body-bold text-caption uppercase tracking-wider">Category</label>
          <select
            required
            className="input-brutal"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {CONTACT_CATEGORIES.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-body-bold text-caption uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            className="input-brutal"
            placeholder="email@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label className="font-body-bold text-caption uppercase tracking-wider">Message</label>
          <textarea
            required
            rows={6}
            className="input-brutal resize-none"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {status === 'error' && (
          <p className="font-caption text-caption text-error">{errorMessage}</p>
        )}

        <button type="submit" disabled={status === 'sending'} className="btn-primary mt-item-gap">
          {status === 'sending' ? 'SENDING...' : 'SEND INQUIRY'}
        </button>
      </form>
    </div>
  );
}
