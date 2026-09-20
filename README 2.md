# Daily Wellness — PWA

PWA responsive de bienestar íntimo.

## Probar localmente

No abras `index.html` con doble clic: el Service Worker necesita HTTPS o localhost.

Con Python:
```bash
python -m http.server 8080
```
Después abre `http://localhost:8080`.

Con Node:
```bash
npx serve .
```

## Instalar en móvil

Publica esta carpeta en un hosting HTTPS (por ejemplo, un servidor estático). En Android Chrome usa "Instalar app". En iPhone/iPad, abre el sitio en Safari y usa "Añadir a pantalla de inicio".

## Funciones

- Sesión guiada con temporizador.
- Pausa/detener.
- Progreso y racha guardados en localStorage.
- Biblioteca.
- Perfil y modo privado.
- Manifest + Service Worker para instalación y caché básica.

Antes de producción: revisar contenido con profesionales, privacidad, accesibilidad, analítica/consentimiento si se añade, y pruebas en Safari/Chrome.
