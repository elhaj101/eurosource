import { handler as app } from './index.js';

const port = process.env.PORT || 8080;
if (!app || typeof app.listen !== 'function') {
  console.error('Failed to import Express app from index.js');
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Local Orders Function listening on http://localhost:${port}`);
});
