/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('race').del();

  // ---- Resolve Sizes ----
  const mediumSize = await knex('size').where({ name: 'Medium' }).first();
  const largeSize = await knex('size').where({ name: 'Large' }).first();

  // ---- Resolve Human Statlines ----
  const humanStatlines = await knex('statline_race')
    .where({ name: 'Human' })
    .orderBy('weapon_skill', 'asc');

  const humanMin = humanStatlines[0];
  const humanMax = humanStatlines[1];

  // ---- Resolve Astartes Statlines ----
  const astartesStatlines = await knex('statline_race')
    .where({ name: 'Adeptus Astartes' })
    .orderBy('weapon_skill', 'asc');

  const astartesMin = astartesStatlines[0];
  const astartesMax = astartesStatlines[1];

  // ---- Insert Races ----
  await knex('race').insert([
    {
      name: 'Human',
      description: 'Baseline humanoids of the Imperium, adaptable and widespread.',
      size_id: mediumSize.id,
      wounds: 10,
      base_statline_id: humanMin.id,
      max_statline_id: humanMax.id,
      is_custom: false
    },
    {
      name: 'Adeptus Astartes',
      description: 'Genetically enhanced super-soldiers created by the Emperor.',
      size_id: largeSize.id,
      wounds: 18,
      base_statline_id: astartesMin.id,
      max_statline_id: astartesMax.id,
      is_custom: false
    }
  ]);
}
