// thx for @teidesu
const fs = require('node:fs')
const path = require('node:path')

module.exports = {
    includeVersion: true,

    excludePrivate: true,
    excludeExternals: true,
    excludeNotDocumented: true,
    excludeInternal: true,
    exclude: [
        '**/*/node_modules',
        '**/*.test.ts',
    ],
    externalPattern: ['**/dist/**'],
    name: 'tsemrtd',
    out: '../../docs',
    entryPoints: fs.readdirSync(path.join(__dirname, '../../src')).map(it => `../../src/${it}`),
    entryPointStrategy: "expand"
}