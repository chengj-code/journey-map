#!/usr/bin/env node

/**
 * clean-js-files.js
 * 
 * 清理项目中不应该存在的 .js 文件
 * 用法: pnpm clean:js
 */

const fs = require('fs');
const path = require('path');

// 颜色输出
const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteFile(filePath) {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
}

function findAndDeleteJSFiles(dir) {
    let deleted = [];
    
    function walk(currentPath) {
        if (!fs.existsSync(currentPath)) return;
        
        const stat = fs.statSync(currentPath);
        if (!stat.isDirectory()) {
            if (currentPath.endsWith('.js') && !currentPath.endsWith('.test.js')) {
                if (deleteFile(currentPath)) {
                    deleted.push(currentPath);
                }
            }
            return;
        }
        
        // 跳过特定目录
        const basename = path.basename(currentPath);
        if (['node_modules', '.git', 'dist', '.vite', 'scripts'].includes(basename)) {
            return;
        }
        
        try {
            const files = fs.readdirSync(currentPath);
            for (const file of files) {
                walk(path.join(currentPath, file));
            }
        } catch (err) {
            // 忽略错误
        }
    }
    
    walk(dir);
    return deleted;
}

function main() {
    log('🧹 开始清理冗余 .js 文件...\n', 'blue');
    
    const rootDir = process.cwd();
    let totalDeleted = 0;
    
    // 1. 删除 src/ 目录下的 .js 文件
    log('📁 清理 src/ 目录...', 'yellow');
    const srcFiles = findAndDeleteJSFiles(path.join(rootDir, 'src'));
    if (srcFiles.length > 0) {
        totalDeleted += srcFiles.length;
        log(`  ✅ 已删除 ${srcFiles.length} 个文件:`, 'green');
        srcFiles.forEach(f => log(`     🗑️  ${path.relative(rootDir, f)}`, 'green'));
    } else {
        log('  ✅ 无需清理', 'green');
    }
    
    // 2. 删除根目录的配置文件副本
    log('\n📁 清理根目录配置文件...', 'yellow');
    const configFiles = [
        'vite.config.js',
        'tailwind.config.js',
        'postcss.config.js'
    ];
    
    let deletedConfigs = 0;
    for (const configFile of configFiles) {
        const filePath = path.join(rootDir, configFile);
        if (deleteFile(filePath)) {
            deletedConfigs++;
            totalDeleted++;
            log(`     🗑️  ${configFile}`, 'green');
        }
    }
    
    if (deletedConfigs > 0) {
        log(`  ✅ 已删除 ${deletedConfigs} 个配置文件`, 'green');
    } else {
        log('  ✅ 无需清理', 'green');
    }
    
    // 3. 删除 .vue.js 编译产物
    log('\n📁 清理 .vue.js 编译产物...', 'yellow');
    function findVueJSFiles(dir) {
        let results = [];
        function walk(currentPath) {
            if (!fs.existsSync(currentPath)) return;
            
            const stat = fs.statSync(currentPath);
            if (!stat.isDirectory()) {
                if (currentPath.endsWith('.vue.js')) {
                    results.push(currentPath);
                }
                return;
            }
            
            const basename = path.basename(currentPath);
            if (['node_modules', '.git', 'dist'].includes(basename)) return;
            
            try {
                const files = fs.readdirSync(currentPath);
                for (const file of files) {
                    walk(path.join(currentPath, file));
                }
            } catch (err) {}
        }
        walk(dir);
        return results;
    }
    
    const vueJsFiles = findVueJSFiles(rootDir);
    let deletedVueJs = 0;
    
    for (const file of vueJsFiles) {
        if (deleteFile(file)) {
            deletedVueJs++;
            totalDeleted++;
        }
    }
    
    if (deletedVueJs > 0) {
        log(`  ✅ 已删除 ${deletedVueJs} 个 .vue.js 文件`, 'green');
    } else {
        log('  ✅ 无需清理', 'green');
    }
    
    // 输出结果
    console.log('');
    if (totalDeleted > 0) {
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
        log(`✨ 清理完成！共删除 ${totalDeleted} 个文件`, 'green');
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
    } else {
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
        log('✅ 项目已经很干净，无需清理', 'blue');
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'blue');
    }
    
    process.exit(0);
}

main();