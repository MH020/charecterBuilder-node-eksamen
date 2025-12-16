/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('lineage_aptitude').del();

  // ---- Resolve Aptitudes ----
  const agility = await knex('aptitude').where({ name: 'Agility' }).first();
  const awareness = await knex('aptitude').where({ name: 'Awareness' }).first();
  const strength = await knex('aptitude').where({ name: 'Strength' }).first();
  const intelligence = await knex('aptitude').where({ name: 'intelligence' }).first();
  const charisma = await knex('aptitude').where({ name: 'Charisma' }).first();

  // ---- Resolve Lineages ----
  const hiveWorlder = await knex('lineage').where({ name: 'Hive Worlder' }).first();
  const forgeWorlder = await knex('lineage').where({ name: 'Forge Worlder' }).first();
  const imperialWorlder = await knex('lineage').where({ name: 'Imperial Worlder' }).first();
  const ultramarines = await knex('lineage').where({ name: 'Ultramarines' }).first();
  const spaceWolves = await knex('lineage').where({ name: 'Space Wolves' }).first();

  // ---- Insert Lineage Aptitudes ----
  await knex('lineage_aptitude').insert([
    // ===== HUMAN LINEAGES =====
    {
      lineage_id: hiveWorlder.id,
      aptitude_id: agility.id
    },
    {
      lineage_id: hiveWorlder.id,
      aptitude_id: awareness.id
    },

    {
      lineage_id: forgeWorlder.id,
      aptitude_id: intelligence.id
    },
    {
      lineage_id: forgeWorlder.id,
      aptitude_id: strength.id
    },

    {
      lineage_id: imperialWorlder.id,
      aptitude_id: charisma.id
    },
    {
      lineage_id: imperialWorlder.id,
      aptitude_id: awareness.id
    },

    // ===== ASTARTES LINEAGES =====
    {
      lineage_id: ultramarines.id,
      aptitude_id: intelligence.id
    },
    {
      lineage_id: ultramarines.id,
      aptitude_id: charisma.id
    },

    {
      lineage_id: spaceWolves.id,
      aptitude_id: strength.id
    },
    {
      lineage_id: spaceWolves.id,
      aptitude_id: awareness.id
    }
  ]);
};
