/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('weapon_weapon_traits').del()
  await knex('weapon_weapon_class').del()
  await knex('lineage_characteristic_bonus').del()
    await knex('lineage_aptitude').del()
  await knex('weapon_upgrade').del()
  await knex('weapon').del()
  await knex('item').del()
  await knex('armor').del()
  await knex('availability').del()
  await knex('characteristic').del();
  await knex('lineage').del();
  await knex('race').del();

  // Inserts seed entries (IDs auto-generated)
  await knex('characteristic').insert([
    {
      name: 'Weapon Skill',
      description: 'Represents a model’s skill in melee combat.'
    },
    {
      name: 'Ballistic Skill',
      description: 'Represents a model’s accuracy with ranged weapons.'
    },
    {
      name: 'Strength',
      description: 'Measures how physically powerful a model is.'
    },
    {
      name: 'Toughness',
      description: 'Represents a model’s ability to resist damage.'
    },
    {
      name: 'Wounds',
      description: 'The amount of damage a model can sustain before being destroyed.'
    },
    {
      name: 'Attacks',
      description: 'The number of melee attacks a model can make.'
    },
    {
      name: 'Leadership',
      description: 'Represents a model’s morale and discipline.'
    },
    {
      name: 'Save',
      description: 'The armor save a model uses to resist incoming damage.'
    }
  ]);
}
