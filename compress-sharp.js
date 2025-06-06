const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function compressWithSharp() {
  console.log('🚀 COMPRESSION AVEC SHARP');
  console.log('=========================');
  
  // Crée les dossiers
  ['img/compressed', 'img/webp'].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Trouve toutes les images
  const images = glob.sync('img/*.{jpg,jpeg,png,JPG,JPEG,PNG}');
  console.log(`📸 ${images.length} images à traiter\n`);
  
  let processed = 0;
  let originalSize = 0;
  let compressedSize = 0;
  
  for (const imagePath of images) {
    try {
      const filename = path.basename(imagePath);
      const nameWithoutExt = path.parse(filename).name;
      const ext = path.parse(filename).ext.toLowerCase();
      
      // Taille originale
      const originalStats = fs.statSync(imagePath);
      originalSize += originalStats.size;
      
      console.log(`⚡ ${filename} (${(originalStats.size/1024).toFixed(0)}KB)`);
      
      // Compression selon le type
      if (ext === '.jpg' || ext === '.jpeg') {
        // JPEG compressé
        await sharp(imagePath)
          .jpeg({ quality: 80, progressive: true })
          .toFile(`img/compressed/${filename}`);
          
        // WebP
        await sharp(imagePath)
          .webp({ quality: 80 })
          .toFile(`img/webp/${nameWithoutExt}.webp`);
          
      } else if (ext === '.png') {
        // PNG compressé
        await sharp(imagePath)
          .png({ quality: 80, compressionLevel: 8 })
          .toFile(`img/compressed/${filename}`);
          
        // WebP
        await sharp(imagePath)
          .webp({ quality: 80 })
          .toFile(`img/webp/${nameWithoutExt}.webp`);
      }
      
      // Calcule la taille compressée
      const compressedPath = `img/compressed/${filename}`;
      if (fs.existsSync(compressedPath)) {
        const compressedStats = fs.statSync(compressedPath);
        compressedSize += compressedStats.size;
        
        const reduction = ((originalStats.size - compressedStats.size) / originalStats.size * 100).toFixed(1);
        console.log(`  ✅ ${(compressedStats.size/1024).toFixed(0)}KB (-${reduction}%)`);
      }
      
      processed++;
      
    } catch (error) {
      console.log(`  ❌ Erreur: ${error.message}`);
    }
  }
  
  // Résumé final
  console.log('\n🎉 COMPRESSION TERMINÉE !');
  console.log('==========================');
  console.log(`📊 Images traitées: ${processed}/${images.length}`);
  console.log(`📊 Taille originale: ${(originalSize/1024/1024).toFixed(2)} MB`);
  console.log(`📊 Taille compressée: ${(compressedSize/1024/1024).toFixed(2)} MB`);
  
  if (compressedSize > 0) {
    const totalReduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    const savedMB = ((originalSize - compressedSize) / 1024 / 1024).toFixed(2);
    console.log(`💾 Économie: ${savedMB} MB (${totalReduction}%)`);
  }
  
  console.log('\n📁 Résultats:');
  console.log('• img/compressed/ → Images optimisées');
  console.log('• img/webp/ → Versions WebP ultra-légères');
  console.log('✅ Tes HTML sont déjà mis à jour !');
}

compressWithSharp().catch(console.error);