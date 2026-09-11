'use client';

import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { STORE_INFO, buildWhatsAppLink } from '../../lib/whatsapp';

// TODO: preencher o horário de funcionamento real da loja
const CONTACT_INFO = {
  email: STORE_INFO.email,
  address: STORE_INFO.addressLabel,
  hours: 'Seg-Sáb: 09h-20h',
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: enviar o formulário pro backend/serviço de e-mail
  };

  return (
    <>
      <Header />
      <section className="contact-page">
        <h1>Entre em Contato</h1>
        <p className="contact-subtitle">Estamos aqui para ajudar com suas dúvidas sobre Apple.</p>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <p className="contact-form-title">Envie sua Mensagem</p>
            <label>
              Nome completo
              <input type="text" value={form.name} onChange={handleChange('name')} placeholder="Seu nome" required />
            </label>
            <label>
              E-mail
              <input type="email" value={form.email} onChange={handleChange('email')} placeholder="voce@email.com" required />
            </label>
            <label>
              Mensagem
              <textarea
                value={form.message}
                onChange={handleChange('message')}
                placeholder="Como podemos ajudar?"
                rows={4}
                required
              />
            </label>
            <button type="submit" className="btn-cta contact-submit">
              Enviar Mensagem →
            </button>
          </form>

          <div className="contact-info">
            <p className="contact-info-title">Nossas Informações</p>
            <div className="contact-whatsapp">
              <span className="contact-whatsapp-label">
                <span className="contact-whatsapp-icon">💬</span> Fale com um vendedor
              </span>
              <a href={buildWhatsAppLink('Olá! Gostaria de tirar uma dúvida.')} className="btn-cta-small">
                Conversar Agora
              </a>
            </div>
            <ul className="contact-details">
              <li>✉️ {CONTACT_INFO.email}</li>
              <li>
                📍{' '}
                <a href={STORE_INFO.mapsUrl} target="_blank" rel="noreferrer">
                  {CONTACT_INFO.address}
                </a>
              </li>
              <li>🕒 {CONTACT_INFO.hours}</li>
              <li>
                📷{' '}
                <a href={STORE_INFO.instagramUrl} target="_blank" rel="noreferrer">
                  @xmartcelulares_
                </a>
              </li>
            </ul>
            <div className="contact-map-placeholder">
              <span className="contact-map-pin">📍</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
