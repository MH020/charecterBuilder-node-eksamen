/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('category').del()

  await knex('category').insert([
    {name: 'Blade', description: 'Swords, daggers, axes', category_type: 'Melee' },
    {name: 'Firearm', description: 'Guns and rifles', category_type: 'Ranged' },
    {name: 'Explosive', description: 'Grenades, rockets, bombs', category_type: 'Explosive' },
    {name: 'Energy', description: 'Lasers, plasma weapons', category_type: 'Energy' },
    {name: 'Thrown', description: 'Knives, throwing axes', category_type: 'Melee' }
  ])
}
