# CLAUDE.md — Supletorio CI/CD · Herramientas DevOps

Guía para cualquier asistente de IA (Claude Code, Copilot u otro) que trabaje en este proyecto. Léela completa antes de empezar una tarjeta.

## El proyecto

- Proyecto supletorio del curso **Integración y Despliegue Continuo** (Universidad Nacional de Colombia, Sede Medellín), hecho por Santiago Romero Porras y calificado por el profesor del curso. Vale el 40% de la nota y se entrega el **24 de noviembre de 2026** en MinasLap.
- Es un sistema web en HTML5, CSS y JSON que usa el **localStorage de Chrome** como base de datos simulada. Un DevOps Engineer registra y actualiza:
  - **herramientas DevOps**: nombre, logo, descripción, modelo de precio y categoría según la Tabla Periódica de herramientas DevOps del curso (pres05, diapositivas 9 y 10);
  - **prácticas**: nombre, descripción e imagen de su diagrama Essence;
  - **usos** de cada herramienta en cada práctica, descritos en términos de cultura DevOps.
- Lo que exige el enunciado:
  - `index.html` es el esquema preconceptual de todo el sistema, y cada relación dinámica lleva a la interfaz que la resuelve.
  - Los JSON tienen la misma estructura que la base de datos simulada en localStorage.
  - La base de datos incluye todas las herramientas de las presentaciones "Test automation" (partes 1 y 2) y "Continuous deployment and continuous delivery strategies" (partes 1 y 2), y todos los diagramas Essence del curso.
  - Se entregan las tarjetas de Trello, los archivos HTML5, CSS y JSON, y la información adicional que necesite el sistema (por ejemplo, los logos).
- Condiciones de la entrega:
  - Todo se sube a MinasLap como archivos, sin enlaces a GitHub, Drive ni Trello, porque esos enlaces no quedan guardados. Se puede dividir en varios archivos para que ninguno quede muy pesado.
  - El sistema debe funcionar con doble clic en `index.html`, en un navegador normal, sin servidor ni repositorio.
  - La base de datos trae usos de ejemplo de cada práctica: qué herramientas se cruzan con su diagrama Essence y cómo se usan.
- Planeación: https://trello.com/b/kAskEgU0/supletorio-ci-cd-herramientas-devops. Cada tarjeta tiene su descripción, el checklist "Criterios de aceptación" y, en los comentarios, el prompt para la IA.
- El proyecto se construye tarjeta por tarjeta (01 a 14). Si un archivo que menciona esta guía todavía no existe, lo crea la tarjeta indicada: no lo adelantes.

## El esquema preconceptual manda

Fuente: `docs/esquema-preconceptual.drawio` y su exportación `docs/esquema-preconceptual.svg`. Si una tarjeta contradice el esquema, avisa antes de seguir.

- Conceptos: DEVOPS ENGINEER, CATEGORY, DEVOPS TOOL y PRACTICE (azules) y USAGE (verde).
- Relaciones estructurales (HAS):
  - CATEGORY HAS NAME y DEVOPS TOOL.
  - DEVOPS TOOL HAS NAME, LOGO, PRICING MODEL, DESCRIPTION y USAGE.
  - PRACTICE HAS NAME, IMAGE, DESCRIPTION y USAGE.
  - USAGE HAS DESCRIPTION.
- Notas: las 14 categorías (en el NAME de CATEGORY) y los 5 modelos de precio (en PRICING MODEL).
- Relaciones dinámicas (óvalos amarillos punteados) y su página:

| Relación | Página | Tarjeta |
|---|---|---|
| REGISTERS DEVOPS TOOL | `register-tool.html` | 06 |
| UPDATES DEVOPS TOOL | `update-tool.html` | 07 |
| REGISTERS PRACTICE | `register-practice.html` | 08 |
| UPDATES PRACTICE | `update-practice.html` | 09 |
| REGISTERS USAGE | `register-usage.html` | 10 |
| UPDATES USAGE | `update-usage.html` | 11 |

- Conceptos con lista: DEVOPS TOOL, USAGE y PRACTICE también son enlaces, a la lista de lo registrado. Los demás elementos del esquema no son enlaces.

| Concepto | Página | Tarjeta |
|---|---|---|
| DEVOPS TOOL | `tools.html` | 13 |
| USAGE | `usages.html` | 13 |
| PRACTICE | `practices.html` | 13 |

## Stack y reglas generales

- Sitio estático: HTML5, CSS y JavaScript plano. Sin frameworks, librerías, compilación ni fuentes externas.
- Scripts clásicos con `defer` (no módulos ES). Cada página carga `data/seed.js`, `js/db.js`, su formulario (`js/*-form.js`) si lo usa y su propio script.
- Textos de la interfaz en **inglés**, como el enunciado y el esquema. Las tarjetas dan los textos exactos: no los cambies.
- Todo debe funcionar abriendo `index.html` con doble clic (`file://`). Ahí el navegador bloquea `fetch` a archivos locales, así que ninguna página usa `fetch`: los datos iniciales llegan con un `<script>` desde `data/seed.js`. Live Server o `python3 -m http.server` también sirven, pero no hacen falta.
- Navegador objetivo: Chrome, de 320px a 1440px de ancho, sin scroll horizontal en la página.
- No cambies archivos fuera del alcance de la tarjeta. Si hace falta, propónlo primero.

## Estructura

```
index.html               esquema preconceptual en línea + barra "Data" (tarjetas 01 y 02)
register-tool.html       REGISTERS DEVOPS TOOL (06)
update-tool.html         UPDATES DEVOPS TOOL (07)
register-practice.html   REGISTERS PRACTICE (08)
update-practice.html     UPDATES PRACTICE (09)
register-usage.html      REGISTERS USAGE (10)
update-usage.html        UPDATES USAGE (11)
tools.html               lista de DEVOPS TOOL, por categoría (13)
usages.html              lista de USAGE, por práctica (13)
practices.html           lista de PRACTICE (13)
css/styles.css           estilo compartido (03)
js/db.js                 base de datos simulada (02)
js/tool-form.js          formulario de herramientas (06)
js/practice-form.js      formulario de prácticas (08)
js/usage-form.js         formulario de usos (10)
data/categories.json     las 14 categorías del curso (02 y 04)
data/tools.json          las 97 herramientas de las diapositivas (04)
data/practices.json      prácticas con sus diagramas Essence (05)
data/usages.json         31 usos de ejemplo, al menos 3 por práctica (12)
data/seed.js             los cuatro JSON en un script, que es lo que carga el navegador (generado)
assets/logos/            logos de las herramientas iniciales (04)
assets/essence/          diagramas de las prácticas iniciales (05)
docs/                    esquema (.drawio y .svg), style-guide.html y notas de los datos
README.md                cómo abrir y usar el proyecto (14)
.gitignore               archivos que no van al repositorio
.github/workflows/ci.yml          CI en GitHub Actions: HTML, sintaxis de js/ y datos
.github/scripts/validate-data.js  validación de data/ que corre el CI
.github/scripts/build-seed.js     genera data/seed.js a partir de los JSON
```

## Datos

Cada concepto tiene una clave de localStorage y un JSON en `data/` con el mismo contenido: un arreglo de registros.

| Clave | Archivo | Campos |
|---|---|---|
| `devops.categories` | `data/categories.json` | `id`, `name`, `color` |
| `devops.tools` | `data/tools.json` | `id`, `name`, `logo`, `description`, `pricingModel`, `categoryId` |
| `devops.practices` | `data/practices.json` | `id`, `name`, `description`, `image` |
| `devops.usages` | `data/usages.json` | `id`, `toolId`, `practiceId`, `description` |

- `categoryId` sale de CATEGORY HAS DEVOPS TOOL; `toolId` y `practiceId`, de DEVOPS TOOL HAS USAGE y PRACTICE HAS USAGE.
- `data/seed.js` define `window.DB_SEED` con el contenido de los cuatro JSON, porque con doble clic el navegador no deja leer los JSON. No se edita a mano: después de cambiar un JSON, corre `node .github/scripts/build-seed.js`. `validate-data.js` falla si no coincide con los JSON.
- Ejemplo de herramienta:
  `{"id": "jenkins", "name": "Jenkins", "logo": "assets/logos/jenkins.svg", "description": "Open-source automation server that builds, tests and deploys software through pipelines.", "pricingModel": "OS", "categoryId": "continuous-integration"}`
- `id`: en los datos iniciales, el nombre en minúsculas con guiones (`github-actions`). Los registros nuevos reciben de `DB.add` un prefijo (`category-`, `tool-`, `practice-` o `usage-`) + `Date.now().toString(36)` + 4 caracteres aleatorios.
- Imágenes: en los datos iniciales, `logo` e `image` son rutas a `assets/`. Las que se suben desde un formulario se guardan en base64 dentro del registro, porque el navegador no puede crear archivos: los logos a 128 × 128 px en PNG y los diagramas Essence a máximo 1200 px de ancho en WebP (calidad 0.85). Las dos formas sirven como `src` de `<img>`.
- Reglas que aplica cada formulario (no `db.js`):
  - Los nombres de herramientas y de prácticas no se repiten, sin importar mayúsculas ni espacios al inicio y al final.
  - Una herramienta tiene un solo uso por práctica.
  - Descripciones de máximo 300 caracteres en herramientas y prácticas, y de 600 en usos.
  - Al actualizar, el `id` nunca cambia, y si no se sube una imagen nueva se conserva la actual.

### Categorías (`data/categories.json`, en este orden)

Son las 14 categorías del esquema preconceptual del profesor (pres05, diapositiva 9), en su orden.

| id | name | color |
|---|---|---|
| source-control-management | Source Control Management | #E8524A |
| database-automation | Database Automation | #1E88E5 |
| continuous-integration | Continuous Integration | #455A64 |
| testing | Testing | #A57CF0 |
| configuration | Configuration | #66BB6A |
| deployment | Deployment | #A63D7B |
| containers | Containers | #263238 |
| release-orchestration | Release Orchestration | #26A69A |
| cloud | Cloud | #1A4E7A |
| aiops | AIOps | #F2C14E |
| analytics | Analytics | #78909C |
| monitoring | Monitoring | #D9822B |
| security | Security | #4FC3F7 |
| collaboration | Collaboration | #6A3FC8 |

### Herramientas iniciales (`data/tools.json`)

Son las 97 herramientas de las diapositivas de categoría: pres05, diapositivas 11 y 12 (Testing); pres06 parte inicial, diapositivas 7 a 11 (Monitoring, AIOps y Analytics); y pres06 parte final, diapositivas 3, 7, 8, 10, 11, 14 y 15 (Cloud, Continuous Integration, Containers y Configuration). La categoría de cada herramienta es la de la diapositiva donde aparece. Shopify, Mailjet y Force.com no se incluyen: solo son ejemplos del dibujo de SaaS/PaaS/IaaS. El detalle está en `docs/tools-notes.md`.

### Usos iniciales (`data/usages.json`)

Son 31 usos de ejemplo: tres por práctica y cuatro en la de monitoreo continuo. Cada uno cruza una herramienta con las actividades y productos de trabajo del diagrama Essence de la práctica, y describe en inglés (máximo 600 caracteres) cómo se usa en términos de cultura DevOps. El `id` es `<toolId>-in-<practiceId>`.

### Modelos de precio (lista fija en `db.js`)

Las celdas de la tabla del curso traen el código del modelo de precio (OS, FR, FM, PA o EN), el mismo de `DB.PRICING_MODELS`. Las herramientas que aparecen sin celda en las diapositivas toman el modelo de precio de su sitio oficial.

```js
DB.PRICING_MODELS = [
  { code: "OS", label: "Open source" },
  { code: "FR", label: "Free" },
  { code: "FM", label: "Freemium" },
  { code: "PA", label: "Paid" },
  { code: "EN", label: "Enterprise" }
];
```

## API de `js/db.js` (`window.DB`)

`collection` es `"categories"`, `"tools"`, `"practices"` o `"usages"`. Las páginas nunca leen ni escriben localStorage directamente: siempre usan `DB`.

- `DB.ready`: promesa que se resuelve cuando las cuatro claves existen. Si falta una, o su valor no es JSON válido, la carga desde `window.DB_SEED` (`data/seed.js`). Si `window.DB_SEED_VERSION` es distinta de la guardada en `devops.seedVersion`, agrega los registros iniciales que falten (por `id`; un uso no se agrega si su herramienta ya tiene uno en esa práctica) sin tocar lo que el usuario registró o editó.
- `DB.getAll(collection)`: copia del arreglo.
- `DB.getById(collection, id)`: el registro o `null`.
- `DB.add(collection, record)`: asigna el `id` si no lo trae, guarda y devuelve el registro.
- `DB.update(collection, id, changes)`: mezcla los cambios, guarda y devuelve el registro. Si el `id` no existe, lanza un `Error`.
- `DB.download(collection)`: descarga `<collection>.json` con el contenido actual, con sangría de 2 espacios.
- `DB.reset()`: borra las cuatro claves y las vuelve a cargar desde `data/seed.js`.
- `DB.PRICING_MODELS`: la lista de arriba.
- `DB.add` y `DB.update` pueden lanzar `QuotaExceededError` si el navegador se queda sin espacio.

## Formularios reutilizables

`window.ToolForm`, `window.PracticeForm` y `window.UsageForm` (en `js/tool-form.js`, `js/practice-form.js` y `js/usage-form.js`) exponen `mount(container, options)`:

- `options = { mode: "create" | "edit", tool | practice | usage (solo en "edit"), onSaved(record), onCancel() }`.
- En `"create"`: el botón es "Save tool", "Save practice" o "Save usage", y el formulario queda limpio después de guardar.
- En `"edit"`: los botones son "Save changes" y "Cancel"; la imagen es opcional, y las reglas de nombre o par repetido no cuentan el registro que se edita.

## Páginas

- Título de la pestaña: "<Acción o lista> · DevOps tools and practices" (por ejemplo, "Register DevOps tool · DevOps tools and practices" o "Registered DevOps tools · DevOps tools and practices").
- Encabezado: enlace `.back-link` "← Pre-conceptual schema" a `index.html`; la tríada del esquema (`.triad`: DEVOPS ENGINEER → relación → concepto, con `.triad__concept--usage` para USAGE); y el `h1`.
- Páginas de actualizar:
  - Tabla `.record-table` con caption oculto visualmente y un botón "Edit" por fila, con `aria-label`. En móvil, la tabla puede tener scroll horizontal dentro de su contenedor.
  - "Edit" oculta la tabla, monta el formulario en modo `"edit"` y cambia la dirección a `?id=<id>` con `history.pushState`.
  - "Cancel", guardar y el botón Atrás del navegador (`popstate`) vuelven a la tabla y quitan el `?id=`.
  - Abrir la página con `?id=<id>` abre ese registro. Si no existe, se muestra el mensaje de la tarjeta y la tabla.
  - Al volver a la tabla, el foco va al botón "Edit" del registro editado.
- Páginas de lista (`tools.html`, `usages.html` y `practices.html`):
  - Solo lectura. En el encabezado va solo el recuadro del concepto (`.triad` con un `.triad__concept`), porque no hay relación.
  - Filtros encima de la lista; debajo, el conteo `.list-count` con `aria-live="polite"` ("97 tools registered." o "1 of 97 tools match the filters.").
  - La lista es `.record-list` con `role="list"`. Las herramientas van en un `.record-group` por categoría, en el orden de `categories.json`, y los usos en uno por práctica, por nombre.
  - Sin registros: el estado vacío con el enlace a su página de registrar.
- Mensajes comunes:
  - Si `DB.ready` falla (con `role="alert"`, en lugar del contenido): "Could not load the initial data. Keep the data and js folders next to index.html and open the page again."
  - Si el navegador se queda sin espacio (con `role="alert"`, sin borrar el formulario): "The browser storage is full. Use a smaller image or restore the initial data."

## Estilos (`css/styles.css`)

- Variables:
  `--concept: #1BA1E2; --concept-strong: #006EAF; --usage: #97D077; --relation: #FFFF00; --attribute: #A6A6A6; --bg: #FFFFFF; --text: #1F2933; --muted: #52606D; --error: #C62828; --success: #2E7D32; --focus: #006EAF;`
- Tipografía: Helvetica, Arial, sans-serif. Texto de 16px con interlineado 1.5, etiquetas de 14px y `h1` de 28px.
- Clases: `.page`, `.back-link`, `.triad`, `.triad__concept`, `.triad__concept--usage`, `.triad__relation`, `.triad__arrow`, `.form`, `.field`, `.field__label`, `.field__required`, `.field__hint`, `.field__error`, `.input`, `.image-preview`, `.actions`, `.btn`, `.btn--primary`, `.btn--secondary`, `.notice`, `.notice--success`, `.notice--error`, `.empty-state`, `.record-table`, `.list-count`, `.record-group`, `.record-group__title`, `.record-list` (con `__item`, `__logo`, `__body`, `__name`, `__meta`, `__text` y `__diagram`), `.category-badge` (con la variable `--badge-color`) y `.visually-hidden`.
- Ningún texto usa #1BA1E2 sobre blanco, porque no llega a 4.5:1 de contraste: texto y enlaces van en #006EAF.
- Sin sombras ni estilos en línea. Radio de 4px en campos y botones; los recuadros de concepto van sin radio, como en el esquema.
- Si falta una clase, agrégala a `styles.css` sin cambiar las que ya existen.

## Accesibilidad

- Cada campo tiene `<label for>`, "(required)" en la etiqueta de los obligatorios y `aria-describedby` hacia su ayuda y su error. Con error: `aria-invalid="true"` y un texto, no solo color.
- La validación corre al enviar y al salir de cada campo, y el error se borra cuando el campo se corrige. Al enviar con errores, el foco va al primer campo con error.
- Mensajes de guardado con `role="status"`; errores generales con `role="alert"`.
- Foco visible: `outline` de 3px `var(--focus)` con offset de 2px. Campos y botones de al menos 44px de alto.
- Con `prefers-reduced-motion: reduce`, sin transiciones.

## Git

Git Flow: `main` y `develop` son permanentes. Cada tarjeta se trabaja en una rama `feature/<nombre>` creada desde `develop`, sin el número de la tarjeta en el nombre; la entrega va en `release/*` y las correcciones urgentes en `hotfix/*`. Cada prompt indica su rama.

CI: cada push y pull request a `main` y `develop` corre `.github/workflows/ci.yml` (htmlhint, `node --check` de `js/*.js` y `node .github/scripts/validate-data.js`). Antes de hacer commit de cambios en `data/` o `assets/`, corre `node .github/scripts/build-seed.js` y `node .github/scripts/validate-data.js`, y corrige lo que marque.

## Cómo trabajar una tarjeta

1. Lee la descripción, el checklist y el prompt de la tarjeta.
2. Si algo choca con esta guía o con el esquema, pregunta antes de seguir.
3. Haz solo lo que pide la tarjeta.
4. Verifica. Si puedes abrir el proyecto en un navegador (con doble clic en `index.html`), haz las pruebas que pide el prompt y di qué revisaste. Si no puedes, no lo des por revisado: entrega la lista de pruebas para que Santiago las haga.
