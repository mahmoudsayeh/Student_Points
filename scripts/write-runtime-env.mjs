// Netlify build step: copy the server's env vars into runtime-env.js so they get bundled into the
// function. This covers env vars whose Netlify scope includes Builds but not Functions.
// Only runs on Netlify, so a local run can never write secrets into the committed file.
import { writeFileSync } from "node:fs";

const NAMES = ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "MANAGE_PASSCODE"];

if (process.env.NETLIFY !== "true") {
  console.log("write-runtime-env: not on Netlify, leaving runtime-env.js untouched.");
  process.exit(0);
}

const values = Object.fromEntries(NAMES.filter((n) => process.env[n]).map((n) => [n, process.env[n]]));
writeFileSync(new URL("../runtime-env.js", import.meta.url), `export default ${JSON.stringify(values)};\n`);

// Names only, never values, so the build log shows what was found without leaking secrets.
for (const n of NAMES) console.log(`write-runtime-env: ${n} ${values[n] ? "found" : "NOT SET"}`);
