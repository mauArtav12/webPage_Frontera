# webPage_Frontera

## Estructura recomendada para un proyecto de página web

Una buena estructura de carpetas ayuda a mantener tu proyecto organizado, fácil de escalar y mantener.

### 📁 Estructura básica (HTML, CSS, JS)

```
/webpage-frontera
├── /css
│   └── /style.css
├── /img
│   └── (Imagenes Productos)
├── /js
│   ├── cart.js
│   ├── main.js
│   └── products.js
├── pages
│   ├── cart.html
│   ├── checkout.html
│   ├── contact.html
│   ├── index.html
│   └── products.html
└── README.md
```

### ✅ Buenas prácticas

- Usa **nombres claros y en inglés**
- Agrupa archivos por tipo o funcionalidad
- Separa responsabilidades: lógica, UI, estilos, assets
- Incluye un `README.md` con instrucciones claras
- Usa control de versiones (`git`)

---

### 📄 index.html

Archivo principal de la página. Es la entrada del sitio y contiene la estructura base (HTML).  
Aquí se enlazan el CSS, JS y otros archivos necesarios.

---

### 📁 /assets/

Carpeta que contiene recursos estáticos **no relacionados directamente con el código**, pero que se usan en la web.

- `/images/`: Imágenes como `.png`, `.jpg`, `.svg`, etc.
- `/fonts/`: Fuentes personalizadas en `.woff`, `.ttf`, etc.
- `/icons/`: Íconos del diseño, generalmente en `.svg` o `.png`.

---

### 📁 /css/

Aquí van los archivos de estilos.

- `styles.css`: Archivo principal para definir cómo se ve tu sitio (colores, tipografías, márgenes, etc.).

Puedes crear más archivos si separas los estilos por componentes o secciones.

---

### 📁 /js/

Contiene los archivos JavaScript que manejan la lógica del sitio.

- `scripts.js`: Archivo principal para interacciones, validaciones, menús, etc.

---

### 📁 /lib/

Contiene **librerías externas** (de terceros) como:

- jQuery
- Bootstrap
- Swiper, etc.

No deberías modificar estos archivos, solo usarlos.

---

### 📁 /components/

Útil si usas fragmentos HTML reutilizables, como:

- `header.html`
- `footer.html`
- `navbar.html`

Ideal para mantener el código limpio y modular, especialmente con herramientas como templating engines o frameworks.

---

### 📄 README.md

Archivo de texto donde explicas cómo instalar, correr y usar tu proyecto.

Incluye:
- Descripción del proyecto
- Instrucciones de instalación
- Cómo colaborar o contribuir

---