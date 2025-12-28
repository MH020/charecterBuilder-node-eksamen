/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('powers_category').del();

  // Inserts seed categories
  await knex('powers_category').insert([
    { name: 'Martial' },
    { name: 'Arcane' },
    { name: 'Divine' },
    { name: 'Psionic' },
    { name: 'Elemental' },
    { name: 'Shadow' },
    { name: 'Nature' },
    { name: 'Blood' },
    { name: 'Temporal' },
    { name: 'Support' }
  ]);
}
