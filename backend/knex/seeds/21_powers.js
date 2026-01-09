/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('power').del()

  const categories = await knex('powers_category').select('id', 'name')

  const getCategoryId = (name) => {
    const category = categories.find(c => c.name === name)
    if (!category) throw new Error(`Category "${name}" not found`)
    return category.id
  }

  await knex('power').insert([
    {
      name: 'Fireball',
      description: 'A ball of fire that burns enemies.',
      powers_category_id: getCategoryId('Elemental'),
      ascendant: 'even bigger boom',
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
      powers_category_id: getCategoryId('Elemental'),
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
      powers_category_id: getCategoryId('Divine'),
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
      powers_category_id: getCategoryId('Martial'),
      ascendant: null,
      duration: 'Instant',
      actions: 1,
      concentration: false,
      dc: null,
      range: 'Melee',
      shape: 'Single Target'
    }
  ])
}
