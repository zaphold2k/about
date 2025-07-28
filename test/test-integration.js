// Test de integración para verificar que el sistema funciona
console.log('🧪 Iniciando test de integración...');

// Verificar que los archivos existen
const fs = require('fs');
const path = require('path');

const files = [
    './about/index.html',
    './about/about.html',
    './about/js/profile.js',
    './about/data/profile.json'
];

console.log('\n📁 Verificando archivos...');
files.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - existe`);
    } else {
        console.log(`❌ ${file} - no encontrado`);
    }
});

// Verificar que el JSON es válido
try {
    const profileData = JSON.parse(fs.readFileSync('./about/data/profile.json', 'utf8'));
    console.log('\n📊 Datos del profile.json:');
    console.log(`✅ Nombre: ${profileData.personal.name}`);
    console.log(`✅ Email: ${profileData.contact.email}`);
    console.log(`✅ Skills DevOps: ${profileData.skills.devops_cloud.length} items`);
    console.log(`✅ Achievements: ${profileData.achievements.length} items`);
} catch (error) {
    console.log('❌ Error al leer profile.json:', error.message);
}

// Verificar que los HTML tienen las referencias correctas
console.log('\n🔗 Verificando referencias...');

const indexContent = fs.readFileSync('./about/index.html', 'utf8');
const aboutContent = fs.readFileSync('./about/about.html', 'utf8');

if (indexContent.includes('js/profile.js')) {
    console.log('✅ index.html referencia profile.js');
} else {
    console.log('❌ index.html no referencia profile.js');
}

if (aboutContent.includes('js/profile.js')) {
    console.log('✅ about.html referencia profile.js');
} else {
    console.log('❌ about.html no referencia profile.js');
}

if (indexContent.includes('profileLoaded')) {
    console.log('✅ index.html usa eventos profileLoaded');
} else {
    console.log('❌ index.html no usa eventos profileLoaded');
}

if (aboutContent.includes('profileLoaded')) {
    console.log('✅ about.html usa eventos profileLoaded');
} else {
    console.log('❌ about.html no usa eventos profileLoaded');
}

console.log('\n🎉 Test completado!');
