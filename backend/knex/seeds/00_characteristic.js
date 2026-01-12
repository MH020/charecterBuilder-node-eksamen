/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Join tables
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
  await knex('power').del()
  await knex('powers_category').del()

  // Insert characteristics with correct descriptions
  await knex('characteristic').insert([
    {
      name: 'Weapon Skill',
      description: 'Represents a model’s skill and accuracy in melee combat.'
    },
    {
      name: 'Ballistic Skill',
      description: 'Represents a model’s accuracy and effectiveness with ranged weapons.'
    },
    {
      name: 'Strength',
      description: 'Measures the physical power of a model, affecting melee damage and carrying capacity.'
    },
    {
      name: 'Toughness',
      description: 'Represents how resistant a model is to damage and injury.'
    },
    {
      name: 'Agility',
      description: 'Reflects a model’s speed, reflexes, and ability to dodge attacks.'
    },
    {
      name: 'Intelligence',
      description: 'Measures a model’s reasoning, memory, and problem-solving ability.'
    },
    {
      name: 'Perception',
      description: 'Represents a model’s awareness of their surroundings and ability to detect hidden threats.'
    },
    {
      name: 'Willpower',
      description: 'Indicates mental resilience, discipline, and resistance to fear or psychic influence.'
    },
    {
      name: 'Fellowship',
      description: 'Represents social skills, charisma, and ability to influence or lead others.'
    }
  ])
}
