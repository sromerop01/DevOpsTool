// Genera data/seed.js a partir de los JSON de data/.
// seed.js carga los datos iniciales con un <script>, que sí funciona al abrir index.html con
// doble clic (file://); ahí el navegador bloquea leer los JSON con fetch.
// Uso: node .github/scripts/build-seed.js   (validate-data.js revisa que esté al día)
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const COLLECTIONS = ["categories", "tools", "practices", "usages"];
const HEADER = `/*
 * Initial data of the simulated database, generated from data/*.json.
 * It is a script so the system also works when index.html is opened with a double click.
 * Do not edit it by hand: change the JSON files and run node .github/scripts/build-seed.js
 */
`;

function renderSeed(root) {
  const seed = {};
  for (const name of COLLECTIONS) {
    seed[name] = JSON.parse(fs.readFileSync(path.join(root, "data", `${name}.json`), "utf8"));
  }
  const json = JSON.stringify(seed, null, 2);
  // The version changes with the content, so db.js knows when to add new initial records.
  const version = crypto.createHash("sha1").update(json).digest("hex").slice(0, 12);
  return `${HEADER}window.DB_SEED_VERSION = "${version}";\nwindow.DB_SEED = ${json};\n`;
}

module.exports = { renderSeed };

if (require.main === module) {
  const root = process.cwd();
  fs.writeFileSync(path.join(root, "data", "seed.js"), renderSeed(root));
  console.log("data/seed.js generado.");
}
