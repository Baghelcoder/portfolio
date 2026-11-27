import { useEffect, useRef, useState } from 'react'
import { LuSend, LuInfo, LuCheck, LuX, LuTriangleAlert } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa6'
import { budgets, contactMethods, projectTypes } from '../data/content'
import { buildUrl, validate } from '../lib/whatsapp'
import { Reveal } from './ui'

const EMPTY = { name: '', email: '', phone: '', company: '', projectType: '', budget: '', description: '', contactMethod: 'WhatsApp' }

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-200">
        {label}{required ? <span className="text-cyan" aria-hidden="true">*</span> : <span className="text-xs font-normal text-mute">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400"><LuTriangleAlert size={13} />{error}</p>}
    </div>
  )
}

function Toast({ toast, onClose }) {
  if (!toast) return null
  return (
    <div role="status" aria-live="polite" className="toast-in fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-md rounded-2xl border border-emerald-400/30 bg-bg2/95 p-5 shadow-[0_20px_80px_-20px_rgba(16,185,129,.5)] backdrop-blur-xl sm:inset-x-auto sm:bottom-8 sm:right-8 sm:mx-0">
      <button onClick={onClose} aria-label="Dismiss notification" className="absolute right-3 top-3 text-mute hover:text-white"><LuX size={18} /></button>
      <div className="flex gap-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><LuCheck size={20} /></div>
        <div className="pr-4">
          <p className="font-display font-semibold">WhatsApp is opening…</p>
          <p className="mt-1 text-sm leading-relaxed text-mute">
            Your inquiry is ready in WhatsApp. Please press <strong className="text-white">Send</strong> there to deliver it.
          </p>
          <a href={toast.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-cyan underline underline-offset-4">
            Didn&apos;t open? Tap here
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (k) => (e) => {
    const v = e.target.value
    setValues((s) => ({ ...s, [k]: v }))
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }))
  }

  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : 'false', 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) { document.getElementById(first)?.focus(); return }

    const url = buildUrl(values)
    window.open(url, '_blank', 'noopener,noreferrer')
    setToast({ url })
    setValues(EMPTY)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(null), 12000)
  }

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 bg-violet/20" />
        <div className="orb -right-20 bottom-0 h-[360px] w-[360px] bg-cyan/15" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-cyan sm:text-sm">
              <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />Contact
            </p>
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[1.02] tracking-tight">
              Have an Idea?<br /><span className="grad-text">Let&apos;s Build Something Great.</span>
            </h2>
            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-mute">
              Have a project in mind, need a website, or looking for a Full Stack Web Developer? Let&apos;s discuss your requirements and turn your idea into reality.
            </p>
          </Reveal>

          <Reveal delay={150} className="mt-8 flex gap-4 rounded-2xl border border-cyan/25 bg-cyan/[0.06] p-5">
            <LuInfo size={22} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-slate-300">
              <strong className="text-white">How this works:</strong> submitting opens WhatsApp with your inquiry already written. You then need to press <strong className="text-white">Send</strong> in WhatsApp. Nothing is delivered or stored until you do.
            </p>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} noValidate className="glass !rounded-3xl p-6 sm:p-9" aria-label="Project inquiry form">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full Name" required error={errors.name}>
                <input id="name" className="field" autoComplete="name" placeholder="Your name" value={values.name} onChange={set('name')} {...aria('name')} />
              </Field>
              <Field id="email" label="Email Address" required error={errors.email}>
                <input id="email" type="email" inputMode="email" className="field" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={set('email')} {...aria('email')} />
              </Field>
              <Field id="phone" label="Phone / WhatsApp Number" required error={errors.phone}>
                <input id="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" placeholder="98765 43210" value={values.phone} onChange={set('phone')} {...aria('phone')} />
              </Field>
              <Field id="company" label="Company Name">
                <input id="company" className="field" autoComplete="organization" placeholder="Your company" value={values.company} onChange={set('company')} />
              </Field>
              <Field id="projectType" label="Project Type" required error={errors.projectType}>
                <select id="projectType" className="field" value={values.projectType} onChange={set('projectType')} {...aria('projectType')}>
                  <option value="">Select project type</option>
                  {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field id="budget" label="Project Budget">
                <select id="budget" className="field" value={values.budget} onChange={set('budget')}>
                  <option value="">Select budget</option>
                  {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field id="description" label="Project Description" required error={errors.description}>
                <textarea id="description" rows={5} className="field resize-y" placeholder="Tell me about your project, goals and timeline…" value={values.description} onChange={set('description')} {...aria('description')} />
              </Field>
            </div>

            <fieldset className="mt-6">
              <legend className="mb-3 text-sm font-medium text-slate-200">Preferred Contact Method</legend>
              <div className="flex flex-wrap gap-3">
                {contactMethods.map((m) => (
                  <label key={m} className={`flex min-h-[2.9rem] cursor-pointer items-center gap-2 rounded-full border px-5 text-sm transition-all ${values.contactMethod === m ? 'border-cyan bg-cyan/10 text-white' : 'border-white/12 bg-white/[0.03] text-slate-300 hover:border-white/30'}`}>
                    <input type="radio" name="contactMethod" value={m} checked={values.contactMethod === m} onChange={set('contactMethod')} className="sr-only" />
                    {m}
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="btn btn-primary mt-8 w-full">
              <FaWhatsapp size={20} /> Send Project Inquiry <LuSend size={16} />
            </button>
            <p className="mt-4 text-center text-xs text-mute">WhatsApp opens in a new tab. Press Send there to deliver your message.</p>
          </form>
        </Reveal>
      </div>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  )
}
