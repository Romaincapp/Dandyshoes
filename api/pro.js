// api/pro.js - Espace Pro protégé côté serveur (fonction Vercel)
//
// Le mot de passe et les contacts ne sont jamais dans le dépôt : ils viennent
// des variables d'environnement du projet Vercel.
//   PRO_PASSWORD        mot de passe de l'espace pro
//   PRO_SESSION_SECRET  longue chaîne aléatoire qui signe le cookie de session
//   PRO_CONTACTS        contacts au format JSON (voir README.md, section Espace Pro)

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const COOKIE = 'dandyshoes_pro';
const SESSION_SECONDS = 4 * 60 * 60; // 4 heures

const read = (file) => fs.readFileSync(path.join(__dirname, '_pro', file), 'utf8');

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const sign = (value) => crypto.createHmac('sha256', process.env.PRO_SESSION_SECRET).update(value).digest('hex');

const safeEqual = (a, b) => {
    const ha = crypto.createHash('sha256').update(String(a)).digest();
    const hb = crypto.createHash('sha256').update(String(b)).digest();
    return crypto.timingSafeEqual(ha, hb);
};

function hasValidSession(req) {
    const cookies = Object.fromEntries((req.headers.cookie || '').split(';').map((c) => {
        const i = c.indexOf('=');
        return [c.slice(0, i).trim(), decodeURIComponent(c.slice(i + 1).trim())];
    }));
    const [expiry, signature] = (cookies[COOKIE] || '').split('.');
    if (!expiry || !signature) return false;
    return Number(expiry) > Date.now() && safeEqual(signature, sign(expiry));
}

function sessionCookie(value, maxAge) {
    return `${COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

function contactBlock(title, contact) {
    if (!contact) return '';
    const phone = contact.phone ? `<p><strong>Téléphone :</strong> <a href="tel:${escapeHtml(contact.phone.replace(/\s/g, ''))}" style="color: var(--primary);">${escapeHtml(contact.phone)}</a></p>` : '';
    const email = contact.email ? `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(contact.email)}" style="color: var(--primary);">${escapeHtml(contact.email)}</a></p>` : '';
    const role = contact.role ? `<p><strong>Rôle :</strong> ${escapeHtml(contact.role)}</p>` : '';
    return `
                        <div style="margin-bottom: 2rem;">
                            <h4 style="color: var(--primary); margin-bottom: 1rem;">${title} :</h4>
                            <p><strong>Nom :</strong> ${escapeHtml(contact.name)}</p>
                            ${email}
                            ${phone}
                            ${role}
                        </div>`;
}

function renderContacts() {
    let contacts;
    try {
        contacts = JSON.parse(process.env.PRO_CONTACTS || '{}');
    } catch {
        contacts = {};
    }
    const emergency = (contacts.emergency || []).map((c) =>
        `<p><strong>${escapeHtml(c.name)} :</strong> <a href="tel:${escapeHtml(String(c.phone).replace(/\s/g, ''))}" style="color: #ff3c3c;">${escapeHtml(c.phone)}</a></p>`
    ).join('\n                            ');
    return contactBlock('Contact Principal', contacts.main)
        + contactBlock('Contact Technique', contacts.technical)
        + (emergency ? `
                        <div class="emergency-contact">
                            <h4>🚨 Contact Urgence (Jour J)</h4>
                            ${emergency}
                            <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 1rem;">
                                Disponibles 24h/24 le jour du concert
                            </p>
                        </div>` : '');
}

function send(res, status, html, headers = {}) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Robots-Tag', 'noindex');
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    res.end(html);
}

function loginPage(res, status, error) {
    const message = error ? '<div class="error-message" style="display: block;">Mot de passe incorrect</div>' : '';
    send(res, status, read('login.html').replace('{{ERROR}}', message));
}

function redirect(res, headers = {}) {
    res.statusCode = 303;
    res.setHeader('Location', '/pro');
    res.setHeader('Cache-Control', 'no-store');
    for (const [k, v] of Object.entries(headers)) res.setHeader(k, v);
    res.end();
}

async function readForm(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    let raw = typeof req.body === 'string' ? req.body : '';
    if (!raw) for await (const chunk of req) raw += chunk;
    return Object.fromEntries(new URLSearchParams(raw));
}

module.exports = async (req, res) => {
    if (!process.env.PRO_PASSWORD || !process.env.PRO_SESSION_SECRET) {
        return send(res, 503, '<p>Espace pro non configuré.</p>');
    }

    if (req.method === 'POST') {
        const form = await readForm(req);
        if (form.action === 'logout') {
            return redirect(res, { 'Set-Cookie': sessionCookie('', 0) });
        }
        if (!safeEqual(form.password || '', process.env.PRO_PASSWORD)) {
            return loginPage(res, 401, true);
        }
        const expiry = String(Date.now() + SESSION_SECONDS * 1000);
        return redirect(res, { 'Set-Cookie': sessionCookie(`${expiry}.${sign(expiry)}`, SESSION_SECONDS) });
    }

    if (!hasValidSession(req)) return loginPage(res, 200, false);
    send(res, 200, read('page.html').replace('{{CONTACTS}}', renderContacts()));
};
