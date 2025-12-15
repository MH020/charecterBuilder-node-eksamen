/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries

  await knex('skill').del()

  const [agility] = await knex('aptitude').where({ name: 'Agility' })
  const [awareness] = await knex('aptitude').where({ name: 'Awareness' })
  const [strength] = await knex('aptitude').where({ name: 'Strength' })
  const [intelligence] = await knex('aptitude').where({ name: 'intelligence' })
  const [charisma] = await knex('aptitude').where({ name: 'Charisma' })

  await knex('skill').insert([
    {
      name: 'Stealth',
      description: 'Ability to move silently and avoid detection.',
      main_aptitude_id: agility.id,
      secondary_aptitude_id: awareness.id,
      is_custom: false
    },
    {
      name: 'Athletics',
      description: 'General physical prowess including running, jumping, and climbing.',
      main_aptitude_id: strength.id,
      secondary_aptitude_id: agility.id,
      is_custom: false
    },
    {
      name: 'Arcana',
      description: 'Knowledge of magical lore, spells, and mystical phenomena.',
      main_aptitude_id: intelligence.id,
      secondary_aptitude_id: awareness.id,
      is_custom: false
    },
    {
      name: 'Persuasion',
      description: 'Ability to influence others using words and demeanor.',
      main_aptitude_id: charisma.id,
      secondary_aptitude_id: strength.id,
      is_custom: false
    },
    {
      name: 'Survival',
      description: 'Expertise in wilderness knowledge, tracking, and foraging.',
      main_aptitude_id: strength.id,
      secondary_aptitude_id: intelligence.id,
      is_custom: false
    }
  ])
}
