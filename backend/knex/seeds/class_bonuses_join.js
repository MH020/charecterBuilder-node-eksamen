/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Clear existing data
  await knex('class_bonuses').del();

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first();
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first();
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first();
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first();
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first();


  const weaponSkill = await knex('characteristic').where({ name: 'Weapon Skill' }).first();
  const ballisticSkill = await knex('characteristic').where({ name: 'Ballistic Skill' }).first();
  const strength = await knex('characteristic').where({ name: 'Strength' }).first();
  const toughness = await knex('characteristic').where({ name: 'Toughness' }).first();
  const attacks = await knex('characteristic').where({ name: 'Attacks' }).first();
  const leadership = await knex('characteristic').where({ name: 'Leadership' }).first();
  const save = await knex('characteristic').where({ name: 'Save' }).first();


  await knex('class_bonuses').insert([
    // Guardsman
    { class_id: guardsman.id, characteristic_id: ballisticSkill.id, bonus: 5 },
    { class_id: guardsman.id, characteristic_id: leadership.id, bonus: 5 },

    // Tactical Marine
    { class_id: tacticalMarine.id, characteristic_id: weaponSkill.id, bonus: 10 },
    { class_id: tacticalMarine.id, characteristic_id: toughness.id, bonus: 10 },
    { class_id: tacticalMarine.id, characteristic_id: save.id, bonus: 5 },

    // Assault Marine
    { class_id: assaultMarine.id, characteristic_id: weaponSkill.id, bonus: 10 },
    { class_id: assaultMarine.id, characteristic_id: strength.id, bonus: 10 },
    { class_id: assaultMarine.id, characteristic_id: attacks.id, bonus: 5 },

    // Tech-Priest Enginseer
    { class_id: techPriest.id, characteristic_id: toughness.id, bonus: 5 },
    { class_id: techPriest.id, characteristic_id: save.id, bonus: 10 },

    // Interrogator (Inquisition)
    { class_id: inquisitor.id, characteristic_id: leadership.id, bonus: 10 },
    { class_id: inquisitor.id, characteristic_id: weaponSkill.id, bonus: 5 }
  ]);
}
