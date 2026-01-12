/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // First, make sure your 'user' seed ran and admin exists
  const admin = await knex('user').where({ role: 'OWNER' }).first()

  if (!admin) {
    throw new Error('Admin user not found! Make sure the user seed ran first.')
  }

  await knex('campaign').del()

  await knex('campaign').insert([
    {
      title: 'The Lost Mines',
      description: 'A thrilling adventure into the forgotten mines of Phandelver.',
      dm_id: admin.id
    },
    {
      title: 'Dragon Hunt',
      description: 'Players must track down a rogue dragon terrorizing the kingdom.',
      dm_id: admin.id
    },
    {
      title: 'Mystic Shadows',
      description: 'Investigate the mysterious shadow cult spreading fear across the land.',
      dm_id: admin.id
    }
  ])
}
