import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';

// Env vars expected at deploy time
const {
  SPREADSHEET_ID = '',
  SHEET_NAME = 'Orders',
  SHARED_SECRET = '',
  ALLOWED_ORIGINS = '*', // comma-separated list or *
} = process.env;

const app = express();

// CORS setup
const allowed = ALLOWED_ORIGINS === '*'
  ? '*'
  : ALLOWED_ORIGINS.split(',').map((o) => o.trim());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowOrigin = allowed === '*' ? '*' : (allowed.includes(origin) ? origin : allowed[0] || '');
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth');
  if (req.method === 'OPTIONS') return res.status(204).end();
  next();
});

app.use(express.json({ limit: '1mb' }));

app.post('/', async (req, res) => {
  try {
    if (!SPREADSHEET_ID) {
      return res.status(500).json({ error: 'SPREADSHEET_ID not configured' });
    }

    // Simple shared-secret validation
    if (SHARED_SECRET) {
      const headerSecret = req.header('X-Auth');
      if (!headerSecret || headerSecret !== SHARED_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    const body = req.body || {};

    // Basic required field check (client already validates too)
    const required = ['entityType', 'email', 'budget', 'contactMethod'];
    const missing = required.filter((k) => !body[k]);
    if (missing.length) {
      return res.status(400).json({ error: 'Missing required fields', missing });
    }

    // Prepare row data (keep order consistent with your sheet columns)
    const now = new Date().toISOString();
    const row = [
      now,
      body.entityType || '',
      body.companyName || '',
      body.country || '',
      body.email || '',
      body.phone || '',
      body.productName || '',
      body.productDetails || '',
      body.budget || '',
      body.contactMethod || '',
      body.locale || '',
      body.userAgent || ''
    ];

    // Auth using the Function's default service account (ADC)
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Order append failed:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
});

// Export for Cloud Functions (Gen 2, HTTP)
export const handler = app;
