/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('skill').del();
  await knex('aptitude').del();

  await knex('aptitude').insert([
    {name: "Agility" },
    {name: "Awareness" },
    {name: "Strength" },
    {name: "intelligence" },
    {name: "Charisma" }
  ]);
}
