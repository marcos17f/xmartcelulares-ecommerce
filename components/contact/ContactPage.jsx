'use client';

import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

// TODO: substituir pelos dados reais de contato da X-Mart
const CONTACT_INFO = {
  whatsapp: '(11) 98765-4321',
  phone: '0800 789 1234',
  email: 'contato@xmart.com.br',
  address: 'Av. Paulista, 1000 - São Paulo - SP',
  hours: 'Seg-Sáb: 09h-20h · Dom: 10h-18h',
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
                <span className="contact-whatsapp-icon">💬</span> {CONTACT_INFO.whatsapp}
              </span>
              <a
                href={`https://wa.me/55${CONTACT_INFO.whatsapp.replace(/\D/g, '')}`}
                className="btn-cta-small"
              >
                Conversar Agora
              </a>
            </div>
            <ul className="contact-details">
              <li>📞 {CONTACT_INFO.phone}</li>
              <li>✉️ {CONTACT_INFO.email}</li>
              <li>📍 {CONTACT_INFO.address}</li>
              <li>🕒 {CONTACT_INFO.hours}</li>
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
