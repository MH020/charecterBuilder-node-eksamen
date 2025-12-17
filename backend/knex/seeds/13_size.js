/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('size').del()

  // Inserts seed entries (IDs auto-generated)
  await knex('size').insert([
    {
      name: 'Tiny',
      score: 2
    },
    {
      name: 'Small',
      score: 3
    },
    {
      name: 'Medium',
      score: 4
    },
    {
      name: 'Large',
      score: 6
    },
    {
      name: 'Huge',
      score: 8
    },
    {
      name: 'Gargantuan',
      score: 10
    }
  ])
}
