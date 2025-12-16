/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries

  await knex('availability').insert([
    { name: 'Common' },
    { name: 'Uncommon' },
    { name: 'Rare' },
    { name: 'Very Rare' },
    { name: 'Legendary' }
  ])
}
