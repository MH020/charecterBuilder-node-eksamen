/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('weapon_class').del()


  await knex('weapon_class').insert([
    { name: 'Melee', description: 'Close combat weapons like swords, axes, and daggers' },
    { name: 'Ranged', description: 'Weapons that attack from a distance like bows and firearms' },
    { name: 'Explosive', description: 'Weapons that cause area damage like grenades and rockets' },
    { name: 'Energy', description: 'Advanced energy-based weapons like laser rifles or plasma guns' }
  ])
}
