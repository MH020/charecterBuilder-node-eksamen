/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('class_bonuses').del()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first();
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first();
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first();
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first();
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first();

  // ---- Resolve Characteristics ----
  const weaponSkill = await knex('characteristic').where({ name: 'Weapon Skill' }).first()
  const ballisticSkill = await knex('characteristic').where({ name: 'Ballistic Skill' }).first()
  const strength = await knex('characteristic').where({ name: 'Strength' }).first()
  const toughness = await knex('characteristic').where({ name: 'Toughness' }).first()
  const agility = await knex('characteristic').where({ name: 'Attacks' }).first() // Using "Attacks" as example
  const leadership = await knex('characteristic').where({ name: 'Leadership' }).first()
  const save = await knex('characteristic').where({ name: 'Save' }).first()


  await knex('class_bonuses').insert([


  ])
};
