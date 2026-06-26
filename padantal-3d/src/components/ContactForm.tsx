"use client";

import { useState } from "react";
import { useT } from "@/i18n/lang";

export function ContactForm() {
  const { contact } = useT();
  const f = contact.form;
  const [status, setStatus] = useState<"" | "ok" | "err">("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !message || !emailOk) {
      setStatus("err");
      return;
    }
    setStatus("ok");
    e.currentTarget.reset();
  };

  const field = "w-full rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-[0.98rem] text-cream outline-none transition-colors placeholder:text-faint focus:border-acc/60";

  return (
    <form onSubmit={onSubmit} noValidate className="card rounded-3xl p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.82rem] text-muted">{f.name}</span>
          <input name="name" autoComplete="name" required placeholder={f.placeholderName} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.82rem] text-muted">{f.company}</span>
          <input name="company" autoComplete="organization" placeholder={f.placeholderCompany} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.82rem] text-muted">{f.emailLabel}</span>
          <input name="email" type="email" autoComplete="email" required placeholder={f.placeholderEmail} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.82rem] text-muted">{f.country}</span>
          <input name="country" autoComplete="country-name" placeholder={f.placeholderCountry} className={field} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-[0.82rem] text-muted">{f.interest}</span>
        <select name="interest" className={field}>
          {f.interests.map((i) => (
            <option key={i} className="bg-surface">{i}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-1.5 block text-[0.82rem] text-muted">{f.message}</span>
        <textarea name="message" rows={4} required placeholder={f.placeholderMessage} className={`${field} resize-y`} />
      </label>
      <button type="submit" className="btn btn-primary mt-5 w-full justify-center">
        {f.send}
      </button>
      {status === "ok" && <p className="mt-3 text-[0.9rem] font-medium text-acc">{f.ok}</p>}
      {status === "err" && <p className="mt-3 text-[0.9rem] font-medium text-red-400">{f.err}</p>}
      <p className="mt-3 text-center text-[0.78rem] text-faint">{f.priv}</p>
    </form>
  );
}
