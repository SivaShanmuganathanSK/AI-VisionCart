const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
  'tirunelveli-halwa.jpg': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
  'palm-leaf-products.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'kanyakumari-beach.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'dried-fish.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'seashell-crafts.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'turmeric.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'handloom.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'bedspreads.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'paper-products.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'locks.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'leather-products.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'chettinad-cuisine.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'chettinad-spices.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'chettinad-sarees.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'palm-leaf-art.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'stone-carvings.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'pearl-farming.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'pearl-jewelry.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'salt-pans.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'port.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'pearl-products.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'seafood.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'rock-fort.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'rock-art.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1',
  'trichy-handloom.jpg': 'https://images.unsplash.com/photo-1584559582128-b0c2b3f99fb1'
};

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(path.join(__dirname, filename));
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded ${filename}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await downloadImage(url, filename);
    } catch (error) {
      console.error(`Error downloading ${filename}:`, error);
    }
  }
};

downloadAllImages(); 