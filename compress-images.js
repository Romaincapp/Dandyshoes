const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function optimizeComplete() {
  console.log('🚀 OPTIMISATION COMPLÈTE DE TON SITE');
  console.log('====================================');
  
  // ÉTAPE 1: Sauvegarde
  console.log('\n💾 1. Création de la sauvegarde...');
  createBackup();
  
  // ÉTAPE 2: Compression des images
  console.log('\n📸 2. Compression des images...');
  await compressImages();
  
  // ÉTAPE 3: Mise à jour HTML
  console.log('\n🔄 3. Mise à jour des fichiers HTML...');
  await updateHTMLFiles();
  
  // ÉTAPE 4: Statistiques
  console.log('\n📊 4. Calcul des gains...');
  calculateSavings();
  
  console.log('\n🎉 OPTIMISATION TERMINÉE !');
  console.log('==========================');
  console.log('✅ Images compressées');
  console.log('✅ HTML mis à jour');
  console.log('✅ Lazy loading ajouté');
  console.log('✅ Format WebP intégré');
  console.log('\n💡 Tu peux maintenant tester ton site et faire un commit !');
}

function createBackup() {
  const htmlFiles = glob.sync('**/*.html', { 
    ignore: ['node_modules/**', 'dist/**', '.git/**', 'backup/**'] 
  });
  
  if (!fs.existsSync('backup')) {
    fs.mkdirSync('backup', { recursive: true });
  }
  
  htmlFiles.forEach(file => {
    const backupPath = path.join('backup', file);
    const backupDir = path.dirname(backupPath);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    fs.copyFileSync(file, backupPath);
  });
  
  console.log(`✅ ${htmlFiles.length} fichiers HTML sauvegardés`);
}

async function compressImages() {
  try {
    // Crée les dossiers
    ['img/compressed', 'img/webp'].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    // Compte les images avant
    const originalImages = glob.sync('img/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    console.log(`📁 ${originalImages.length} images trouvées`);

    // Compresse JPEG
    await imagemin(['img/*.{jpg,jpeg,JPG,JPEG}'], {
      destination: 'img/compressed',
      plugins: [imageminMozjpeg({ quality: 80 })]
    });

    // Compresse PNG
    await imagemin(['img/*.{png,PNG}'], {
      destination: 'img/compressed',
      plugins: [imageminPngquant({ quality: [0.6, 0.8] })]
    });

    // Convertit en WebP
    await imagemin(['img/*.{jpg,jpeg,png,JPG,JPEG,PNG}'], {
      destination: 'img/webp',
      plugins: [imageminWebp({ quality: 80 })]
    });

    console.log('✅ Compression terminée');
    
  } catch (error) {
    console.error('❌ Erreur compression:', error);
  }
}

async function updateHTMLFiles() {
  const htmlFiles = glob.sync('**/*.html', { 
    ignore: ['node_modules/**', 'dist/**', '.git/**', 'backup/**'] 
  });
  
  let totalUpdated = 0;
  
  for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let fileUpdated = false;
    
    // Remplace les balises img
    const imgRegex = /<img([^>]*)\s+src=["']img\/([^"']+\.(jpg|jpeg|png|JPG|JPEG|PNG))["']([^>]*)>/gi;
    
    content = content.replace(imgRegex, (match, beforeSrc, imageName, extension, afterSrc) => {
      fileUpdated = true;
      
      // Extrait alt et autres attributs
      const altMatch = match.match(/alt=["']([^"']*)["']/i);
      const altAttr = altMatch ? altMatch[0] : 'alt=""';
      
      // Ajoute loading="lazy" si absent
      const hasLoading = /loading=/i.test(match);
      const loadingAttr = hasLoading ? '' : ' loading="lazy"';
      
      // Prépare le nom WebP
      const nameWithoutExt = imageName.replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i, '');
      const webpName = nameWithoutExt + '.webp';
      
      // Nouvelle structure HTML
      return `<picture>
  <source srcset="img/webp/${webpName}" type="image/webp">
  <img src="img/compressed/${imageName}" ${altAttr}${loadingAttr}>
</picture>`;
    });
    
    if (fileUpdated) {
      fs.writeFileSync(file, content, 'utf8');
      totalUpdated++;
    }
  }
  
  console.log(`✅ ${totalUpdated} fichiers HTML mis à jour`);
}

function calculateSavings() {
  try {
    const originalDir = 'img/';
    const compressedDir = 'img/compressed/';
    
    let originalSize = 0;
    let compressedSize = 0;
    
    const originalFiles = glob.sync('img/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    
    originalFiles.forEach(file => {
      const stats = fs.statSync(file);
      originalSize += stats.size;
      
      const filename = path.basename(file);
      const compressedFile = path.join(compressedDir, filename);
      
      if (fs.existsSync(compressedFile)) {
        const compressedStats = fs.statSync(compressedFile);
        compressedSize += compressedStats.size;
      }
    });
    
    const savings = originalSize - compressedSize;
    const percentage = ((savings / originalSize) * 100).toFixed(1);
    
    console.log(`📊 Taille originale: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`📊 Taille compressée: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`💾 Économie: ${(savings / 1024 / 1024).toFixed(2)} MB (${percentage}%)`);
    
  } catch (error) {
    console.log('ℹ️  Impossible de calculer les statistiques');
  }
}

// Lance l'optimisation complète
optimizeComplete();