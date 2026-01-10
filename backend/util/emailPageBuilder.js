import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const signUpHTMLPath = path.join(__dirname, 'emailPages', 'signup.html')
const signUpHTML = fs.readFileSync(signUpHTMLPath, 'utf-8')

export function buildSignUpEmail (username, verificationCode) {
  return signUpHTML
    .replace('$$userName$$', username)
    .replace('$$verificationCode$$', verificationCode)
}
