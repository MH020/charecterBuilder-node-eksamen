/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('weapon_class').del()

  await knex('weapon_class').insert([
    { name: 'Pistol', description: 'Close combat weapons like swords, axes, and daggers' },
    { name: 'Carbine', description: 'Weapons that attack from a distance like bows and firearms' },
    { name: 'Long Rifle:', description: 'Weapons that cause area damage like grenades and rockets' },
    { name: 'Heavy', description: 'Advanced energy-based weapons like laser rifles or plasma guns' },
    { name: 'Super Heavy', description: 'Advanced energy-based weapons like laser rifles or plasma guns' }
  ])
}
