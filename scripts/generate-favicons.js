import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('public/favicon.svg');

// OG image SVG (1200x630, dark background with name and tagline)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#111111"/>
  <!-- Corner marks -->
  <line x1="60" y1="60" x2="100" y2="60" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="60" y1="60" x2="60" y2="100" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="1140" y1="60" x2="1100" y2="60" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="1140" y1="60" x2="1140" y2="100" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="60" y1="570" x2="100" y2="570" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="60" y1="570" x2="60" y2="530" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="1140" y1="570" x2="1100" y2="570" stroke="#E5E4DE" stroke-width="2"/>
  <line x1="1140" y1="570" x2="1140" y2="530" stroke="#E5E4DE" stroke-width="2"/>
  <!-- Labels -->
  <text x="80" y="84" font-family="Arial, sans-serif" font-size="13" fill="#666666" letter-spacing="4">[ ROMAN KUTSEV ]</text>
  <text x="1120" y="84" font-family="Arial, sans-serif" font-size="13" fill="#666666" letter-spacing="4" text-anchor="end">[ MINSK, BY ]</text>
  <!-- Main name -->
  <text x="80" y="340" font-family="Arial Black, Arial, sans-serif" font-size="160" font-weight="900" fill="#E5E4DE" letter-spacing="-8">ROMAN</text>
  <text x="80" y="510" font-family="Arial Black, Arial, sans-serif" font-size="160" font-weight="900" fill="#E5E4DE" letter-spacing="-8">KUTSEV</text>
  <!-- Tagline -->
  <text x="1120" y="570" font-family="Arial, sans-serif" font-size="14" fill="#666666" letter-spacing="3" text-anchor="end">[ CREATIVE ENGINEER, DESIGNER ]</text>
</svg>`;

async function gen() {
  const svgBuf = Buffer.from(svg);
  const ogBuf = Buffer.from(ogSvg);

  await sharp(svgBuf).resize(16, 16).png().toFile('public/favicon-16x16.png');
  console.log('✓ favicon-16x16.png');
  await sharp(svgBuf).resize(32, 32).png().toFile('public/favicon-32x32.png');
  console.log('✓ favicon-32x32.png');
  await sharp(svgBuf).resize(48, 48).png().toFile('public/favicon-48x48.png');
  console.log('✓ favicon-48x48.png');
  await sharp(svgBuf).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('✓ apple-touch-icon.png');
  await sharp(svgBuf).resize(192, 192).png().toFile('public/android-chrome-192x192.png');
  console.log('✓ android-chrome-192x192.png');
  await sharp(svgBuf).resize(512, 512).png().toFile('public/android-chrome-512x512.png');
  console.log('✓ android-chrome-512x512.png');

  // OG image 1200x630
  await sharp(ogBuf, { density: 150 }).resize(1200, 630).jpeg({ quality: 92 }).toFile('public/og-image.jpg');
  console.log('✓ og-image.jpg (1200x630)');

  console.log('\n✅ All assets generated!');
}
gen().catch(console.error);
