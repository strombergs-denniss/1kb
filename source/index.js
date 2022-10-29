const fs = require('fs')
const path = require('path')
const Uglify = require('uglify-js')
const { deflateRawSync } = require('node:zlib')

const INPUT_PATH = './input'
const OUTPUT_PATH = './output'

function compress(code) {
    const deflated = deflateRawSync(code).toString('base64')

    return `(async()=>eval(await new Response((await fetch('data:application/octet-stream;base64,${ deflated }').then(r=>r.blob())).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text()))()`
}

fs.readdir(INPUT_PATH, (e, files) => {
    files.forEach(file => {
        const filePath = path.join(INPUT_PATH, file)

        fs.stat(filePath, (e, stat) => {
            if (stat.isFile() && path.extname(filePath) === '.js') {
                try {
                    const data = fs.readFileSync(filePath, 'utf8')
                    const minified = Uglify.minify(data).code
                    const compressed = compress(minified)
                    const output = `<script>${ compressed }</script>`
                    console.log(minified)
                    console.log(minified.length, compressed.length, output.length)

                    fs.writeFileSync(path.join(OUTPUT_PATH, file.replace('.js', '.html')), output)
                } catch (e) {
                    console.error(e)
                }
            }
        })
    })
})
