/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('weapon_weapon_traits').del()
  await knex('weapon_weapon_class').del()
  await knex('weapon_upgrade').del()
  await knex('weapon').del()
  await knex('item').del()
  await knex('availability').del()

  await knex('availability').insert([
    { name: 'Common' },
    { name: 'Uncommon' },
    { name: 'Rare' },
    { name: 'Very Rare' },
    { name: 'Legendary' }
  ])
}
