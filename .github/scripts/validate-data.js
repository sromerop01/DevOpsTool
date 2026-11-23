// Valida los JSON de data/ (la base de datos inicial): estructura, ids, referencias e imágenes.
// Solo usa módulos de Node, sin dependencias. Las reglas salen de CLAUDE.md ("Datos").
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PRICING_MODELS = ["OS", "FR", "FM", "PA", "EN"];
const errors = [];
const fail = (message) => errors.push(message);

function load(name) {
  const file = `data/${name}.json`;
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
  } catch (error) {
    fail(`${file}: ${error.message}`);
    return [];
  }
  if (!Array.isArray(data)) {
    fail(`${file}: debe ser un arreglo de registros`);
    return [];
  }
  return data;
}

// Campos exactos, todos texto no vacío, e ids únicos. Devuelve el conjunto de ids.
function checkRecords(name, records, fields) {
  const ids = new Set();
  const expected = [...fields].sort().join(", ");
  records.forEach((record, i) => {
    const where = `data/${name}.json[${i}]`;
    const keys = Object.keys(record).sort().join(", ");
    if (keys !== expected) fail(`${where}: tiene los campos ${keys}; se esperaban ${expected}`);
    for (const field of fields) {
      if (typeof record[field] !== "string" || record[field].trim() === "") {
        fail(`${where}: "${field}" está vacío o no es texto`);
      }
    }
    if (ids.has(record.id)) fail(`${where}: el id "${record.id}" está repetido`);
    ids.add(record.id);
  });
  return ids;
}

// Los nombres no se repiten, sin importar mayúsculas ni espacios al inicio y al final.
function checkUniqueNames(name, records) {
  const seen = new Set();
  for (const record of records) {
    const key = String(record.name || "").trim().toLowerCase();
    if (seen.has(key)) fail(`data/${name}.json: el nombre "${record.name}" está repetido`);
    seen.add(key);
  }
}

function checkDescription(where, text, max) {
  if (typeof text === "string" && text.length > max) {
    fail(`${where}: la descripción tiene ${text.length} caracteres (máximo ${max})`);
  }
}

// Las imágenes de los datos iniciales son rutas a assets/; las subidas desde un formulario (base64) no se revisan.
function checkImage(where, ref, maxKB) {
  if (typeof ref !== "string" || ref.startsWith("data:")) return;
  const file = path.join(ROOT, ref);
  if (!fs.existsSync(file)) {
    fail(`${where}: no existe el archivo ${ref}`);
    return;
  }
  const kb = fs.statSync(file).size / 1024;
  if (kb > maxKB) fail(`${where}: ${ref} pesa ${kb.toFixed(1)} KB (máximo ${maxKB} KB)`);
}

const categories = load("categories");
const tools = load("tools");
const practices = load("practices");
const usages = load("usages");

const categoryIds = checkRecords("categories", categories, ["id", "name", "color"]);
categories.forEach((category, i) => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(category.color)) {
    fail(`data/categories.json[${i}]: el color "${category.color}" no tiene el formato #RRGGBB`);
  }
});

const toolIds = checkRecords("tools", tools, ["id", "name", "logo", "description", "pricingModel", "categoryId"]);
checkUniqueNames("tools", tools);
tools.forEach((tool, i) => {
  const where = `data/tools.json[${i}] (${tool.name})`;
  if (!PRICING_MODELS.includes(tool.pricingModel)) {
    fail(`${where}: pricingModel "${tool.pricingModel}" no es ${PRICING_MODELS.join(", ")}`);
  }
  if (!categoryIds.has(tool.categoryId)) {
    fail(`${where}: categoryId "${tool.categoryId}" no existe en categories.json`);
  }
  checkDescription(where, tool.description, 300);
  checkImage(where, tool.logo, 30);
});

const practiceIds = checkRecords("practices", practices, ["id", "name", "description", "image"]);
checkUniqueNames("practices", practices);
practices.forEach((practice, i) => {
  const where = `data/practices.json[${i}] (${practice.name})`;
  checkDescription(where, practice.description, 300);
  checkImage(where, practice.image, 300);
});

checkRecords("usages", usages, ["id", "toolId", "practiceId", "description"]);
const pairs = new Set();
usages.forEach((usage, i) => {
  const where = `data/usages.json[${i}]`;
  if (!toolIds.has(usage.toolId)) fail(`${where}: toolId "${usage.toolId}" no existe en tools.json`);
  if (!practiceIds.has(usage.practiceId)) fail(`${where}: practiceId "${usage.practiceId}" no existe en practices.json`);
  const pair = `${usage.toolId}|${usage.practiceId}`;
  if (pairs.has(pair)) fail(`${where}: ya hay un uso de "${usage.toolId}" en "${usage.practiceId}"`);
  pairs.add(pair);
  checkDescription(where, usage.description, 600);
});

console.log(`categories: ${categories.length} · tools: ${tools.length} · practices: ${practices.length} · usages: ${usages.length}`);
if (errors.length > 0) {
  for (const message of errors) console.log(`::error::${message}`);
  console.log(`${errors.length} error(es) en data/.`);
  process.exit(1);
}
console.log("data/ es válido.");