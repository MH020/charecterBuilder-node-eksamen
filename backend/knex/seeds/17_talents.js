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
    },
    {
      name: 'Las Weapon Training',
      description: 'You are trained in the use and maintenance of lasguns, laspistols, and related Imperial laser weapons.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Solid Projectile Weapon Training',
      description: 'You are proficient with autoguns, stubbers, and other solid projectile firearms.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Bolt Weapon Training',
      description: 'You are trained in the devastating bolt weapons used by elite Imperial forces.',
      type: 'Full Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Chain Weapon Training',
      description: 'You are skilled in the use of chainblades, chainaxes, and other roaring melee weapons.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Power Weapon Training',
      description: 'You are trained to wield power swords, axes, and mauls without self-injury.',
      type: 'Expert Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Heavy Weapon Training',
      description: 'You are capable of operating heavy weapons such as heavy bolters, autocannons, and plasma cannons.',
      type: 'Expert Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: false,
      is_custom: false
    },
    {
      name: 'Combat Conditioning',
      description: 'Rigorous drills and constant exposure to combat have improved your physical performance.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Field Discipline',
      description: 'You maintain order and composure even in chaotic combat environments.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Tactical Awareness',
      description: 'You possess a refined sense for battlefield positioning, timing, and threat assessment.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Close Quarters Specialist',
      description: 'You are trained to fight efficiently in confined spaces and brutal melee engagements.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Marksman Drills',
      description: 'Through repetitive drills and live-fire exercises, your accuracy has steadily improved.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Battlefield Resilience',
      description: 'You have learned how to push through pain, exhaustion, and shock in prolonged engagements.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Command Presence',
      description: 'Your bearing and confidence inspire obedience and trust from those around you.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    },
    {
      name: 'Technical Familiarity',
      description: 'You are accustomed to operating, maintaining, and adapting complex equipment under pressure.',
      type: 'Half Talent',
      prerequisite_talent_id: null,
      required_race_id: null,
      lineage_id: null,
      asi: true,
      is_custom: false
    }

  ])
}
