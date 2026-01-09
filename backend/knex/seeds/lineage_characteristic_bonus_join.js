/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('lineage_characteristic_bonus').del()

  // ---- Resolve Lineages ----
  const hiveWorlder = await knex('lineage').where({ name: 'Hive Worlder' }).first()
  const forgeWorlder = await knex('lineage').where({ name: 'Forge Worlder' }).first()
  const imperialWorlder = await knex('lineage').where({ name: 'Imperial Worlder' }).first()
  const ultramarines = await knex('lineage').where({ name: 'Ultramarines' }).first()
  const spaceWolves = await knex('lineage').where({ name: 'Space Wolves' }).first()
  const bloodAngels = await knex('lineage').where({ name: 'Blood Angels' }).first()

  // ---- Resolve Characteristics ----
  const weaponSkill = await knex('characteristic').where({ name: 'Weapon Skill' }).first()
  const ballisticSkill = await knex('characteristic').where({ name: 'Ballistic Skill' }).first()
  const strength = await knex('characteristic').where({ name: 'Strength' }).first()
  const toughness = await knex('characteristic').where({ name: 'Toughness' }).first()
  const agility = await knex('characteristic').where({ name: 'Attacks' }).first() // Using "Attacks" as example
  const leadership = await knex('characteristic').where({ name: 'Leadership' }).first()
  const save = await knex('characteristic').where({ name: 'Save' }).first()

  await knex('lineage_characteristic_bonus').insert([

    {
      lineage_id: hiveWorlder.id,
      characteristic_id: weaponSkill.id,
      bonus: 5
    },
    {
      lineage_id: hiveWorlder.id,
      characteristic_id: ballisticSkill.id,
      bonus: 5
    },
    {
      lineage_id: forgeWorlder.id,
      characteristic_id: save.id,
      bonus: 2
    },
    {
      lineage_id: imperialWorlder.id,
      characteristic_id: leadership.id,
      bonus: 3
    },
    {
      lineage_id: imperialWorlder.id,
      characteristic_id: ballisticSkill.id,
      bonus: 2
    },

    {
      lineage_id: ultramarines.id,
      characteristic_id: weaponSkill.id,
      bonus: 10
    },
    {
      lineage_id: ultramarines.id,
      characteristic_id: leadership.id,
      bonus: 5
    },
    {
      lineage_id: spaceWolves.id,
      characteristic_id: strength.id,
      bonus: 8
    },
    {
      lineage_id: spaceWolves.id,
      characteristic_id: toughness.id,
      bonus: 6
    },
    {
      lineage_id: bloodAngels.id,
      characteristic_id: agility.id,
      bonus: 7
    },
    {
      lineage_id: bloodAngels.id,
      characteristic_id: weaponSkill.id,
      bonus: 5
    }
  ])
};
