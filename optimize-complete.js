const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const glob = require('glob');

async function compressOnly() {
  console.log('🚀 COMPRESSION DES IMAGES');
  console.log('=========================');
  
  try {
    // Crée les dossiers
    if (!fs.existsSync('img/compressed')) {
      fs.mkdirSync('img/compressed', { recursive: true });
    }
    if (!fs.existsSync('img/webp')) {
      fs.mkdirSync('img/webp', { recursive: true });
    }

    // Compte les images
    const images = glob.sync('img/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    console.log(`📁 ${images.length} images à traiter`);

    // Compresse les JPEG avec la syntaxe correcte
    console.log('📸 Compression des JPEG...');
    const jpegFiles = await imagemin(['img/*.{jpg,jpeg,JPG,JPEG}'], {
      destination: 'img/compressed',
      plugins: [
        imageminMozjpeg({
          quality: 80,
          progressive: true
        })
      ]
    });
    console.log(`✅ ${jpegFiles.length} JPEG compressés`);

    // Compresse les PNG
    console.log('🖼️  Compression des PNG...');
    const pngFiles = await imagemin(['img/*.{png,PNG}'], {
      destination: 'img/compressed',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });
    console.log(`✅ ${pngFiles.length} PNG compressés`);

    // Convertit tout en WebP
    console.log('🔄 Conversion en WebP...');
    const webpFiles = await imagemin(['img/*.{jpg,jpeg,png,JPG,JPEG,PNG}'], {
      destination: 'img/webp',
      plugins: [
        imageminWebp({
          quality: 80
        })
      ]
    });
    console.log(`✅ ${webpFiles.length} images converties en WebP`);

    // Calcule les économies
    calculateSavings();
    
    console.log('\n🎉 COMPRESSION TERMINÉE !');
    console.log('==========================');
    console.log('📁 Images compressées → img/compressed/');
    console.log('📁 Images WebP → img/webp/');
    console.log('✅ Tes HTML sont déjà mis à jour !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. npm install imagemin@8.0.1 imagemin-mozjpeg@10.0.0');
    console.log('2. Redémarre VSCode');
    console.log('3. Ou utilise la solution alternative ci-dessous');
  }
}

function calculateSavings() {
  try {
    let originalSize = 0;
    let compressedSize = 0;
    
    const originalFiles = glob.sync('img/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
    
    originalFiles.forEach(file => {
      const stats = fs.statSync(file);
      originalSize += stats.size;
      
      const filename = require('path').basename(file);
      const compressedFile = `img/compressed/${filename}`;
      
      if (fs.existsSync(compressedFile)) {
        const compressedStats = fs.statSync(compressedFile);
        compressedSize += compressedStats.size;
      }
    });
    
    if (compressedSize > 0) {
      const savings = originalSize - compressedSize;
      const percentage = ((savings / originalSize) * 100).toFixed(1);
      
      console.log(`\n📊 RÉSULTATS:`);
      console.log(`📊 Taille originale: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`📊 Taille compressée: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`💾 Économie: ${(savings / 1024 / 1024).toFixed(2)} MB (${percentage}%)`);
    }
    
  } catch (error) {
    console.log('ℹ️  Calcul des statistiques en cours...');
  }
}

compressOnly();