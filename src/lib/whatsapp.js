import { WHATSAPP_NUMBER } from '../config'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Accepts 10-digit Indian mobiles (optionally with +91 / 0 prefix) or other numbers of 8–15 digits. */
export function validatePhone(raw) {
  const digits = raw.replace(/[\s\-().+]/g, '')
  if (!/^\d+$/.test(digits)) return false
  if (digits.length === 10) return /^[6-9]\d{9}$/.test(digits)
  if (digits.length === 11 && digits.startsWith('0')) return /^[6-9]\d{9}$/.test(digits.slice(1))
  if (digits.length === 12 && digits.startsWith('91')) return /^[6-9]\d{9}$/.test(digits.slice(2))
  return digits.length >= 8 && digits.length <= 15
}

export function validate(values) {
  const e = {}
  if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Please enter your full name.'
  if (!values.email.trim()) e.email = 'Email address is required.'
  else if (!EMAIL_RE.test(values.email.trim())) e.email = 'Enter a valid email address.'
  if (!values.phone.trim()) e.phone = 'Phone / WhatsApp number is required.'
  else if (!validatePhone(values.phone)) e.phone = 'Enter a valid phone number (e.g. 98765 43210).'
  if (!values.projectType) e.projectType = 'Please choose a project type.'
  if (!values.description.trim() || values.description.trim().length < 10) e.description = 'Please describe your project (at least 10 characters).'
  return e
}

export function buildMessage(v) {
  const lines = [
    'NEW PORTFOLIO PROJECT INQUIRY',
    '',
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Company: ${v.company.trim() || 'Not provided'}`,
    `Project Type: ${v.projectType}`,
    `Budget: ${v.budget || 'Not specified'}`,
    `Contact Preference: ${v.contactMethod}`,
    '',
    'Project Description:',
    v.description.trim(),
    '',
    'Source: Yogesh Kumar Portfolio',
  ]
  return lines.join('\n')
}

export function buildUrl(values) {
  const number = String(WHATSAPP_NUMBER).replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(buildMessage(values))}`
}
