// Apps Script Web App for Eurosource orders -> Google Sheets
const SHEET_NAME = 'orders';
const SHARED_SECRET = 'orders-secret-elhaj-2025';

// Return JSON helper
function jsonOutput(obj, code) {
  const out = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  // ContentService cannot set CORS headers; we avoid preflight by using form-encoded requests
  // from the client for this endpoint.
  if (code && out.setResponseCode) out.setResponseCode(code);
  return out;
}

function doPost(e) {
  try {
    // 1) Read auth and payload
    // When client posts as form-encoded:
    // - e.parameter.auth contains the shared secret
    // - e.parameter.payload contains stringified JSON
    // When client posts JSON, we fallback to postData.contents (not used by our client)
    const params = e && e.parameter ? e.parameter : {};
    const contentType = e && e.postData ? e.postData.type : '';
    const rawBody = e && e.postData ? e.postData.contents : '';

    const auth = params.auth || '';
    if (SHARED_SECRET && auth !== SHARED_SECRET) {
      return jsonOutput({ error: 'Unauthorized' }, 401);
    }

    let body = {};
    if (params.payload) {
      body = JSON.parse(params.payload);
    } else if (rawBody && contentType && contentType.indexOf('application/json') >= 0) {
      body = JSON.parse(rawBody);
    }

    // 2) Validate required fields
    const required = ['entityType', 'email', 'budget', 'contactMethod'];
    const missing = required.filter((k) => !body[k]);
    if (missing.length) {
      return jsonOutput({ error: 'Missing required fields', missing }, 400);
    }

    // 3) Append to sheet
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

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    sheet.appendRow(row);

    return jsonOutput({ ok: true }, 200);
  } catch (err) {
    return jsonOutput({ error: 'Internal error' }, 500);
  }
}
