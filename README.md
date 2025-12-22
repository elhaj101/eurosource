# Eurosource

A Next.js 16 + Tailwind CSS project exported statically for GitHub Pages under base path `/eurosource`. Includes multilingual content via `next-intl` and a contact form wired to an optional Google Cloud Function backend that appends orders to a Google Sheet.

## Tech Stack
- Next.js (App Router, `output: 'export'`)
- Tailwind CSS v4
- next-intl (i18n)
- TypeScript, ESLint, Jest

## Getting Started

### Prerequisites
- Node.js 20+
- PNPM (or npm/yarn)

### Install
```bash
pnpm install
```

### Development
- The site uses base path `/eurosource`. In dev, open `http://localhost:3000/eurosource/en` (or any locale: `de`, `ar`, `zh`).
```bash
pnpm dev
```

### Build & Export
```bash
pnpm build
pnpm export
```
Exports to `out/` for GitHub Pages.

## Deploy to GitHub Pages
- Push to `main` and publish the `out/` folder (via actions or manual upload).
- Ensure base path `/eurosource` is configured (already handled in code).

## Backend: Orders → Google Sheets (Optional)
A Google Cloud Function (Gen2) can receive form submissions and append rows to a Google Sheet.

### Function Source
`backend/orders-function/` contains:
- `index.js`: Express handler with CORS + shared-secret auth, appends to Sheets via `googleapis`.
- `package.json`: deps for `express`, `cors`, `googleapis`.
- `.gcloudignore`: excludes dev artifacts on deploy.

### Alternative: Apps Script (No Billing)
If you prefer a no-billing setup, deploy a Google Apps Script Web App attached to your Sheet and set the Web App URL as the endpoint.

Steps:
- In your target Sheet → Extensions → Apps Script → create a new script with a `doPost(e)` handler that appends a row. Use the example below.
- Deploy → New deployment → Type: Web app → Execute as: Me → Who has access: Anyone with the link.
- Copy the Web App URL and set it as `NEXT_PUBLIC_ORDERS_ENDPOINT` in `.env.local`.

Client behavior:
- When `NEXT_PUBLIC_ORDERS_ENDPOINT` matches a Google Apps Script URL, the contact form submits using `application/x-www-form-urlencoded` with `auth` and `payload` fields to avoid CORS preflight.

Example Apps Script (Code.gs):
```javascript
const SHEET_NAME = 'orders';
const SHARED_SECRET = 'orders-secret-elhaj-2025';

function jsonOutput(obj, code) {
	const out = ContentService.createTextOutput(JSON.stringify(obj))
		.setMimeType(ContentService.MimeType.JSON);
	if (code && out.setResponseCode) out.setResponseCode(code);
	return out;
}

function doPost(e) {
	try {
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

		const required = ['entityType', 'email', 'budget', 'contactMethod'];
		const missing = required.filter((k) => !body[k]);
		if (missing.length) return jsonOutput({ error: 'Missing required fields', missing }, 400);

		const now = new Date().toISOString();
		const row = [
			now, body.entityType || '', body.companyName || '', body.country || '',
			body.email || '', body.phone || '', body.productName || '', body.productDetails || '',
			body.budget || '', body.contactMethod || '', body.locale || '', body.userAgent || ''
		];

		const ss = SpreadsheetApp.getActiveSpreadsheet();
		const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
		sheet.appendRow(row);

		return jsonOutput({ ok: true }, 200);
	} catch (err) {
		return jsonOutput({ error: 'Internal error' }, 500);
	}
}
```

### Required GCP Setup
- Enable Cloud Functions (Gen2) and Sheets API in your project.
- Service Account: grant permission to the target Google Sheet (Editor).
- Share the sheet with the service account email.

### Deploy (example)
Replace values with your project and sheet details.
```bash
# From repository root
cd backend/orders-function

# Install deps for function runtime (optional locally)
pnpm install

# Deploy to europe-west3 (Frankfurt)
gcloud functions deploy orders-handler \
	--gen2 \
	--runtime=nodejs20 \
	--region=europe-west3 \
	--source=. \
	--entry-point=handler \
	--trigger-http \
	--allow-unauthenticated \
	--set-env-vars=SPREADSHEET_ID=YOUR_SHEET_ID,SHEET_NAME=orders,SHARED_SECRET=YOUR_SHARED_SECRET
```
Capture the HTTPS URL printed after deploy (e.g. `https://europe-west3-...cloudfunctions.net/orders-handler`).

### Frontend Env
Create `.env.local` in project root:
```
NEXT_PUBLIC_BASEPATH=/eurosource
NEXT_PUBLIC_ORDERS_ENDPOINT=https://<your-function-url>
NEXT_PUBLIC_ORDERS_SHARED_SECRET=<your-shared-secret>
```
Restart dev/build after adding `.env.local`.

### Test Submission
- Open `http://localhost:3000/eurosource/en`
- Submit the contact form.
- Verify a new row appears in your sheet’s `orders` tab.

## Troubleshooting
- 404 or layout error: Ensure `app/layout.tsx` includes `<html>`/`<body>` and dev URL uses `/eurosource/<locale>`.
- Images on Pages: Use `getImagePath` helper; full URLs or basePath-prefixed paths.
- CORS: Function returns standard CORS headers; if you restrict origins, adjust in `index.js`.

## Notes
- Lint warnings (e.g., `next/link` usage) are non-blocking; address incrementally.
- Jest tests for image utils pass; TypeScript checks are clean.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
