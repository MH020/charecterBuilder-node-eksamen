/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('aptitude').del();

  await knex('aptitude').insert([
    { id: 1, name: "Agility" },
    { id: 2, name: "Awareness" },
    { id: 3, name: "Strength" },
    { id: 4, name: "intelligence" },
    { id: 5, name: "Charisma" }
  ]);
}
