// @ts-check

// Library
import * as esbuild from 'esbuild';

/** Boolean indicating whether the current build is for production */
const isProduction = process.argv.includes("--production");

/** @type {esbuild.BuildOptions} */
const options = {
    platform: "browser", // Target the browser
    bundle: true,        // Bundle all dependencies into a single file
    minify: isProduction, // Minify the bundle if in production
    sourcemap: !isProduction, // Generate sourcemaps if in development
    entryPoints: ["src/index.ts"], // Entry point
    outfile: "dist/index.js", // Output file
    mainFields: ["module", "main"], // Use the module field in package.json files
    target: "es2020", // Target ES2020
    format: "esm", // Output format
};

// Build
async function build() {
    const result = await esbuild.build(options);
    result.warnings.forEach(warning => console.warn(warning));
    result.errors.forEach(error => console.error(error));
    result.outputFiles?.forEach(file => {
        console.log(`✅ Built ${file.path}`);
    });
}

// Main
try {
    await build();
} catch (error) {
    process.stderr.write(error.stderr);
    process.exit(1);
}
