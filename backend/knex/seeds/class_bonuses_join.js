/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing data
  await knex('class_bonuses').del();

  // Fetch classes
  const guardsman = await knex('class').where({ name: 'Guardsman' }).first();
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first();
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first();
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first();
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first();

  // Fetch characteristics (updated to your current table)
  const weaponSkill = await knex('characteristic').where({ name: 'Weapon Skill' }).first();
  const ballisticSkill = await knex('characteristic').where({ name: 'Ballistic Skill' }).first();
  const strength = await knex('characteristic').where({ name: 'Strength' }).first();
  const toughness = await knex('characteristic').where({ name: 'Toughness' }).first();
  const agility = await knex('characteristic').where({ name: 'Agility' }).first();
  const intelligence = await knex('characteristic').where({ name: 'Intelligence' }).first();
  const perception = await knex('characteristic').where({ name: 'Perception' }).first();
  const willpower = await knex('characteristic').where({ name: 'Willpower' }).first();
  const fellowship = await knex('characteristic').where({ name: 'Fellowship' }).first();

  await knex('class_bonuses').insert([
    // Guardsman
    { class_id: guardsman.id, characteristic_id: ballisticSkill.id, bonus: 5 },
    { class_id: guardsman.id, characteristic_id: fellowship.id, bonus: 5 }, // replaced Leadership

    // Tactical Marine
    { class_id: tacticalMarine.id, characteristic_id: weaponSkill.id, bonus: 10 },
    { class_id: tacticalMarine.id, characteristic_id: toughness.id, bonus: 10 },
    { class_id: tacticalMarine.id, characteristic_id: willpower.id, bonus: 5 }, // replaced Save

    // Assault Marine
    { class_id: assaultMarine.id, characteristic_id: weaponSkill.id, bonus: 10 },
    { class_id: assaultMarine.id, characteristic_id: strength.id, bonus: 10 },
    { class_id: assaultMarine.id, characteristic_id: agility.id, bonus: 5 }, // replaced Attacks

    // Tech-Priest Enginseer
    { class_id: techPriest.id, characteristic_id: toughness.id, bonus: 5 },
    { class_id: techPriest.id, characteristic_id: willpower.id, bonus: 10 }, // replaced Save

    // Interrogator (Inquisition)
    { class_id: inquisitor.id, characteristic_id: fellowship.id, bonus: 10 }, // replaced Leadership
    { class_id: inquisitor.id, characteristic_id: weaponSkill.id, bonus: 5 }
  ]);
}
