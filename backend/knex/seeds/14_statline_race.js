/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('statline_race').del()

  await knex('statline_race').insert([
    // ===== HUMAN =====
    {
      name: 'Human',
      weapon_skill: 20,
      ballistic_skill: 20,
      strength: 20,
      toughness: 20,
      agility: 20,
      intelligence: 20,
      perception: 20,
      willpower: 20,
      fellowship: 20,
      is_custom: false
    },
    {
      name: 'Human',
      weapon_skill: 40,
      ballistic_skill: 40,
      strength: 40,
      toughness: 40,
      agility: 40,
      intelligence: 40,
      perception: 40,
      willpower: 40,
      fellowship: 40,
      is_custom: false
    },

    // ===== ADEPTUS ASTARTES =====
    {
      name: 'Adeptus Astartes',
      weapon_skill: 30,
      ballistic_skill: 30,
      strength: 40,
      toughness: 40,
      agility: 20,
      intelligence: 20,
      perception: 30,
      willpower: 30,
      fellowship: 10,
      is_custom: false
    },
    {
      name: 'Adeptus Astartes',
      weapon_skill: 50,
      ballistic_skill: 50,
      strength: 60,
      toughness: 60,
      agility: 40,
      intelligence: 40,
      perception: 50,
      willpower: 50,
      fellowship: 30,
      is_custom: false
    }
  ])
}
