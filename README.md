# DevOps tools and practices

Proyecto supletorio del curso **Integración y Despliegue Continuo** (Universidad Nacional de Colombia, Sede Medellín), hecho por Santiago Romero Porras.

Es un sistema web en HTML5, CSS y JSON en el que un DevOps Engineer registra y actualiza herramientas DevOps, prácticas con su diagrama Essence y los usos de cada herramienta en cada práctica. La base de datos es el `localStorage` del navegador.

## Cómo abrirlo

1. Descomprime la carpeta del proyecto.
2. Abre `index.html` con doble clic en Chrome.

No hace falta servidor, internet ni instalar nada. Las carpetas `data/`, `js/`, `css/` y `assets/` deben quedar junto a `index.html`.

## Cómo usarlo

`index.html` es el esquema preconceptual del sistema. Cada elemento enlazado del esquema lleva a su página:

| En el esquema | Página | Qué hace |
|---|---|---|
| REGISTERS → DEVOPS TOOL | `register-tool.html` | Registra una herramienta: nombre, logo, descripción, modelo de precio y categoría. |
| UPDATES → DEVOPS TOOL | `update-tool.html` | Lista las herramientas y edita la elegida. |
| REGISTERS → PRACTICE | `register-practice.html` | Registra una práctica: nombre, descripción y diagrama Essence. |
| UPDATES → PRACTICE | `update-practice.html` | Lista las prácticas y edita la elegida. |
| REGISTERS → USAGE | `register-usage.html` | Registra cómo se usa una herramienta en una práctica. |
| UPDATES → USAGE | `update-usage.html` | Lista los usos, con filtros por herramienta y práctica, y edita el elegido. |
| DEVOPS TOOL | `tools.html` | Herramientas registradas, agrupadas por categoría. |
| USAGE | `usages.html` | Usos registrados, agrupados por práctica. |
| PRACTICE | `practices.html` | Prácticas registradas con su diagrama. |

La barra **Data**, debajo del esquema, descarga el contenido actual de cada colección como JSON (`categories.json`, `tools.json`, `practices.json` y `usages.json`) y tiene el botón **Restore initial data**, que borra lo registrado en el navegador y vuelve a cargar los datos iniciales.

## Datos iniciales

| Archivo | Contenido |
|---|---|
| `data/categories.json` | Las 14 categorías de la Tabla Periódica de herramientas DevOps del curso. |
| `data/tools.json` | Las 97 herramientas de las presentaciones "Test automation" y "Continuous deployment and continuous delivery strategies". |
| `data/practices.json` | Las 10 prácticas del curso con su diagrama Essence (`assets/essence/`). |
| `data/usages.json` | 31 usos de ejemplo: al menos 3 por práctica. |

Los JSON tienen la misma estructura que la base de datos en `localStorage`. El navegador no deja leer archivos JSON cuando la página se abre con doble clic, así que el sistema carga `data/seed.js`, que contiene los cuatro JSON y se genera con `node .github/scripts/build-seed.js`.

Las fuentes de cada herramienta, su categoría y su modelo de precio están en `docs/tools-notes.md`, y las de cada práctica en `docs/practices-notes.md`. El esquema preconceptual está en `docs/esquema-preconceptual.drawio` y su exportación en `docs/esquema-preconceptual.svg`.

## Estructura

```
index.html                 esquema preconceptual y barra Data
register-*.html            páginas para registrar
update-*.html              páginas para actualizar
tools.html, usages.html,   listas de lo registrado
practices.html
css/styles.css             estilos compartidos
js/db.js                   base de datos simulada sobre localStorage
js/*-form.js               formularios de herramientas, prácticas y usos
data/                      datos iniciales (JSON y seed.js)
assets/logos/              logos de las herramientas
assets/essence/            diagramas Essence de las prácticas
docs/                      esquema, guía de estilos y notas de los datos
```

## Integración continua

Cada push y pull request a `main` y `develop` corre `.github/workflows/ci.yml` en GitHub Actions: revisa el HTML con htmlhint, la sintaxis de `js/*.js` con `node --check` y los datos con `node .github/scripts/validate-data.js`, que también comprueba que `data/seed.js` coincida con los JSON.
