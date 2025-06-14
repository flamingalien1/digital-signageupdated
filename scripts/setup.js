const fs = require('fs')
const readline = require('readline')

const config = JSON.parse(fs.readFileSync('makeconf.json', 'utf8'))
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const questions = Object.entries(config.config)
const answers = {}

;(async () => {
  for (const [key, opts] of questions) {
    const question = `${opts.description || key}${opts.default ? ` (${opts.default})` : ''}: `
    answers[key] = await new Promise(res =>
      rl.question(question, ans => res(ans || opts.default || ''))
    )
  }
  rl.close()
  const lines = Object.entries(answers).map(([k, v]) => `${k}=${v}`)
  fs.writeFileSync(config.file || '.env', lines.join('\n'))
  console.warn(`Created ${config.file || '.env'}`)
})()
