/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('statline_race').del()

  // Define a mapping of your characteristic names to statline_race columns
  const statColumns = {
    'Weapon Skill': 'weapon_skill',
    'Ballistic Skill': 'ballistic_skill',
    Strength: 'strength',
    Toughness: 'toughness',
    Agility: 'agility',
    Intelligence: 'intelligence',
    Perception: 'perception',
    Willpower: 'willpower',
    Fellowship: 'fellowship'
  }

  // Helper to create a statline object
  const createStatline = (name, values) => ({
    name,
    weapon_skill: values[statColumns['Weapon Skill']],
    ballistic_skill: values[statColumns['Ballistic Skill']],
    strength: values[statColumns.Strength],
    toughness: values[statColumns.Toughness],
    agility: values[statColumns.Agility],
    intelligence: values[statColumns.Intelligence],
    perception: values[statColumns.Perception],
    willpower: values[statColumns.Willpower],
    fellowship: values[statColumns.Fellowship],
    is_custom: false
  })

  await knex('statline_race').insert([
    createStatline('Human', {
      weapon_skill: 20,
      ballistic_skill: 20,
      strength: 20,
      toughness: 20,
      agility: 20,
      intelligence: 20,
      perception: 20,
      willpower: 20,
      fellowship: 20
    }),
    createStatline('Human', {
      weapon_skill: 40,
      ballistic_skill: 40,
      strength: 40,
      toughness: 40,
      agility: 40,
      intelligence: 40,
      perception: 40,
      willpower: 40,
      fellowship: 40
    }),
    createStatline('Adeptus Astartes', {
      weapon_skill: 30,
      ballistic_skill: 30,
      strength: 40,
      toughness: 40,
      agility: 20,
      intelligence: 20,
      perception: 30,
      willpower: 30,
      fellowship: 10
    }),
    createStatline('Adeptus Astartes', {
      weapon_skill: 50,
      ballistic_skill: 50,
      strength: 60,
      toughness: 60,
      agility: 40,
      intelligence: 40,
      perception: 50,
      willpower: 50,
      fellowship: 30
    })
  ])
}
