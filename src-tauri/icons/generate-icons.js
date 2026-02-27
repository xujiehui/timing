#!/usr/bin/env node

/**
 * 图标生成脚本
 * 使用 sharp 库将 SVG 转换为多尺寸 PNG 图标
 * 
 * 安装依赖: npm install sharp --save-dev
 * 运行: node generate-icons.js
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  try {
    // 检查是否安装了 sharp
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.error('错误: 未找到 sharp 库');
      console.log('请先安装: npm install sharp --save-dev');
      process.exit(1);
    }

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

    console.log('开始生成图标...');

    for (const { name, size } of sizes) {
      const outputPath = path.join(__dirname, name);
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      console.log(`✓ 生成 ${name} (${size}x${size})`);
    }

    console.log('\n图标生成完成！');
    console.log('注意: ICO 和 ICNS 文件需要额外的工具生成，请参考 README.md');
    
  } catch (error) {
    console.error('生成图标时出错:', error.message);
    process.exit(1);
  }
}

generateIcons();
