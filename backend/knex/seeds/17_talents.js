/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('talent').del()

  // ---- Resolve Races ----
  const human = await knex('race').where({ name: 'Human' }).first()
  const astartes = await knex('race').where({ name: 'Adeptus Astartes' }).first()

  // ---- Resolve Lineages ----
  const imperialWorlder = await knex('lineage').where({ name: 'Imperial Worlder' }).first()
  const forgeWorlder = await knex('lineage').where({ name: 'Forge Worlder' }).first()
  const ultramarines = await knex('lineage').where({ name: 'Ultramarines' }).first()
  const spaceWolves = await knex('lineage').where({ name: 'Space Wolves' }).first()
  const bloodAngels = await knex('lineage').where({ name: 'Blood Angels' }).first()

  // ---- Insert Talents ----
  await knex('talent').insert([
    // ===== UNIVERSAL TALENTS =====
    {
      name: 'Iron Will',
      description: 'Your mind is hardened against fear, terror, and psychic assault.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Battle-Hardened',
      description: 'Repeated exposure to violence has dulled your reaction to injury and bloodshed.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },

    // ===== HUMAN TALENTS =====
    {
      name: 'Faith in the Emperor',
      description: 'Your unwavering belief steels you against corruption and Warp-born horrors.',
      type: 'Full Talent',
      prerequisite_talent_id: null,
      required_race_id: human.id,
      lineage_id: imperialWorlder?.id ?? null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Hive Survivor',
      description: 'You grew up fighting for survival in crushing hive cities.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: human.id,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Machine Empathy',
      description: 'You possess an intuitive understanding of machine-spirits and sacred technology.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: human.id,
      lineage_id: forgeWorlder.id,
      asi: true,
      is_custom: false
    },


    {
      name: 'Transhuman Physiology',
      description: 'Your enhanced biology allows you to shrug off wounds that would kill lesser beings.',
      type: 'Full Talent',
      prerequisite_talent_id: null,
      required_race_id: astartes.id,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Codex Discipline',
      description: 'You follow the teachings of the Codex Astartes with rigid precision.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: astartes.id,
      lineage_id: ultramarines.id,
      asi: true,
      is_custom: false
    },
    {
      name: 'Fenrisian Ferocity',
      description: 'You fight with savage fury, trusting tooth, blade, and instinct.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: astartes.id,
      lineage_id: spaceWolves.id,
      asi: true,
      is_custom: false
    },
    {
      name: 'Red Thirst',
      description: 'The curse of Sanguinius burns in your veins, granting power at terrible cost.',
      type: 'Expert Talent',
      prerequisite_talent_id: null,
      required_race_id: astartes.id,
      lineage_id: bloodAngels.id,
      asi: false,
      is_custom: false
    }
  ])
}
