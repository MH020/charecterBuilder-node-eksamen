/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('power').del();

  // Inserts seed powers
  await knex('power').insert([
    {
      name: 'Fireball',
      description: 'A ball of fire that burns enemies.',
      ascendant: 'even biggger boom',
      duration: 'Instant',
      actions: 1,
      concentration: false,
      dc: 15,
      range: '30 feet',
      shape: 'Sphere'
    },
    {
      name: 'Ice Spike',
      description: 'Sharp icicles launch at a target.',
      ascendant: '100d10 ice damage',
      duration: 'Instant',
      actions: 1,
      concentration: false,
      dc: 13,
      range: '25 feet',
      shape: 'Line'
    },
    {
      name: 'Healing Light',
      description: 'Restores health to an ally.',
      ascendant: null,
      duration: 'Instant',
      actions: 1,
      concentration: false,
      dc: null,
      range: 'Touch',
      shape: 'Single Target'
    },
    {
      name: 'Shield Bash',
      description: 'Strike an enemy with your shield.',
      ascendant: null,
      duration: 'Instant',
      actions: 1,
      concentration: false,
      dc: null,
      range: 'Melee',
      shape: 'Single Target'
    }
  ]);
}
