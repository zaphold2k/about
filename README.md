# 🚀 Portfolio - Martin Casanovas

Portafolio personal desarrollado con **Tailwind CSS** y **sistema de datos centralizados**. Diseño moderno con estética terminal/código e integración dinámica de GitHub API.

## 📋 Índice

- [🚀 Características Principales](#-características-principales)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [⚡ Inicio Rápido](#-inicio-rápido)
- [📊 Sistema de Datos Centralizados](#-sistema-de-datos-centralizados)
- [🔄 GitHub API Integration](#-github-api-integration)
- [🛡️ Sistema Anti-Spam](#️-sistema-anti-spam)
- [⚙️ Configuración](#️-configuración)
- [🚨 Troubleshooting](#-troubleshooting)
- [📱 Responsive Design](#-responsive-design)
- [🤝 Contribuir](#-contribuir)

## 🚀 Características Principales

### 🎨 **Diseño Moderno**
- **Estética terminal/código** con sintaxis highlighting
- **Animaciones suaves** y efectos hover
- **Responsive design** optimizado para todos los dispositivos
- **Tema oscuro** con colores personalizados
- **Tipografía monospace** (JetBrains Mono)

### 🔄 **Integración Inteligente**
- **GitHub API** con carga dinámica de repositorios
- **Sistema de caché** (15 minutos) con localStorage
- **Rate limiting protection** automático
- **Datos centralizados** en JSON para fácil mantenimiento

### 🛡️ **Seguridad & Performance**
- **Sistema anti-spam** con honeypot y rate limiting
- **Protección contra bots** automatizados
- **Caché inteligente** para mejor rendimiento
- **Fallbacks automáticos** en caso de errores

## 🏗️ Arquitectura del Proyecto

```
portfolio/
├── 📁 data/
│   └── profile.json          # 🎯 Datos centralizados del perfil
├── 📁 js/
│   └── profile.js           # 🔧 Manager y generadores HTML
├── 📁 site/
│   ├── index.html          # 🏠 Landing page
│   ├── about.html          # 📄 Portfolio detallado
│   └── 404.html            # ❌ Página de error
├── 📁 conf/
│   └── nginx.conf          # ⚙️ Configuración Nginx
├── docker-compose.yml      # 🐳 Orquestación
└── README.md              # 📚 Documentación
```

## 📊 Sistema de Datos Centralizados

### 🎯 **Filosofía**
Un solo archivo JSON (`data/profile.json`) contiene toda la información del perfil, eliminando duplicación entre páginas y facilitando el mantenimiento.

### 🔧 **Componentes**

#### **ProfileManager** - Gestor de Datos
```javascript
// Carga automática de datos
await profileManager.loadProfile();

// Acceso a secciones específicas
const personal = profileManager.getPersonal();
const skills = profileManager.getSkills();
const achievements = profileManager.getAchievements();
```

#### **HTMLGenerator** - Generador Dinámico
```javascript
// Generar contenido específico por página
htmlGenerator.generateIndexContact();     // Para index.html
htmlGenerator.generateAboutHeader();      // Para about.html
htmlGenerator.generateSkillBars(skills);  // Barras de progreso
```

### 📝 **Estructura de Datos**
```json
{
  "personal": { "name": "...", "role": "...", "email": "..." },
  "skills": { 
    "devops_cloud": { "Kubernetes": 95, "Docker": 90 },
    "security": { "Blue Team": 90, "Perimeter Security": 85 }
  },
  "bio": { "intro": "...", "passion": "..." },
  "achievements": [...],
  "config": { "github_username": "...", "cache_duration": 900000 }
}
```

### ✅ **Ventajas**
- 🎯 **Mantenimiento centralizado**: Un solo lugar para editar
- 🔄 **Consistencia**: Mismos datos en todas las páginas  
- 📈 **Escalabilidad**: Fácil agregar nuevas páginas
- ⚡ **Performance**: Carga una sola vez

## � GitHub API Integration

### 🎯 **Funcionamiento Inteligente**
1. **Primera carga**: Request a GitHub API → Guardar en localStorage
2. **Cargas posteriores**: Usar caché válido (15 min) → Carga instantánea
3. **Caché expirado**: Verificar rate limit → Request si es posible
4. **Rate limit activo**: Usar caché como fallback
5. **Error de red**: Fallback automático a datos de caché

### �️ **Herramientas de Debug**
```javascript
// Ver información del caché
githubCache.info()
// Output: { "Repos en caché": 6, "Edad": "5 min", "Válido": true }

// Limpiar caché y rate limits
githubCache.clear()

// Forzar recarga
githubCache.reload()
```

### ⚙️ **Configuración**
```javascript
const config = {
  github_username: 'zaphold2k',
  cache_duration: 900000,        // 15 minutos
  rate_limit_interval: 30000     // 30 segundos
}
```

## 🛡️ Sistema Anti-Spam

### 🔒 **Protecciones Implementadas**

#### **Rate Limiting**
- ⏱️ **2 minutos** mínimo entre envíos
- 💾 **localStorage** para recordar último envío
- 📊 **Feedback visual** del tiempo restante

#### **Campo Honeypot**
- 🕳️ **Campo invisible** que solo bots completan
- 🤖 **Detección automática** de comportamiento no humano
- 👻 **Posicionamiento fuera del viewport**

#### **Validación de Contenido**
- 📏 **Longitud**: 10-1000 caracteres
- 🚫 **Filtro spam**: Detecta términos sospechosos
- ✉️ **Email válido**: Formato correcto obligatorio
- 👤 **Nombre válido**: Evita caracteres repetidos

### 🚨 **Términos Spam Detectados**
```javascript
// Financieros: 'bitcoin', 'crypto', 'investment', 'loan'
// Médicos: 'viagra', 'pharmacy', 'pills' 
// Marketing: 'click here', 'urgent', 'winner', 'prize'
```

### 🛠️ **Debug del Sistema**
```javascript
// Ver estado del rate limiting
contactDebug.checkRateLimit()

// Limpiar rate limit para testing
contactDebug.clearRateLimit()

// Probar filtro de spam
contactDebug.testSpamFilter("tu mensaje aquí")
```

## ⚙️ Configuración

### 🎨 **Colores del Tema**
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#00ff88',      // Verde terminal
        secondary: '#0a84ff',    // Azul
        accent: '#ff6b6b',       // Rojo/Rosa
        'code-bg': '#0d1117',    // Fondo código
        'code-border': '#21262d' // Borde código
      }
    }
  }
}
```

### 📱 **Breakpoints Responsive**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### 🔧 **Variables de GitHub API**
```javascript
// En data/profile.json
{
  "config": {
    "github_username": "zaphold2k",
    "projects_count": 6,
    "cache_duration": 900000,    // 15 minutos
    "rate_limit_interval": 30000 // 30 segundos
  }
}
```

## 🚨 Troubleshooting

### ❌ **Problemas Comunes**

#### Rate Limit GitHub API
```javascript
// Limpiar cache manualmente
githubCache.clear()
// O esperar 30 segundos
```

#### Caché Corrupto
```javascript
// Limpiar localStorage
localStorage.removeItem('github_repos_cache')
localStorage.removeItem('github_api_last_request')
```

#### Formulario Anti-Spam Bloqueado
```javascript
// Verificar estado
contactDebug.checkRateLimit()
// Limpiar rate limit
contactDebug.clearRateLimit()
```

#### Falsos Positivos de Spam
```javascript
// Probar contenido específico
contactDebug.testSpamFilter("tu mensaje aquí")
// Editar SPAM_KEYWORDS en about.html si es necesario
```

## � Responsive Design

### 🎯 **Secciones Principales**
1. **🏠 Landing (index.html)**: Presentación minimalista estilo terminal
2. **📄 About (about.html)**: Portfolio completo con proyectos GitHub
3. **❌ 404.html**: Página de error personalizada

### 📱 **Características Móviles**
- Navigation drawer optimizado
- Grid responsive para proyectos
- Tipografía escalable
- Touch-friendly interactions
- Lazy loading para mejor performance

### 🔍 **SEO & Performance**
- **Lighthouse Score**: 95+ Performance, 100 Accessibility
- **Meta tags** apropiados
- **Semantic HTML** estructura
- **CDN** para Tailwind CSS

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crear** feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a branch (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** Pull Request

### 📝 **Cómo Actualizar Información**

Para cambiar datos del perfil:
1. Editar `data/profile.json`
2. Los cambios se reflejan automáticamente en todas las páginas
3. No necesitas tocar HTML individual

## 📞 Contacto & Licencia

**Martin Casanovas** - DevOps Engineer  
📧 casanovas.m@gmail.com  
🐙 [@zaphold2k](https://github.com/zaphold2k)  
🌐 [zaphold.ar](https://zaphold.ar)

**Proyecto**: [https://github.com/zaphold2k/portfolio](https://github.com/zaphold2k/portfolio)  
**Licencia**: GNU GPL v3

---
⭐ **¡Dale una estrella si te ha gustado el proyecto!**
