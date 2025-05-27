const fs = require('fs').promises;
const path = require('path');
const CleanCSS = require('clean-css');
const chokidar = require('chokidar');

// 🎯 Configuration des fichiers CSS dans l'ordre d'importation
const CSS_FILES = [
    // Base - Variables et réinitialisations
    'css/base/variables.css',
    'css/base/reset.css',
    'css/base/typography.css',
    
    // Layout - Structure principale
    'css/layout/navbar.css',
    'css/layout/header.css',
    'css/layout/footer.css',
    
    // Sections - Contenu principal
    'css/sections/music.css',
    'css/sections/about.css',
    'css/sections/tour.css',
    'css/sections/gallery.css',
    'css/sections/contact.css',
    'css/sections/video.css',
    'css/sections/pro.css',
    
    // Components - Éléments réutilisables
    'css/components/audio-player.css',
    'css/components/buttons.css',
    'css/components/cards.css',
    'css/components/modals.css',
    
    // Effects - Animations et effets visuels
    'css/effects/animations.css',
    'css/effects/lightning.css',
    'css/effects/hover-effects.css',
    
    // Responsive - Adaptations écrans
    'css/responsive/mobile.css',
    'css/responsive/tablet.css',
    'css/responsive/desktop.css'
];

const OUTPUT_DIR = 'css/dist';
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'style.css');
const OUTPUT_MIN_FILE = path.join(OUTPUT_DIR, 'style.min.css');

// 📁 Fonction pour créer le dossier de sortie
async function ensureOutputDir() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        console.log(`📁 Output directory created: ${OUTPUT_DIR}`);
    } catch (error) {
        // Le dossier existe déjà
    }
}

// 🔨 Fonction principale pour construire le CSS
async function buildCSS() {
    console.log('\n🎸 DANDYSHOES - Building CSS...');
    console.log('='.repeat(50));
    const startTime = Date.now();
    
    try {
        await ensureOutputDir();
        
        let combinedCSS = '';
        let filesProcessed = 0;
        let filesSkipped = 0;
        
        // Ajouter un header informatif
        const buildDate = new Date().toISOString();
        combinedCSS += `/*!\n`;
        combinedCSS += ` * DANDYSHOES - Website Styles\n`;
        combinedCSS += ` * Belgian Rock'n'Roll Band from Charleroi, Belgium\n`;
        combinedCSS += ` * \n`;
        combinedCSS += ` * Built on: ${buildDate}\n`;
        combinedCSS += ` * Files combined: ${CSS_FILES.length}\n`;
        combinedCSS += ` * \n`;
        combinedCSS += ` * © ${new Date().getFullYear()} DANDYSHOES. All rights reserved.\n`;
        combinedCSS += ` */\n\n`;
        
        // Lire et combiner tous les fichiers CSS
        for (const file of CSS_FILES) {
            try {
                const filePath = path.resolve(file);
                const content = await fs.readFile(filePath, 'utf8');
                
                // Ajouter un commentaire de section
                const fileName = path.basename(file, '.css');
                const sectionName = fileName.replace(/[-_]/g, ' ').toUpperCase();
                combinedCSS += `\n/* ===== ${sectionName} ===== */\n`;
                combinedCSS += content + '\n';
                
                filesProcessed++;
                console.log(`✅ ${file}`);
            } catch (error) {
                console.log(`⚠️  ${file} - File not found (will be skipped)`);
                filesSkipped++;
            }
        }
        
        // Écrire le fichier CSS non minifié
        await fs.writeFile(OUTPUT_FILE, combinedCSS);
        
        // Minifier le CSS
        console.log('\n🗜️  Minifying CSS...');
        const minifyResult = new CleanCSS({
            level: 2,
            returnPromise: true
        }).minify(combinedCSS);
        
        // Vérifier que la minification a réussi
        const minifiedCSS = minifyResult.styles || combinedCSS;
        await fs.writeFile(OUTPUT_MIN_FILE, minifiedCSS);
        
        // Calculer les statistiques
        const buildTime = Date.now() - startTime;
        const originalSize = Buffer.byteLength(combinedCSS, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedCSS, 'utf8');
        const compression = originalSize > 0 ? ((1 - minifiedSize / originalSize) * 100).toFixed(1) : 0;
        
        // Afficher les résultats
        console.log('\n🎉 Build completed successfully!');
        console.log('='.repeat(50));
        console.log(`📊 Statistics:`);
        console.log(`   Files processed: ${filesProcessed}/${CSS_FILES.length}`);
        console.log(`   Files skipped: ${filesSkipped}`);
        console.log(`   Build time: ${buildTime}ms`);
        console.log(`   Original size: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);
        console.log(`   Compression: ${compression}%`);
        console.log(`\n📁 Output files:`);
        console.log(`   📄 ${OUTPUT_FILE}`);
        console.log(`   📄 ${OUTPUT_MIN_FILE}`);
        
        if (minifyResult.warnings && minifyResult.warnings.length > 0) {
            console.log('\n⚠️  CSS Warnings:');
            minifyResult.warnings.forEach(warning => console.log(`   ${warning}`));
        }
        
        console.log('\n🎸 Rock on! Your CSS is ready to rock! 🎸\n');
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
}

// 👀 Fonction de surveillance pour le développement
function watchFiles() {
    console.log('\n👀 DANDYSHOES CSS Watcher');
    console.log('='.repeat(50));
    console.log('🔍 Watching: css/**/*.css');
    console.log('🚀 Press Ctrl+C to stop\n');
    
    // Build initial
    buildCSS();
    
    // Configuration du watcher
    const watcher = chokidar.watch('css/**/*.css', {
        ignored: [OUTPUT_DIR, 'node_modules', '.git'],
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 100,
            pollInterval: 50
        }
    });
    
    let isBuilding = false;
    let queuedBuild = false;
    
    // Fonction de build avec gestion de queue
    const debouncedBuild = async () => {
        if (isBuilding) {
            queuedBuild = true;
            return;
        }
        
        isBuilding = true;
        await buildCSS();
        isBuilding = false;
        
        // Si un build était en queue, l'exécuter
        if (queuedBuild) {
            queuedBuild = false;
            setTimeout(debouncedBuild, 100);
        }
    };
    
    // Événements de surveillance
    watcher.on('change', (filePath) => {
        console.log(`📝 Changed: ${filePath}`);
        debouncedBuild();
    });
    
    watcher.on('add', (filePath) => {
        console.log(`➕ Added: ${filePath}`);
        debouncedBuild();
    });
    
    watcher.on('unlink', (filePath) => {
        console.log(`🗑️  Deleted: ${filePath}`);
        debouncedBuild();
    });
    
    watcher.on('error', (error) => {
        console.error(`❌ Watcher error: ${error}`);
    });
    
    // Gérer l'arrêt propre
    process.on('SIGINT', () => {
        console.log('\n\n🛑 Stopping DANDYSHOES CSS watcher...');
        watcher.close();
        console.log('👋 See you later, rock star!');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        watcher.close();
        process.exit(0);
    });
}

// 🚀 Point d'entrée principal
function main() {
    const args = process.argv.slice(2);
    
    console.log('🎸 DANDYSHOES CSS Build System');
    console.log('🎤 Bloody Rock\'n\'Roll from Charleroi, Belgium\n');
    
    if (args.includes('--watch') || args.includes('-w')) {
        watchFiles();
    } else if (args.includes('--help') || args.includes('-h')) {
        console.log('Usage:');
        console.log('  node build-css.js           Build CSS once');
        console.log('  node build-css.js --watch   Build and watch for changes');
        console.log('  npm run build               Build CSS once');
        console.log('  npm run dev                 Build and watch for changes');
    } else {
        buildCSS();
    }
}

// Lancer le script si exécuté directement
if (require.main === module) {
    main();
}

// Export pour usage programmatique
module.exports = { buildCSS, watchFiles };