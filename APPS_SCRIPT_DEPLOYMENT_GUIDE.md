# Google Apps Script Handler – Complete Setup Guide

## What Is a Handler?

A **handler** is a special function in Google Apps Script that processes incoming HTTP requests. It's like a webhook receiver.

When you deploy your script as a **Web App**, Google exposes it at a public URL. When someone POSTs or GETs to that URL, Apps Script automatically calls the matching handler function:

- **`doPost(e)`** — handles POST requests (form submissions, API calls)
- **`doGet(e)`** — handles GET requests (URL parameters)

The `e` parameter contains everything about the request:
- `e.parameter` — query/form-encoded parameters
- `e.postData` — raw request body
- `e.headers` — HTTP headers
- `e.contentType` — MIME type

Your contact form POSTs to the Apps Script URL, so it needs a `doPost()` handler.

---

## Step-by-Step Deployment

### Step 1: Open Your Google Sheet and Apps Script Editor

1. Open your target **Google Sheet**.
2. Go to **Extensions** → **Apps Script**.
   - This opens the Apps Script editor and binds the script to your sheet.
   - You'll see a blank editor or existing code.

![Extensions → Apps Script](https://lh3.googleusercontent.com/...)

---

### Step 2: Add the Handler Code

In the Apps Script editor, replace or paste the following code into `Code.gs`:

```javascript
const SHEET_NAME = 'orders';
const SHARED_SECRET = 'orders-secret-elhaj-2025';

/**
 * Main POST handler for form submissions
 */
function doPost(e) {
  try {
    // Parse request parameters
    const params = e && e.parameter ? e.parameter : {};
    const auth = params.auth || '';

    // Validate shared secret
    if (auth !== SHARED_SECRET) {
      return jsonResponse({ error: 'Unauthorized' }, 401);
    }

    // Parse the payload (sent as form-encoded JSON string)
    let payload = {};
    if (params.payload) {
      payload = JSON.parse(params.payload);
    }

    // Validate required fields
    const required = ['entityType', 'email', 'budget', 'contactMethod'];
    const missing = required.filter((k) => !payload[k]);
    if (missing.length > 0) {
      return jsonResponse({ error: 'Missing required fields', missing }, 400);
    }

    // Get or create the sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add header row
      sheet.appendRow([
        'Timestamp',
        'Entity Type',
        'Company Name',
        'Country',
        'Email',
        'Phone',
        'Product Name',
        'Product Details',
        'Budget',
        'Contact Method',
        'Locale',
        'User Agent'
      ]);
    }

    // Build data row
    const row = [
      new Date().toISOString(),
      payload.entityType || '',
      payload.companyName || '',
      payload.country || '',
      payload.email || '',
      payload.phone || '',
      payload.productName || '',
      payload.productDetails || '',
      payload.budget || '',
      payload.contactMethod || '',
      payload.locale || '',
      payload.userAgent || ''
    ];

    // Append row to sheet
    sheet.appendRow(row);

    // Return success response
    return jsonResponse({ ok: true, message: 'Form received and recorded' }, 200);
  } catch (err) {
    // Log error for debugging (visible in Apps Script Executions)
    console.error('doPost error:', err.message);
    return jsonResponse({ error: 'Server error: ' + err.message }, 500);
  }
}

/**
 * Helper: Return JSON response with status code
 */
function jsonResponse(data, code) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  if (output.setResponseCode) {
    output.setResponseCode(code);
  }
  return output;
}
```

**Key parts:**
- `doPost(e)` — main handler that processes POST requests
- Validates the `auth` parameter against your shared secret
- Parses the `payload` (JSON stringified in the form field)
- Creates the "orders" sheet if it doesn't exist
- Appends a row with all form fields
- Returns `{ ok: true }` on success

---

### Step 3: Save and Deploy

#### Save the Script
1. Press **Ctrl+S** (or **Cmd+S** on Mac).
2. Apps Script auto-saves, but explicitly saving is good practice.

#### Deploy as Web App

1. At the top of the editor, click **Deploy** (red button on the right).
   - If it says "Save," save first.
2. Click **New Deployment** (top right).

   ![New Deployment](https://lh3.googleusercontent.com/...)

3. A dialog opens. Set these options:
   - **Type:** Select `Web app` from the dropdown.
   - **Execute as:** Select your email/account (the one that owns the sheet).
   - **Who has access:** Select `Anyone` (or `Anyone with the link` if you prefer).
   
   ![Deploy Dialog](https://lh3.googleusercontent.com/...)

4. Click **Deploy**.

5. A popup shows your **Web App URL**:
   ```
   https://script.google.com/macros/s/AKfycbw_s70imhwUscY_kyrVEeF6wFlyC9hRapmFGcDH4ugSAZ4QHQLtTAqzObueySDvo7Ha/exec
   ```
   - **Copy this URL.**
   - This is the endpoint your frontend sends requests to.

---

### Step 4: Update Your `.env.local`

The URL from step 3 should already match what's in your `.env.local`:

```dotenv
NEXT_PUBLIC_BASEPATH=/eurosource
NEXT_PUBLIC_ORDERS_ENDPOINT=https://script.google.com/macros/s/AKfycbw_s70imhwUscY_kyrVEeF6wFlyC9hRapmFGcDH4ugSAZ4QHQLtTAqzObueySDvo7Ha/exec
NEXT_PUBLIC_ORDERS_SHARED_SECRET=orders-secret-elhaj-2025
```

If the URL changed during deployment, update `NEXT_PUBLIC_ORDERS_ENDPOINT` and restart your dev server:

```bash
npm run dev
```

---

## Testing the Handler

### Test 1: Direct curl (Before Frontend)

```bash
curl -sS -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "auth=orders-secret-elhaj-2025" \
  --data-urlencode 'payload={"entityType":"company","companyName":"ACME Inc","country":"Germany","email":"test@example.com","phone":"+49 123 456","productName":"Widget API","productDetails":"Integration needed","budget":"25k-50k","contactMethod":"email","locale":"en","userAgent":"curl/test"}' \
  "https://script.google.com/macros/s/AKfycbw_s70imhwUscY_kyrVEeF6wFlyC9hRapmFGcDH4ugSAZ4QHQLtTAqzObueySDvo7Ha/exec"
```

**Expected response:**
```json
{"ok":true,"message":"Form received and recorded"}
```

**What should happen:**
- A new row appears in your Google Sheet's "orders" tab within 1–2 seconds.
- Columns: Timestamp, Entity Type, Company Name, Country, Email, Phone, Product Name, Product Details, Budget, Contact Method, Locale, User Agent.

---

### Test 2: View Execution Logs (Debugging)

If something goes wrong, check the Apps Script execution logs:

1. In the Apps Script editor, go to **Executions** (left sidebar).
2. Find the most recent execution.
3. Click it to see:
   - Status (success/error)
   - Logs (output from `console.log()` and `console.error()`)
   - Error messages if the function failed

Example error you might see:
```
ReferenceError: "SHEET_NAME" is not defined
```

This means a variable is missing or misspelled.

---

### Test 3: Frontend Form Submission

1. Open `http://localhost:3000/eurosource/en` in your browser.
2. Fill out the contact form:
   - Entity Type: Company (or Individual)
   - Company Name: Test Co
   - Country: Germany
   - Email: your-email@example.com
   - Phone: +49 123 456
   - Budget: $25,000 - $50,000
   - Contact Method: Email
3. Click **Submit**.
4. You should see: **"Thank you for contacting us. We'll get back to you soon!"** (or equivalent success message).
5. **Immediately check your Google Sheet** (within 5 seconds):
   - Go to the sheet in a new tab.
   - Refresh it.
   - A new row should appear in the "orders" tab with all your data.

---

## What Each Part Does

| Component | Role | Status |
|-----------|------|--------|
| `doPost(e)` | Receives and processes POST requests | ✅ You add this |
| `params.auth` | Validates the shared secret | ✅ Built-in |
| `params.payload` | Receives form data (JSON string) | ✅ Sent by frontend |
| `SpreadsheetApp.getActiveSpreadsheet()` | Gets the sheet the script is bound to | ✅ Built-in (Apps Script magic) |
| `sheet.appendRow(row)` | Writes a new row to the sheet | ✅ Built-in |
| `jsonResponse()` | Helper to return JSON with status code | ✅ You add this |

---

## Common Issues & Fixes

### Issue 1: "Script function not found: doPost"

**Cause:** The handler code isn't deployed or isn't named `doPost`.

**Fix:**
1. Make sure the function is named **exactly** `doPost(e)` (case-sensitive).
2. Save the script: **Ctrl+S** (or **Cmd+S**).
3. Deploy a **new version**: Deploy → New Deployment → Web app.
4. Copy the new URL from the deployment popup.
5. Update `.env.local` with the new URL (if changed).

---

### Issue 2: "Unauthorized" Error

**Cause:** The `auth` parameter doesn't match `SHARED_SECRET`.

**Fix:**
1. Verify the shared secret in the code matches `.env.local`:
   - Code: `const SHARED_SECRET = 'orders-secret-elhaj-2025';`
   - `.env.local`: `NEXT_PUBLIC_ORDERS_SHARED_SECRET=orders-secret-elhaj-2025`
2. They must match **exactly** (including case, hyphens, numbers).
3. If you change the secret, redeploy: Deploy → New Deployment.

---

### Issue 3: "Missing required fields"

**Cause:** The form didn't send all required fields.

**Fix:**
1. Check the frontend form validation in `contact-form.tsx`.
2. Verify the payload includes: `entityType`, `email`, `budget`, `contactMethod`.
3. Test with curl first (see Test 1 above) to isolate the issue.

---

### Issue 4: Row appears but columns are wrong or empty

**Cause:** The payload format doesn't match the row columns.

**Fix:**
1. Check the order of fields in the `doPost()` handler matches your sheet columns.
2. Verify all form fields are included in the payload from the frontend.
3. Test with curl to see exactly what the frontend is sending.

---

### Issue 5: Deployment fails with "Authorization required"

**Cause:** You're not signed into the correct Google account.

**Fix:**
1. Check the account in the top-right of Apps Script.
2. Sign out and sign back in with the account that owns the sheet.
3. Try deploying again.

---

## How the Request Flows

```
Frontend (contact-form.tsx)
    ↓
  Detects Apps Script URL
    ↓
  Builds form-encoded POST:
  {
    auth: "orders-secret-elhaj-2025",
    payload: "{...form data...}"
  }
    ↓
  Sends to: https://script.google.com/macros/s/.../exec
    ↓
Google Apps Script
    ↓
  Receives in doPost(e)
    ↓
  Parses e.parameter.auth and e.parameter.payload
    ↓
  Validates secret
    ↓
  Gets "orders" sheet (creates if missing)
    ↓
  Appends row with form data
    ↓
  Returns { ok: true }
    ↓
Frontend
    ↓
  Receives response (no-cors, can't read it)
    ↓
  Shows success message
    ↓
✅ Data now in sheet!
```

---

## Checklist Before Going Live

- [ ] Handler code added to `Code.gs`
- [ ] Saved the script
- [ ] Deployed as **Web app** (not standalone)
- [ ] Execution as: **Your email**
- [ ] Who has access: **Anyone** (or Anyone with link)
- [ ] Copied the `/exec` URL
- [ ] `.env.local` has the correct URL in `NEXT_PUBLIC_ORDERS_ENDPOINT`
- [ ] `.env.local` has the correct secret in `NEXT_PUBLIC_ORDERS_SHARED_SECRET`
- [ ] Tested with curl → got `{"ok":true}` response
- [ ] Checked the sheet → new row appeared
- [ ] Tested from frontend → success message + new row in sheet

---

## Key Takeaways

1. **Handler** = a function that processes HTTP requests (doPost for POST, doGet for GET).
2. **Deployment** = making your script public at a URL so external apps can call it.
3. **Web App** = the deployment type for handlers (not "Library" or "Standalone").
4. **Execute as** = your account (the one that owns the sheet).
5. **Who has access** = "Anyone" (so your frontend can call it without auth headers).
6. **Testing** = use curl first, then frontend.

---

**Next:** Deploy the handler above, test with curl, and reply with results. I'll verify the full pipeline works end-to-end.
