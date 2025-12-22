# Form Submission Issue – Complete Diagnostic Report

**Generated:** 22 December 2025  
**Status:** Form UI shows success but no data reaches Google Sheet  
**Root Cause:** Missing `doPost()` handler in deployed Apps Script Web App

---

## Executive Summary

Your contact form submission pipeline is **95% complete** but fails at the final step: the Google Apps Script Web App doesn't have a handler to receive and process the POST request. The frontend appears to succeed because it uses `no-cors` mode (which hides backend errors), but the data never reaches your sheet.

---

## Current Architecture

```
User Form (contact-form.tsx)
    ↓
Validates & collects data
    ↓
Detects Apps Script endpoint (Google URL pattern)
    ↓
Sends POST with form-encoded auth + payload (no-cors)
    ↓
🚫 Apps Script Web App doesn't have doPost() handler
    ↓
Returns "Script function not found: doPost" (HTTP 200 with error page)
    ↓
Frontend sees opaque response (no-cors), treats as success ✓
    ↓
❌ Data never appended to Google Sheet
    ↓
User sees "Success!" but sheet is empty
```

---

## Issues Identified

### 1. **Apps Script Missing `doPost()` Handler** ⚠️ CRITICAL
**Status:** Not deployed  
**Impact:** 100% of form submissions fail silently

**Evidence:**
```
curl response:
"Script-Funktion nicht gefunden: doPost"
(Script function not found: doPost)
HTTP 200 with error page
```

**Why it matters:**
- Apps Script requires explicit handler functions (`doPost` for POST, `doGet` for GET).
- Without `doPost()`, the service returns the error page HTML.
- Your frontend cannot read the response (due to `no-cors`), so it displays success anyway.

**What's needed:**
- A complete `doPost(e)` function that:
  1. Validates the shared secret (`orders-secret-elhaj-2025`)
  2. Parses the form-encoded payload
  3. Appends the row to the "orders" sheet
  4. Returns JSON confirmation

---

### 2. **Frontend No-CORS Masking Backend Errors** ⚠️ DESIGN ISSUE
**Status:** Working as intended but misleading  
**Impact:** User sees false success; can't diagnose issues

**Code in `src/components/contact-form.tsx` (line ~100):**
```tsx
const res = await fetch(endpoint, {
  method: "POST",
  ...(isAppsScript
    ? {
        mode: "no-cors" as RequestMode,  // ← Opaque response
        // ... rest of request
      }
    : { ... }
));

if (!isAppsScript) {
  if (!res.ok) { /* Error handling */ }
}
// Apps Script requests skip error checks
setSubmitted(true);  // ← Always succeeds even if Apps Script failed
```

**Why it's a problem:**
- `no-cors` returns an opaque response with status 0 and empty body.
- The code cannot verify if the server actually processed the request.
- Users get a success message whether the data reached the sheet or not.

**Real cost:**
- Lost form submissions (invisible failures).
- No feedback loop to troubleshoot issues.

---

### 3. **Incorrect Endpoint Validation (Minor)**
**Status:** Acceptable but could be stricter  
**Impact:** Low (unlikely to cause real issues)

**Code in `src/components/contact-form.tsx` (line ~97):**
```tsx
const isAppsScript = /script\.google(usercontent|)\.com/.test(endpoint);
```

**Your endpoint:**
```
https://script.google.com/macros/s/AKfycbw_s70imhwUscY_kyrVEeF6wFlyC9hRapmFGcDH4ugSAZ4QHQLtTAqzObueySDvo7Ha/exec
```

**Does it match?** Yes (`script.google.com` matches).

**Minor issue:** The regex allows optional `usercontent` but doesn't validate `/macros/s/...` or `/exec` patterns. Could prevent misrouting to wrong endpoints.

---

### 4. **Missing Sheet Tab "orders"**
**Status:** Unknown (likely exists)  
**Impact:** High if missing

**Current state:**
- You haven't confirmed the Apps Script is bound to the correct sheet.
- The Apps Script needs to write to a tab named "orders" (or create it).

**Check:**
- Go to your Apps Script editor.
- Is it standalone or bound to a sheet?
- If standalone: you need a sheet ID in the handler.
- If bound: does the sheet have an "orders" tab?

---

### 5. **No Logging or Debugging**
**Status:** Critical gap  
**Impact:** Can't diagnose failures in production

**What's missing:**
- Client-side logging to browser console (partially present but could be enhanced).
- No way to verify Apps Script execution (you can view logs in Apps Script editor, but contact-form.tsx doesn't expose failures).
- No retry mechanism or user feedback if Apps Script times out.

---

## What Needs to Be Done

### Step 1: Add `doPost()` Handler to Apps Script
**Delete:** Nothing (this is new code).  
**Add:** Full handler function in your Apps Script (Code.gs).

**Required handler:**
```javascript
const SHEET_NAME = 'orders';
const SHARED_SECRET = 'orders-secret-elhaj-2025';

function doPost(e) {
  try {
    // Parse form-encoded body
    const params = e && e.parameter ? e.parameter : {};
    const auth = params.auth || '';

    // Validate secret
    if (auth !== SHARED_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON).setResponseCode(401);
    }

    // Parse payload
    let payload = {};
    if (params.payload) {
      payload = JSON.parse(params.payload);
    }

    // Get or create sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp', 'Entity Type', 'Company Name', 'Country', 'Email', 'Phone',
        'Product Name', 'Product Details', 'Budget', 'Contact Method', 'Locale', 'User Agent'
      ]);
    }

    // Append row
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
    sheet.appendRow(row);

    // Return success
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON).setResponseCode(200);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON).setResponseCode(500);
  }
}
```

**Actions:**
1. Open your Apps Script (from the sheet: Extensions → Apps Script).
2. Replace or add this code to `Code.gs`.
3. Deploy: Manage Deployments → New Deployment → Type: Web app → Execute as: You → Who has access: Anyone with the link.
4. **Keep the deployment URL** (`https://script.google.com/macros/s/.../exec`) and verify it matches `.env.local`.

---

### Step 2: Verify Sheet Setup
**Delete:** Nothing.  
**Check:**
- Is the Apps Script bound to the correct Google Sheet?
- Does the sheet have an "orders" tab (or should it be auto-created)?

**If standalone script:**
- Use `SpreadsheetApp.openById('YOUR_SHEET_ID')` instead of `getActiveSpreadsheet()`.
- Get the sheet ID from the Google Sheet URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit...`
- Add as a variable in `Code.gs`.

---

### Step 3 (Optional): Improve Frontend Error Feedback
**Delete:** The current opaque no-cors handling (optional).  
**Add:** Client-side logging to console to help users verify submission.

**Recommended change in `src/components/contact-form.tsx`:**
```tsx
// After fetch completes
console.log('Form submission sent to:', endpoint);
console.log('No-cors response: opaque (browser security)', res);
// For debugging, you can enable server-side logging in Apps Script
```

**This helps but doesn't fully solve the issue** (Apps Script still needs to work first).

---

### Step 4: Clean Up Unused Backend Code (Optional)
**Delete:**
- `backend/orders-function/` (Google Cloud Function code) — if you're fully committing to Apps Script.
- The GitHub Actions workflow `.github/workflows/deploy-orders-function.yml` — if not using GCF.

**Rationale:** Reduces repository clutter; you're using Apps Script, not GCF.

**Keep if:**
- You might switch back to GCF later.
- You want a fallback option.

---

## Testing Plan

### Test 1: Verify Apps Script Handler (Before Frontend Test)
```bash
# After deploying doPost() handler
curl -sS -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "auth=orders-secret-elhaj-2025" \
  --data-urlencode 'payload={"entityType":"company","email":"test@example.com","budget":"10k-25k","contactMethod":"email"}' \
  "https://script.google.com/macros/s/AKfycbw_s70imhwUscY_kyrVEeF6wFlyC9hRapmFGcDH4ugSAZ4QHQLtTAqzObueySDvo7Ha/exec"
```

**Expected response:**
```json
{"ok":true}
```

**Actual (current):**
```html
Script-Funktion nicht gefunden: doPost
```

---

### Test 2: Verify Sheet Update
- After successful curl test, check your Google Sheet.
- A new row should appear in the "orders" tab with the test data.
- Expected time: **< 1 second**.

---

### Test 3: End-to-End from Frontend
1. Open `http://localhost:3000/eurosource/en` (dev server running).
2. Fill out the contact form.
3. Submit.
4. Verify:
   - UI shows "Success!" message.
   - Check the sheet immediately (< 5 seconds).
   - A new row should appear with your form data.

---

## Success Criteria

✅ When complete:
1. Apps Script `doPost()` deployed and running.
2. Direct POST (curl) to endpoint returns `{"ok":true}`.
3. Data appears in sheet within seconds of submission.
4. Frontend shows success message.
5. Sheet has new row matching the submitted form fields.

❌ Current status:
- Only #4 is true (UI shows success).
- #1–3 fail (no handler, no data processed, sheet empty).

---

## Timeline

| Step | Effort | Time |
|------|--------|------|
| Add `doPost()` to Apps Script | 5 min | Immediate |
| Deploy new Web App version | 1 min | Immediate |
| Verify with curl | 1 min | Immediate |
| Test from frontend | 2 min | Immediate |
| Check sheet for data | 1 min | < 5 seconds |
| **(Total)** | **10 min** | **< 10 min** |

---

## Key Takeaways

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| No sheet updates | Missing `doPost()` handler | Deploy doPost() function |
| False success UI | no-cors hides errors | Deploy doPost() first; optional: add client logging |
| Unknown sheet tab | Unclear if "orders" exists | Auto-create in handler or pre-create manually |
| No error feedback | Opaque responses | Deploy doPost() to confirm success |
| Unused backend code | GCF path abandoned | Optional: delete `backend/orders-function/` |

---

## Next Steps

1. **You:** Deploy the `doPost()` handler to your Apps Script.
2. **You:** Re-deploy the Web App (new deployment version).
3. **You:** Run the curl test above to verify.
4. **You:** Check your sheet for the test row.
5. **Me:** Re-run end-to-end test from frontend once #2 is done.

---

**Questions?** Reach out once you've deployed the Apps Script handler, and I'll verify the full pipeline works.
