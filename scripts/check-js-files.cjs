#!/usr/bin/env node

/**
 * check-js-files.js
 * 
 * 检查项目中是否存在不应该存在的 .js 文件
 * 用法: pnpm check:js
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

function findJSFiles(dir, excludePatterns = []) {
    let results = [];
    
    function walk(currentPath) {
        if (!fs.existsSync(currentPath)) return;
        
        const stat = fs.statSync(currentPath);
        if (!stat.isDirectory()) {
            if (currentPath.endsWith('.js')) {
                // 检查是否应该排除
                const shouldExclude = excludePatterns.some(pattern => 
                    currentPath.includes(pattern)
                );
                if (!shouldExclude) {
                    results.push(currentPath);
                }
            }
            return;
        }
        
        try {
            const files = fs.readdirSync(currentPath);
            for (const file of files) {
                const filePath = path.join(currentPath, file);
                
                // 跳过特定目录
                if (['node_modules', '.git', 'dist', '.vite'].includes(file)) {
                    continue;
                }
                
                walk(filePath);
            }
        } catch (err) {
            // 忽略权限错误等
        }
    }
    
    walk(dir);
    return results;
}

function main() {
    log('🔍 正在检查项目中的 .js 文件...\n', 'blue');
    
    const rootDir = process.cwd();
    let hasErrors = false;
    
    // 1. 检查 src/ 目录下的 .js 文件
    log('📁 检查 src/ 目录...', 'yellow');
    const srcFiles = findJSFiles(path.join(rootDir, 'src'))
        .filter(f => !f.endsWith('.test.js') && !f.endsWith('.spec.js'));
    
    if (srcFiles.length > 0) {
        hasErrors = true;
        log(`  ❌ 发现 ${srcFiles.length} 个不应该存在的 .js 文件:`, 'red');
        srcFiles.forEach(f => log(`     ✗ ${path.relative(rootDir, f)}`, 'red'));
    } else {
        log('  ✅ src/ 目录干净（无冗余 .js 文件）', 'green');
    }
    
    // 2. 检查根目录的配置文件副本
    log('\n📁 检查根目录配置文件...', 'yellow');
    const configFiles = [
        'vite.config.js',
        'tailwind.config.js', 
        'postcss.config.js'
    ];
    
    const foundConfigs = configFiles.filter(f => fs.existsSync(path.join(rootDir, f)));
    if (foundConfigs.length > 0) {
        hasErrors = true;
        log(`  ❌ 发现 ${foundConfigs.length} 个重复配置文件:`, 'red');
        foundConfigs.forEach(f => log(`     ✗ ${f} (应使用 .ts 版本)`, 'red'));
    } else {
        log('  ✅ 根目录配置文件正常', 'green');
    }
    
    // 3. 检查 .vue.js 编译产物
    log('\n📁 检查 Vue SFC 编译产物...', 'yellow');
    const vueJsFiles = findJSFiles(rootDir).filter(f => f.endsWith('.vue.js'));
    
    if (vueJsFiles.length > 0) {
        hasErrors = true;
        log(`  ❌ 发现 ${vueJsFiles.length} 个 .vue.js 编译产物:`, 'red');
        vueJsFiles.slice(0, 5).forEach(f => log(`     ✗ ${path.relative(rootDir, f)}`, 'red'));
        if (vueJsFiles.length > 5) {
            log(`     ... 还有 ${vueJsFiles.length - 5} 个文件`, 'red');
        }
    } else {
        log('  ✅ 无 .vue.js 编译产物', 'green');
    }
    
    // 输出结果
    console.log('');
    if (hasErrors) {
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'red');
        log('❌ 检查失败！发现不应存在的 .js 文件', 'red');
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'red');
        log('\n💡 解决方案:', 'yellow');
        log('   运行清理命令: pnpm clean:js', 'yellow');
        log('   或手动删除上述文件\n', 'yellow');
        process.exit(1);
    } else {
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
        log('✅ 检查通过！项目无冗余 .js 文件', 'green');
        log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
        process.exit(0);
    }
}

main();