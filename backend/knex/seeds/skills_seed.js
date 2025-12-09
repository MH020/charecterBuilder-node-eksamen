/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('skill').del();

  await knex('skill').insert([
    {
      id: 1,
      name: "Stealth",
      description: "Ability to move silently and avoid detection.",
      main_aptitude_id: 1,
      secondary_aptitude_id: 2,
      is_custom: false
    },
    {
      id: 2,
      name: "Athletics",
      description: "General physical prowess including running, jumping, and climbing.",
      main_aptitude_id: 3,
      secondary_aptitude_id: 1,
      is_custom: false
    },
    {
      id: 3,
      name: "Arcana",
      description: "Knowledge of magical lore, spells, and mystical phenomena.",
      main_aptitude_id: 4,
      secondary_aptitude_id: 2,
      is_custom: false
    },
    {
      id: 4,
      name: "Persuasion",
      description: "Ability to influence others using words and demeanor.",
      main_aptitude_id: 5,
      secondary_aptitude_id: 3,
      is_custom: false
    },
    {
      id: 5,
      name: "Survival",
      description: "Expertise in wilderness knowledge, tracking, and foraging.",
      main_aptitude_id: 3,
      secondary_aptitude_id: 4,
      is_custom: false
    }
  ]);
}
