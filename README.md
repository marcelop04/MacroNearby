# MacroNearby

Este proyecto es una aplicación React creada con Vite.

## Requisitos previos

- Node.js instalado (recomendado Node 18 o superior)
- npm disponible en el sistema

## Instalación

1. Abre una terminal en la carpeta del proyecto:
   ```powershell
   cd c:\Users\usuario\Documents\GitHub\CervixAI-Clinical\MacroNearby
   ```
2. Instala las dependencias:
   ```powershell
   npm install
   ```

## Ejecución en modo desarrollo

Inicia el servidor de desarrollo:

```powershell
npm run dev
```

Luego abre el navegador en la URL que muestre Vite, normalmente:

```text
http://localhost:5173/
```

## Construcción para producción

Para generar la versión de producción:

```powershell
npm run build
```

## Previsualizar la versión de producción

Después de construir, puedes previsualizar el resultado con:

```powershell
npm run preview
```

## Comandos útiles

- `npm run dev` - ejecuta el servidor de desarrollo con recarga en caliente
- `npm run build` - crea los archivos optimizados de producción
- `npm run preview` - sirve la versión construida localmente
- `npm run lint` - revisa el código con ESLint

## Estructura clave

- `src/main.jsx` - punto de entrada de la aplicación
- `src/App.jsx` - componente principal
- `src/components/` - componentes React usados en la app
- `vite.config.js` - configuración de Vite
- `package.json` - dependencias y scripts del proyecto
