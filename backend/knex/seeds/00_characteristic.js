/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
// join tables
  await knex('class_weapon_training').del()
  await knex('class_weapon_class').del()
  await knex('class_talents').del()
  await knex('class_aptitudes').del()
  await knex('class_bonuses').del()
  await knex('class_powers').del()
  await knex('class_powers_known').del()
  await knex('class_traits').del()
  await knex('class_items').del()

  await knex('talent_aptitude').del()
  await knex('prerequisite_powers').del()
  await knex('weapon_weapon_traits').del()
  await knex('weapon_weapon_class').del()
  await knex('lineage_characteristic_bonus').del()
  await knex('lineage_aptitude').del()

  // Core tables
  await knex('weapon_upgrade').del()
  await knex('weapon').del()
  await knex('item').del()
  await knex('armor').del()
  await knex('availability').del()
  await knex('characteristic').del()
  await knex('talent').del()
  await knex('lineage').del()
  await knex('trait').del()
  await knex('race').del()
  await knex('class').del()
  await knex('skill').del()
  await knex('aptitude').del()
  await knex('weapon_class').del()

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
  ])
}
