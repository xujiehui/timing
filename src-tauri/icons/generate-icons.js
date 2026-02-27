#!/usr/bin/env node

/**
 * 图标生成脚本
 * 使用 sharp 库将 SVG 转换为多尺寸 PNG 图标
 * 
 * 安装依赖: npm install sharp --save-dev
 * 运行: node generate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateIcons() {
  try {
    const svgPath = path.join(__dirname, 'icon.svg');
    
    if (!fs.existsSync(svgPath)) {
      console.error('错误: 找不到 icon.svg 文件');
      process.exit(1);
    }

    const sizes = [
      { name: '32x32.png', size: 32 },
      { name: '128x128.png', size: 128 },
      { name: '128x128@2x.png', size: 256 },
      { name: 'icon.png', size: 64 },
    ];

    // 检查哪些图标需要生成
    const iconsToGenerate = [];
    for (const { name, size } of sizes) {
      const outputPath = path.join(__dirname, name);
      if (!fs.existsSync(outputPath)) {
        iconsToGenerate.push({ name, size, outputPath });
      } else {
        console.log(`⏭ 跳过 ${name} (文件已存在)`);
      }
    }

    if (iconsToGenerate.length === 0) {
      console.log('所有图标文件已存在，无需重新生成。');
      return;
    }

    console.log(`开始生成 ${iconsToGenerate.length} 个图标...`);

    for (const { name, size, outputPath } of iconsToGenerate) {
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ 生成 ${name} (${size}x${size})`);
    }

    // 生成 ICO 文件（Windows 需要）
    const icoPath = path.join(__dirname, 'icon.ico');
    if (!fs.existsSync(icoPath)) {
      console.log('\n开始生成 icon.ico 文件...');
      const icoSizes = [16, 32, 48, 64, 128, 256];
      const icoBuffers = [];
      
      for (const size of icoSizes) {
        const buffer = await sharp(svgPath)
          .resize(size, size)
          .png()
          .toBuffer();
        icoBuffers.push(buffer);
      }
      
      const icoBuffer = await toIco(icoBuffers);
      fs.writeFileSync(icoPath, icoBuffer);
      console.log(`✓ 生成 icon.ico (包含 ${icoSizes.length} 个尺寸)`);
    } else {
      console.log('\n⏭ 跳过 icon.ico (文件已存在)');
    }

    console.log('\n图标生成完成！');
    console.log('注意: ICNS 文件需要额外的工具生成，请参考 README.md');
    
  } catch (error) {
    console.error('生成图标时出错:', error.message);
    process.exit(1);
  }
}

generateIcons();
