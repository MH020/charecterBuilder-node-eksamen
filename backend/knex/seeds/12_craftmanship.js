/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('craftsmanship').del();
  
  await knex('craftsmanship').insert([
    {
      id: 1,
      name: 'Awful',
      description: 'Melee: -2 damage, gain Unbalanced (upgrade to Unwieldy if already had it). Ranged: -2 damage, gain Unreliable and Dangerous. Armor: +50% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: -2,
      wt_modifier: 50,
      ap_modifier: -1,
      category: 'melee'
    },
    {
      id: 2,
      name: 'Awful',
      description: 'Melee: -2 damage, gain Unbalanced (upgrade to Unwieldy if already had it). Ranged: -2 damage, gain Unreliable and Dangerous. Armor: +50% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: -2,
      wt_modifier: 50,
      ap_modifier: -1,
      category: 'ranged'
    },
    {
      id: 3,
      name: 'Awful',
      description: 'Melee: -2 damage, gain Unbalanced (upgrade to Unwieldy if already had it). Ranged: -2 damage, gain Unreliable and Dangerous. Armor: +50% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: 50,
      ap_modifier: -1,
      category: 'armor'
    },
    {
      id: 4,
      name: 'Poor',
      description: 'Melee: -1 damage, gain Unbalanced. Ranged: -1 damage, gain Unreliable. Armor: +25% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: -1,
      wt_modifier: 25,
      ap_modifier: -1,
      category: 'melee'
    },
    {
      id: 5,
      name: 'Poor',
      description: 'Melee: -1 damage, gain Unbalanced. Ranged: -1 damage, gain Unreliable. Armor: +25% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: -1,
      wt_modifier: 25,
      ap_modifier: -1,
      category: 'ranged'
    },
    {
      id: 6,
      name: 'Poor',
      description: 'Melee: -1 damage, gain Unbalanced. Ranged: -1 damage, gain Unreliable. Armor: +25% weight, -1 AP.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: 25,
      ap_modifier: -1,
      category: 'armor'
    },
    {
      id: 7,
      name: 'Standard',
      description: 'No modifiers, standard quality.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: 0,
      ap_modifier: 0,
      category: 'melee'
    },
    {
      id: 8,
      name: 'Standard',
      description: 'No modifiers, standard quality.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: 0,
      ap_modifier: 0,
      category: 'ranged'
    },
    {
      id: 9,
      name: 'Standard',
      description: 'No modifiers, standard quality.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: 0,
      ap_modifier: 0,
      category: 'armor'
    },
    {
      id: 10,
      name: 'Excellent',
      description: 'Melee: +1 damage, gain Balanced. Ranged: +1 damage, gain Reliable. Armor: -25% weight, +1 AP.',
      hit_modifier: 0,
      damage_modifier: 1,
      wt_modifier: -25,
      ap_modifier: 1,
      category: 'melee'
    },
    {
      id: 11,
      name: 'Excellent',
      description: 'Melee: +1 damage, gain Balanced. Ranged: +1 damage, gain Reliable. Armor: -25% weight, +1 AP.',
      hit_modifier: 0,
      damage_modifier: 1,
      wt_modifier: -25,
      ap_modifier: 1,
      category: 'ranged'
    },
    {
      id: 12,
      name: 'Excellent',
      description: 'Melee: +1 damage, gain Balanced. Ranged: +1 damage, gain Reliable. Armor: -25% weight, +1 AP.',
      hit_modifier: 0,
      damage_modifier: 0,
      wt_modifier: -25,
      ap_modifier: 1,
      category: 'armor'
    }
  ]);
};
