import 'dotenv/config'
import { spawn } from 'child_process'

const dbDevUrl = process.env.DB_URI_DEV
const dbProdUrl = process.env.DB_URI_PROD
const prod = process.argv.includes('prod')
const dev = process.argv.includes('dev')

function connectToDev() {
  if (!dbDevUrl) {
    console.error("No dev connection string")
    return
  }

  const child = spawn('psql', [dbDevUrl], {
    stdio: 'inherit'  
  })

  child.on('exit', (code) => {
    console.log(`psql exited with code ${code}`)
  })
}


function connectToProd() {
  if (!dbDevUrl) {
    console.error("No dev connection string")
    return
  }

  const child = spawn('psql', [dbProdUrl], {
    stdio: 'inherit'  
  })

  child.on('exit', (code) => {
    console.log(`psql exited with code ${code}`)
  })
}

if(dev){
    connectToDev()
} else {
    connectToProd()
}