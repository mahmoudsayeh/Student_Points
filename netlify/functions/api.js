// Wraps the same Express app used for local dev (`node server.js`) so it runs as a
// single Netlify Function. All /api/* requests are routed here — see ../../netlify.toml.
import serverless from "serverless-http";
import { app } from "../../server.js";

const expressHandler = serverless(app, {
  // File uploads (Excel/CSV import) arrive as multipart/form-data — Netlify's Lambda-style
  // runtime base64-encodes binary bodies, so this content type must be explicitly unwrapped
  // or multer/XLSX will receive corrupted data.
  binary: ["multipart/form-data"],
});

export const handler = async (event, context) => {
  // Netlify invokes this function at /.netlify/functions/api/<rest-of-path>. Express's own
  // routes are defined as /api/<rest-of-path> (same as local dev), so rewrite the path back
  // before handing it to Express — otherwise every route 404s.
  const rewrittenPath = event.path.replace(/^\/\.netlify\/functions\/api/, "/api") || "/api";
  return expressHandler({ ...event, path: rewrittenPath }, context);
};
