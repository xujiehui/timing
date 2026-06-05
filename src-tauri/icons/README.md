# 应用图标生成说明

本目录包含应用图标的基础 SVG 设计文件。为了生成 Tauri 应用所需的多尺寸图标文件，请按照以下步骤操作：

## 所需图标文件

- `icon.png` - 系统托盘图标（建议 64x64 或 32x32）
- `32x32.png` - 32x32 像素图标
- `128x128.png` - 128x128 像素图标
- `128x128@2x.png` - 256x256 像素图标（Retina）
- `icon.icns` - macOS 图标集
- `icon.ico` - Windows 图标集

## 生成方法

### 方法 1: 使用在线工具

1. 访问 [CloudConvert](https://cloudconvert.com/svg-to-png) 或类似工具
2. 上传 `icon.svg` 文件
3. 设置输出尺寸（32x32, 128x128, 256x256）
4. 下载生成的 PNG 文件并重命名

### 方法 2: 使用 ImageMagick（命令行）

```bash
# 安装 ImageMagick（如果未安装）
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick
# Windows: 从官网下载安装

# 生成 PNG 文件
convert icon.svg -resize 32x32 32x32.png
convert icon.svg -resize 128x128 128x128.png
convert icon.svg -resize 256x256 128x128@2x.png
convert icon.svg -resize 64x64 icon.png

# 生成 ICO 文件（Windows）
convert icon.svg -resize 256x256 icon.ico

# 生成 ICNS 文件（macOS，需要 iconutil）
mkdir icon.iconset
convert icon.svg -resize 16x16 icon.iconset/icon_16x16.png
convert icon.svg -resize 32x32 icon.iconset/icon_16x16@2x.png
convert icon.svg -resize 32x32 icon.iconset/icon_32x32.png
convert icon.svg -resize 64x64 icon.iconset/icon_32x32@2x.png
convert icon.svg -resize 128x128 icon.iconset/icon_128x128.png
convert icon.svg -resize 256x256 icon.iconset/icon_128x128@2x.png
convert icon.svg -resize 256x256 icon.iconset/icon_256x256.png
convert icon.svg -resize 512x512 icon.iconset/icon_256x256@2x.png
convert icon.svg -resize 512x512 icon.iconset/icon_512x512.png
convert icon.svg -resize 1024x1024 icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
mv icon.icns ../
rm -rf icon.iconset
```

### 方法 3: 使用设计软件

1. 使用 Adobe Illustrator、Figma、Sketch 等设计软件打开 `icon.svg`
2. 导出为所需尺寸的 PNG 文件
3. 使用专门的工具生成 ICO 和 ICNS 文件

## 临时方案

在生成完整图标集之前，可以使用以下命令快速创建占位图标：

```bash
# 使用 ImageMagick 创建简单的占位图标
convert -size 32x32 xc:blue 32x32.png
convert -size 128x128 xc:blue 128x128.png
convert -size 256x256 xc:blue 128x128@2x.png
convert -size 64x64 xc:blue icon.png
```

注意：这只是临时占位符，建议尽快使用 SVG 生成正式图标。
