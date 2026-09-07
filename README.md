# 🔨 Ferretería Los Maestros

Proyecto web desarrollado para la asignatura **Desarrollo Fullstack II (DSY1104)**.

**Ferretería Los Maestros** es una aplicación web orientada a una tienda de herramientas y materiales de construcción. Permite visualizar productos, utilizar un carrito de compras, registrar usuarios, iniciar sesión y acceder a distintas funcionalidades según el rol.

## 👥 Equipo de desarrollo

- Emilia Gallardo
- Vicente Ponce
- Vicente Céspedes

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- LocalStorage
- SessionStorage
- Git
- GitHub

## 🌐 Funcionalidades principales

### 🏠 Página principal

Incluye:

- Navegación entre las principales secciones.
- Productos destacados.
- Información de la ferretería.
- Consejos y novedades.
- Formulario de contacto.
- Acceso al carrito.
- Inicio y cierre de sesión.

### 🛒 Catálogo y carrito

El usuario puede:

- Visualizar productos.
- Consultar sus detalles.
- Agregar productos al carrito.
- Modificar cantidades.
- Eliminar productos.
- Mantener el carrito al navegar entre páginas.
- Continuar al proceso de checkout.

El carrito utiliza **LocalStorage** para conservar la información.

### 👤 Registro de usuarios

El formulario de registro incluye validaciones mediante JavaScript para:

- RUN y dígito verificador.
- Nombre.
- Apellidos.
- Correo electrónico.
- Contraseña y confirmación.
- Tipo de usuario.
- Región.
- Comuna.
- Dirección.

Las comunas se actualizan dinámicamente según la región seleccionada.

### 🔐 Inicio de sesión

El sistema permite iniciar sesión utilizando correo electrónico y contraseña.

Se utilizan:

- **LocalStorage** para sesiones persistentes.
- **SessionStorage** para sesiones temporales.

Se diferencian los roles de **Cliente** y **Administrador**.

### ⚙️ Administración

El administrador dispone de un panel para gestionar información del sistema, incluyendo productos y usuarios.

### 📰 Consejos y novedades

Actualmente se incluyen:

- **Cómo elegir el taladro correcto**
- **Medidas de seguridad en altura**

Estas páginas mantienen el carrito y la sesión del usuario durante la navegación.

## 📁 Estructura general

```text
Ferreter-a-Los-Maestros-/
│
├── index.html
├── catalogo.html
├── detalle.html
├── checkout.html
├── login.html
├── registro.html
├── admin.html
├── consejos.html
├── consejo-taladro.html
│
├── css/
├── js/
└── img/
