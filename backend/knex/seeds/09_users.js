import 'dotenv/config'
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import auth from '../../util/encrypter.js'  

export async function seed(knex) {
  await knex('user').del();

  const hashedPassword = await auth.encryptPassword(process.env.ADMIN_PASSWORD);


  const [admin] = await knex('user')
    .insert({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      email: process.env.ADMIN_EMAIL,
      verification_code: process.env.ADMIN_CODE,
      verified: true,
      role: 'OWNER'
    })
    .returning('*'); 

  console.log('Admin user created:', admin);
}
