import fs from 'fs';
import path from 'path';

const files = process.argv.slice(2);
const missingTests = [];

const projectRoot = process.cwd();

for (const file of files) {
    const absolutePath = path.resolve(projectRoot, file);
    let testPath = '';
    let testPath2 = ''; // For PHP Feature tests

    // Frontend: src/app/**/*.{ts,tsx} (excluding .test.tsx, layout.tsx, page.tsx, globals.css)
    if (absolutePath.includes(path.join('frontend', 'src')) && (absolutePath.endsWith('.tsx') || absolutePath.endsWith('.ts')) && !absolutePath.includes('.test.')) {
        const baseName = path.basename(file);
        if (baseName !== 'layout.tsx' && baseName !== 'page.tsx' && baseName !== 'globals.css') {
            testPath = absolutePath.replace(/\.(ts|tsx)$/, '.test.tsx');
        }
    }
    // Backend: app/Models/**/*.php or app/Http/Controllers/**/*.php
    else if (absolutePath.includes(path.join('backend', 'app')) && absolutePath.endsWith('.php')) {
        if (absolutePath.includes(path.join('app', 'Models'))) {
            const modelName = path.basename(file, '.php');
            testPath = path.join(projectRoot, 'backend', 'tests', 'Unit', `${modelName}Test.php`);
        }
        if (absolutePath.includes(path.join('app', 'Http', 'Controllers'))) {
            const controllerName = path.basename(file, '.php');
            testPath = path.join(projectRoot, 'backend', 'tests', 'Feature', `${controllerName}Test.php`);
        }
    }

    let testFileExists = false;
    if (testPath && fs.existsSync(testPath)) {
        testFileExists = true;
    }

    if (testPath && !testFileExists) {
        missingTests.push({ file, expectedTest: testPath });
    }
}

if (missingTests.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', '\nError: Missing tests for the following files:');
    missingTests.forEach(item => {
        console.error(`  - File: ${item.file}`);
        console.error(`    Expected test: ${path.relative(projectRoot, item.expectedTest)}\n`);
    });
    console.error('\x1b[33m%s\x1b[0m', 'Please generate them by asking the assistant: "Create a test for <file_path>"\n');
    process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', '\n✅ All new/modified files have corresponding tests.\n');
process.exit(0);
