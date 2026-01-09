/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('class_talents').del()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first()
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first()
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first()
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first()

  const combatConditioning = await knex('talent').where({ name: 'Combat Conditioning' }).first()
  const fieldDiscipline = await knex('talent').where({ name: 'Field Discipline' }).first()
  const tacticalAwareness = await knex('talent').where({ name: 'Tactical Awareness' }).first()
  const closeQuarters = await knex('talent').where({ name: 'Close Quarters Specialist' }).first()
  const marksmanDrills = await knex('talent').where({ name: 'Marksman Drills' }).first()
  const battlefieldResilience = await knex('talent').where({ name: 'Battlefield Resilience' }).first()
  const commandPresence = await knex('talent').where({ name: 'Command Presence' }).first()
  const technicalFamiliarity = await knex('talent').where({ name: 'Technical Familiarity' }).first()

  await knex('class_talents').insert([

    { class_id: guardsman.id, talent_id: fieldDiscipline.id, level: 1 },
    { class_id: guardsman.id, talent_id: marksmanDrills.id, level: 3 },
    { class_id: guardsman.id, talent_id: battlefieldResilience.id, level: 5 },

    { class_id: tacticalMarine.id, talent_id: combatConditioning.id, level: 1 },
    { class_id: tacticalMarine.id, talent_id: tacticalAwareness.id, level: 3 },
    { class_id: tacticalMarine.id, talent_id: commandPresence.id, level: 6 },

    { class_id: assaultMarine.id, talent_id: combatConditioning.id, level: 1 },
    { class_id: assaultMarine.id, talent_id: closeQuarters.id, level: 3 },
    { class_id: assaultMarine.id, talent_id: battlefieldResilience.id, level: 6 },

    { class_id: techPriest.id, talent_id: technicalFamiliarity.id, level: 1 },
    { class_id: techPriest.id, talent_id: tacticalAwareness.id, level: 4 },
    { class_id: techPriest.id, talent_id: fieldDiscipline.id, level: 6 },

    { class_id: inquisitor.id, talent_id: commandPresence.id, level: 1 },
    { class_id: inquisitor.id, talent_id: tacticalAwareness.id, level: 3 },
    { class_id: inquisitor.id, talent_id: battlefieldResilience.id, level: 5 }
  ])
}
