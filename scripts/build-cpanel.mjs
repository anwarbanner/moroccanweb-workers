// Builds the site and prepares the `cpanel-app/` folder deployed by cPanel (see .cpanel.yml).
// Usage: npm run build:cpanel   (works on Windows, macOS and Linux)
import { execSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';

const OUT = 'cpanel-app';
execSync('npx next build', { stdio: 'inherit' });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('.next/standalone/server.js', `${OUT}/server.js`);
cpSync('.next/standalone/.next', `${OUT}/.next`, { recursive: true });
cpSync('.next/static', `${OUT}/.next/static`, { recursive: true });
cpSync('public', `${OUT}/public`, { recursive: true });
rmSync(`${OUT}/.next/cache`, { recursive: true, force: true });

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const lock = (n) => {
  const p = `node_modules/${n}/package.json`;
  return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')).version : pkg.dependencies[n];
};
writeFileSync(
  `${OUT}/package.json`,
  JSON.stringify(
    {
      name: 'mww-digital-studio',
      version: pkg.version,
      private: true,
      main: 'server.js',
      scripts: { start: 'node server.js' },
      dependencies: { next: lock('next'), react: lock('react'), 'react-dom': lock('react-dom') },
      engines: { node: '>=18.18.0' },
    },
    null,
    2,
  ) + '\n',
);
console.log(`\n✓ ${OUT}/ is ready. Commit & push, then in cPanel: Git Version Control → Deploy HEAD Commit.`);
