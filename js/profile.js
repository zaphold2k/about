/**
 * Profile Data Manager
 * Carga y maneja los datos centralizados del perfil
 */
class ProfileManager {
    constructor() {
        this.data = null;
        this.loaded = false;
        this.callbacks = [];
    }

    /**
     * Carga los datos del perfil desde el JSON
     */
    async loadProfile() {
        if (this.loaded) {
            return this.data;
        }

        try {
            const response = await fetch('data/profile.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.data = await response.json();
            this.loaded = true;
            
            // Ejecutar callbacks pendientes
            this.callbacks.forEach(callback => callback(this.data));
            this.callbacks = [];
            
            return this.data;
        } catch (error) {
            console.error('Error loading profile data:', error);
            throw error;
        }
    }

    /**
     * Obtiene los datos del perfil (carga si es necesario)
     */
    async getProfile() {
        if (this.loaded) {
            return this.data;
        }
        return await this.loadProfile();
    }

    /**
     * Registra un callback para cuando los datos estén cargados
     */
    onLoaded(callback) {
        if (this.loaded) {
            callback(this.data);
        } else {
            this.callbacks.push(callback);
        }
    }

    /**
     * Obtiene información personal
     */
    getPersonal() {
        return this.data?.personal || {};
    }

    /**
     * Obtiene información de contacto
     */
    getContact() {
        return this.data?.contact || {};
    }

    /**
     * Obtiene habilidades
     */
    getSkills() {
        return this.data?.skills || {};
    }

    /**
     * Obtiene biografía
     */
    getBio() {
        return this.data?.bio || {};
    }

    /**
     * Obtiene logros
     */
    getAchievements() {
        return this.data?.achievements || [];
    }

    /**
     * Obtiene intereses
     */
    getInterests() {
        return this.data?.interests || [];
    }

    /**
     * Obtiene navegación
     */
    getNavigation() {
        return this.data?.navigation || [];
    }

    /**
     * Obtiene estadísticas
     */
    getStats() {
        return this.data?.stats || [];
    }

    /**
     * Obtiene metadatos
     */
    getMeta() {
        return this.data?.meta || {};
    }

    /**
     * Obtiene configuración
     */
    getConfig() {
        return this.data?.config || {};
    }
}

/**
 * Utilidades para generar HTML dinámico
 */
class HTMLGenerator {
    constructor(profileManager) {
        this.profile = profileManager;
    }

    /**
     * Genera el título de la página
     */
    generateTitle() {
        const meta = this.profile.getMeta();
        document.title = meta.title || 'Martin Casanovas';
    }

    /**
     * Genera meta tags
     */
    generateMetaTags() {
        const meta = this.profile.getMeta();
        
        // Actualizar meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = meta.description || '';

        // Actualizar meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = meta.keywords?.join(', ') || '';

        // Actualizar meta author
        let metaAuthor = document.querySelector('meta[name="author"]');
        if (!metaAuthor) {
            metaAuthor = document.createElement('meta');
            metaAuthor.name = 'author';
            document.head.appendChild(metaAuthor);
        }
        metaAuthor.content = meta.author || '';
    }

    /**
     * Genera información de contacto para index.html
     */
    generateIndexContact() {
        const personal = this.profile.getPersonal();
        const contact = this.profile.getContact();

        return `
            <div>
                <span class="syntax-comment">// ${personal.name}</span>
            </div>
            
            <div class="mt-6 space-y-2">
                <div>
                    <span class="syntax-variable">email</span><span class="text-gray-300">  = [</span><a href="mailto:${contact.email}" class="syntax-string hover:text-primary transition-colors">"${contact.email}"</a><span class="text-gray-300">];</span>
                </div>
                <div>
                    <span class="syntax-variable">github</span><span class="text-gray-300">  = [</span><a href="${contact.github}" target="_blank" class="syntax-string hover:text-primary transition-colors">"@${personal.github}"</a><span class="text-gray-300">];</span>
                </div>
                <div>
                    <span class="syntax-variable">linkedin</span><span class="text-gray-300"> = [</span><a href="${contact.linkedin}" target="_blank" class="syntax-string hover:text-primary transition-colors">"@${personal.linkedin}"</a><span class="text-gray-300">];</span>
                </div>
                <div>
                    <span class="syntax-variable">role</span><span class="text-gray-300">    = [</span><span class="syntax-string">"DevOps Engineer"</span><span class="text-gray-300">];</span> <span class="syntax-comment">// ${personal.company}</span>
                </div>
                <div>
                    <span class="syntax-variable">location</span><span class="text-gray-300"> = [</span><span class="syntax-string">"${personal.location}"</span><span class="text-gray-300">];</span>
                </div>
            </div>
            
            <div class="mt-8 pt-4">
                <div>
                    <span class="syntax-comment">// Para más información:</span>
                </div>
                <div class="mt-2">
                    <span class="syntax-variable">about</span><span class="text-gray-300">   = [</span><a href="about.html" class="syntax-string hover:text-primary transition-colors">"./about.html"</a><span class="text-gray-300">];</span> <span class="animate-cursor">|</span>
                </div>
            </div>
        `;
    }

    /**
     * Genera el header del about.html
     */
    generateAboutHeader() {
        const personal = this.profile.getPersonal();
        const skills = this.profile.getSkills();

        return `
            <div class="mb-2">
                <span class="syntax-comment">#!/bin/bash</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">NOMBRE</span><span class="text-gray-300">=</span><span class="syntax-string">"${personal.name}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">ROL</span><span class="text-gray-300">=</span><span class="syntax-string">"${personal.role}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">UBICACION</span><span class="text-gray-300">=</span><span class="syntax-string">"${personal.location}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">EMAIL</span><span class="text-gray-300">=</span><span class="syntax-string">"${personal.email}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">GITHUB</span><span class="text-gray-300">=</span><span class="syntax-string">"@${personal.github}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">LINKEDIN</span><span class="text-gray-300">=</span><span class="syntax-string">"@${personal.linkedin}"</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">EMPRESA</span><span class="text-gray-300">=</span><span class="syntax-string">"${personal.company}"</span>
            </div>
            <div class="mb-4"></div>
            <div class="mb-2">
                <span class="syntax-comment"># Stack tecnológico</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-variable">SKILLS</span><span class="text-gray-300">=(</span>
            </div>
            ${this.generateSkillsList(skills.primary)}
            <div class="ml-0 mb-4">
                <span class="text-gray-300">)</span>
            </div>
            <div class="mb-2">
                <span class="syntax-comment"># Función para mostrar estado actual</span>
            </div>
            <div class="ml-0 mb-2">
                <span class="syntax-function">trabajando_en</span><span class="text-gray-300">() {</span>
            </div>
            <div class="ml-4 mb-1">
                <span class="syntax-keyword">echo</span> <span class="syntax-string">"DevOps Engineer en ${personal.company} 🚀"</span>
            </div>
            <div class="ml-0 mb-4">
                <span class="text-gray-300">}</span>
            </div>
            <div class="mb-2">
                <span class="syntax-comment"># Ejecutar función</span>
            </div>
            <div class="mt-4">
                <span class="syntax-comment"># ¿Hablamos sobre DevOps y tecnología?</span>
            </div>
            <div>
                <span class="text-gray-400">$</span> <span class="syntax-keyword">echo</span> <span class="syntax-string">"¡Contactame para colaborar!"</span><span class="animate-cursor">|</span>
            </div>
        `;
    }

    /**
     * Genera la lista de skills como bash array
     */
    generateSkillsList(skills) {
        const chunks = [];
        for (let i = 0; i < skills.length; i += 3) {
            chunks.push(skills.slice(i, i + 3));
        }

        return chunks.map(chunk => 
            `<div class="ml-4 mb-1">
                ${chunk.map(skill => `<span class="syntax-string">"${skill}"</span>`).join(' ')}
            </div>`
        ).join('');
    }

    /**
     * Genera enlaces rápidos
     */
    generateQuickLinks() {
        const contact = this.profile.getContact();

        return `
            <a href="mailto:${contact.email}" 
               class="px-4 py-2 bg-code-bg border border-code-border rounded text-sm font-mono hover:border-primary transition-colors">
                📧 Email
            </a>
            <a href="${contact.github}" target="_blank"
               class="px-4 py-2 bg-code-bg border border-code-border rounded text-sm font-mono hover:border-primary transition-colors">
                💻 GitHub
            </a>
            <a href="${contact.linkedin}" target="_blank"
               class="px-4 py-2 bg-code-bg border border-code-border rounded text-sm font-mono hover:border-primary transition-colors">
                💼 LinkedIn
            </a>
            <a href="#proyectos"
               class="px-4 py-2 bg-primary text-black rounded text-sm font-mono hover:bg-primary/80 transition-colors">
                🚀 Ver Proyectos
            </a>
        `;
    }

    /**
     * Genera la navegación
     */
    generateNavigation() {
        const navigation = this.profile.getNavigation();
        const personal = this.profile.getPersonal();

        const navItems = navigation.map(item => 
            `<a href="${item.href}" class="text-gray-400 hover:text-primary transition-colors">${item.label}</a>`
        ).join('');

        return `
            <div class="text-lg font-mono">
                <span class="text-primary">~/</span>
                <span class="text-gray-300">${personal.website}</span>
            </div>
            <div class="hidden md:flex space-x-8 font-mono text-sm">
                ${navItems}
            </div>
        `;
    }

    /**
     * Genera las barras de progreso de skills
     */
    generateSkillBars(skillsObject) {
        return Object.entries(skillsObject).map(([skill, level]) => {
            const bars = '█'.repeat(Math.floor(level / 10)) + '░'.repeat(10 - Math.floor(level / 10));
            return `
                <div class="flex justify-between">
                    <span class="text-gray-300">${skill}</span>
                    <span class="text-primary">${bars}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Genera logros
     */
    generateAchievements() {
        const achievements = this.profile.getAchievements();

        return achievements.map(achievement => {
            const colorClass = {
                'primary': 'border-primary text-primary',
                'secondary': 'border-secondary text-secondary',
                'accent': 'border-accent text-accent'
            }[achievement.color] || 'border-primary text-primary';

            return `
                <div class="border-l-2 ${colorClass} pl-6">
                    <div class="mb-2">
                        <span class="${achievement.color === 'secondary' ? 'text-secondary' : achievement.color === 'accent' ? 'text-accent' : 'text-primary'} font-semibold">${achievement.title}</span>
                        <span class="text-gray-400 ml-2 text-xs">// ${achievement.subtitle}</span>
                    </div>
                    <p class="text-gray-300 text-sm">
                        ${achievement.description}
                    </p>
                </div>
            `;
        }).join('');
    }

    /**
     * Genera estadísticas
     */
    generateStats() {
        const stats = this.profile.getStats();

        return stats.map(stat => `
            <div>
                <div class="text-2xl font-bold text-primary">${stat.value}</div>
                <div class="text-xs text-gray-400">${stat.label}</div>
            </div>
        `).join('');
    }

    /**
     * Genera información de contacto para about.html
     */
    generateContactInfo() {
        const personal = this.profile.getPersonal();
        const contact = this.profile.getContact();
        const interests = this.profile.getInterests();

        return `
            <div class="mb-4">
                <span class="syntax-comment"># Ansible Group Variables</span>
            </div>
            <div class="mb-2">
                <span class="syntax-comment"># Configuración de contacto</span>
            </div>
            <div class="mb-4">
                <span class="syntax-comment">---</span>
            </div>
            <div class="ml-0 space-y-2">
                <div>
                    <span class="syntax-variable">contacto</span><span class="text-gray-300">:</span>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">email</span><span class="text-gray-300">:</span> 
                    <a href="mailto:${contact.email}" class="syntax-string hover:text-primary transition-colors">"${contact.email}"</a>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">github</span><span class="text-gray-300">:</span> 
                    <a href="${contact.github}" target="_blank" class="syntax-string hover:text-primary transition-colors">"@${personal.github}"</a>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">linkedin</span><span class="text-gray-300">:</span> 
                    <a href="${contact.linkedin}" target="_blank" class="syntax-string hover:text-primary transition-colors">"@${personal.linkedin}"</a>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">empresa</span><span class="text-gray-300">:</span> 
                    <span class="syntax-string">"${personal.company}"</span>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">ubicacion</span><span class="text-gray-300">:</span> 
                    <span class="syntax-string">"${personal.location}"</span>
                </div>
                <div class="ml-2">
                    <span class="syntax-variable">disponible</span><span class="text-gray-300">:</span> 
                    <span class="syntax-keyword">${contact.available}</span>
                </div>
                <div class="mb-4"></div>
                <div>
                    <span class="syntax-variable">intereses</span><span class="text-gray-300">:</span>
                </div>
                ${interests.map(interest => `
                    <div class="ml-2">
                        <span class="text-gray-300">-</span> <span class="syntax-string">"${interest}"</span>
                    </div>
                `).join('')}
                <div class="mb-4"></div>
            </div>
            <div class="mt-4">
                <span class="syntax-comment"># Siempre abierto a nuevos desafíos y nuevos desafios!</span>
            </div>
        `;
    }

    /**
     * Genera footer
     */
    generateFooter() {
        const meta = this.profile.getMeta();
        const contact = this.profile.getContact();

        return `
            <div class="mb-4">
                <span class="syntax-comment">// ${meta.copyright}</span>
            </div>
            <div class="mb-3">
                <span class="syntax-comment text-xs">// Desarrollado con GitHub Copilot 🤖 | Powered by AI ✨</span>
            </div>
            <div class="flex justify-center space-x-6">
                <a href="${contact.github}" target="_blank" 
                   class="text-gray-400 hover:text-primary transition-colors">
                    GitHub
                </a>
                <a href="${contact.linkedin}" target="_blank" 
                   class="text-gray-400 hover:text-primary transition-colors">
                    LinkedIn
                </a>
                <a href="mailto:${contact.email}" 
                   class="text-gray-400 hover:text-primary transition-colors">
                    Email
                </a>
            </div>
        `;
    }
}

// Crear instancia global del ProfileManager
window.profileManager = new ProfileManager();
window.htmlGenerator = new HTMLGenerator(window.profileManager);

// Función para inicializar la página
async function initializePage() {
    try {
        await window.profileManager.loadProfile();
        
        // Generar elementos comunes
        window.htmlGenerator.generateTitle();
        window.htmlGenerator.generateMetaTags();
        
        // Trigger custom event para que las páginas sepan que los datos están listos
        document.dispatchEvent(new CustomEvent('profileLoaded', { 
            detail: window.profileManager.data 
        }));
        
    } catch (error) {
        console.error('Error initializing page:', error);
        
        // Trigger event de error
        document.dispatchEvent(new CustomEvent('profileError', { 
            detail: error 
        }));
    }
}

// Auto-inicializar cuando se carga el DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

// Exportar para uso en módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProfileManager, HTMLGenerator };
}
