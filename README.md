# Tienda Frontera - Web Page

## Descripción

Este proyecto es una tienda en línea enfocada en la venta de productos traídos de la frontera Costa Rica - Panamá.
Está desarrollada con tecnologías web básicas: HTML, CSS y JavaScript, con una estructura modular que facilita su escalabilidad y mantenimiento.

---

## Estructura del proyecto

Mantener una estructura clara y ordenada ayuda a escalar y mantener el proyecto sin dolores de cabeza.

```
/webpage-frontera
├── /css
│   └── /style.css                # Estilos generales de la pagina.
├── /img
│   └── (Imagenes de productos)
├── /js
│   ├── cart.js                   # Logica del carrito de compras.
│   ├── checkout.js               # Funcionalidad del proceso de pago.
│   ├── contact.js                # Logica de la pagina de contacto.
│   ├── data.js                   # Manejo de productos.
│   ├── formatter.js              # Formateadores (ej. moneda).
│   ├── main.js                   # Scripts generales y funciones comunes.
│   └── toast.js                  # Funciones para mostrar notificaciones tipo toast.
├── cart.html                     # Pagina del carrito.
├── checkout.html                 # Pagina de checkout.
├── contact.html                  # Pagina de contacto.
├── index.html                    # Pagina principal / landing.
├── products.html                 # Pagina de listado de productos.
└── README.md                     # Documentacion del proyecto.
```


---

## Buenas prácticas adoptadas

- Uso de **nombres en inglés y claros** para archivos y variables, facilitando la colaboración internacional.
- Separación por **responsabilidades**:  
  - CSS para estilos.
  - JS para lógica específica (productos, carrito, checkout, etc.).
  - HTML para estructura y contenido.
- Modularización del código para facilitar mantenimiento y escalabilidad.
- Documentación clara en `README.md` para cualquier nuevo desarrollador o usuario.
- Uso recomendado de control de versiones (Git) para gestión del código.

---

## Descripción de carpetas y archivos clave

### /css/

Contiene los archivos de estilos. Actualmente `style.css` es el archivo principal, donde se definen colores, tipografías, layout, y estilos generales.

### /img/

Contiene imágenes usadas en la web, principalmente de los productos.

### /js/

Contiene scripts JavaScript, divididos según funcionalidad:

- `products.js`: Carga y gestión de productos (catálogo).
- `cart.js`: Manejo del carrito de compras (agregar, actualizar, eliminar productos).
- `checkout.js`: Funciones relacionadas con la página de pago y validaciones.
- `contact.js`: Logiva y validaciones para la pagina de contacto.
- `main.js`: Funciones generales y scripts que impactan todo el sitio (como menú, modales, etc.).
- `toast.js`: Funciones para mostrar notificaciones tipo toast.
- `formatter.js`: Funciones para formatear valores como moneda.

### /pages/

HTML de las distintas páginas que componen el sitio.

- `index.html`: Página principal con productos destacados.
- `products.html`: Listado completo de productos.
- `cart.html`: Vista y manejo del carrito de compras.
- `checkout.html`: Pagina de pago.
- `contact.html`: Página de contacto.

---

## Recomendaciones para el desarrollo

- Mantener las funciones JavaScript en archivos separados según su responsabilidad.
- Utilizar ES6 Modules (import/export) para mantener el código organizado (si se incorpora un bundler como Vite o Webpack en el futuro).
- Usar un preprocesador CSS (SASS/SCSS) si el CSS crece mucho.
- Implementar control de versiones con Git y buenas prácticas de commits claros.
- Documentar funciones complejas con comentarios para facilitar mantenimiento.

---

## Cómo correr el proyecto localmente

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/webpage-frontera.git
cd webpage-frontera
```

2. Abrir cualquier archivo `.html` en un navegador moderno (Chrome, Firefox, Edge).

3. ***(Opcional)*** Para desarrillo avanzado, usar un servidor local (Live Server de VSCode o `python -m http.server`).

---

## Futuras mejoras

- Optimizar carga de imagenes y scripts para mejorar rendimiento.
- Implementar formularios con validaciones robustas.
- Añadir autenticacion de usuario y persistencia en el carrito.
- Integrar metodos de pago reales en checkout.

---