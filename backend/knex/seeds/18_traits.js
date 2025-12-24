/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing traits
  await knex('trait').del()

  // Fetch races
  const human = await knex('race').where({ name: 'Human' }).first()
  const astartes = await knex('race').where({ name: 'Adeptus Astartes' }).first()

  await knex('trait').insert([
    // ---------- Human ----------
    {
      name: 'Adaptive Learning',
      description: 'Humans learn new skills faster than most species.',
      has_input: true,
      race_id: human?.id ?? null,
      is_custom: false,
      category: 'blessing',
    },
    {
      name: 'Sheer Determination',
      description: 'Once per mission, reroll a failed test.',
      has_input: false,
      race_id: human?.id ?? null,
      is_custom: false,
      category: 'blessing',
    },

    // ---------- Adeptus Astartes ----------
    {
      name: 'Gene-Wrought Physiology',
      description: 'Enhanced organs grant superior strength and resilience.',
      has_input: false,
      race_id: astartes?.id ?? null,
      is_custom: false,
      category: 'blessing',
    },
    {
      name: 'And They Shall Know No Fear',
      description: 'Immune to panic and fear effects.',
      has_input: false,
      race_id: astartes?.id ?? null,
      is_custom: false,
      category: 'blessing',
    },

    // ---------- Generic / No race ----------
    {
      name: 'Paranoia',
      description: 'Suffers penalties when trusting others.',
      has_input: false,
      race_id: null,
      is_custom: false,
      category: 'disorder',
    },
    {
      name: 'Dark Ambition',
      description: 'Gain bonuses when pursuing personal goals at a cost.',
      has_input: true,
      race_id: null,
      is_custom: false,
      category: 'malice',
    },
  ])
}
