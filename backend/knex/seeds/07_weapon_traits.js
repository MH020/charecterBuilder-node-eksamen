/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('weapon_trait').del();

  // Inserts seed entries
  await knex('weapon_trait').insert([
    {
      name: 'Accurate',
      description: 'Weapons with this trait gain bonus damage when the wielder takes the Aim action.',
      is_custom: false
    },
    {
      name: 'Tearing',
      description: 'Roll one extra damage die and keep the highest result.',
      is_custom: false
    },
    {
      name: 'Reliable',
      description: 'The weapon rarely jams; reduce the chance of malfunction.',
      is_custom: false
    },
    {
      name: 'Unwieldy',
      description: 'Difficult to use with one hand; cannot be fired while moving.',
      is_custom: false
    },
    {
      name: 'Blast',
      description: 'The weapon deals area-of-effect damage in a radius around the target.',
      is_custom: false
    },
    {
      name: 'Scatter',
      description: 'At close range, the weapon deals additional hits or bonus damage.',
      is_custom: false
    },
    {
      name: 'Balanced',
      description: 'Well-weighted design grants a bonus to parry attempts.',
      is_custom: false
    },
    {
      name: 'Brutal',
      description: 'The weapon delivers devastating impacts, increasing critical injury severity.',
      is_custom: false
    },
    {
      name: 'Flexible',
      description: 'This weapon can be used in cramped spaces without penalty.',
      is_custom: false
    },
    {
      name: 'Custom Craft',
      description: 'A finely made or modified weapon; bonus determined by the GM.',
      is_custom: true
    }
  ]);
}
