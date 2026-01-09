/**
 * @param { import("knex").Knex } knex
 */
export async function seed (knex) {
  await knex('class_powers_known').del()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first()
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first()
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first()
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first()

  await knex('class_powers_known').insert([
    // Guardsman
    { class_id: guardsman.id, level: 1, powers_known: 1 },
    { class_id: guardsman.id, level: 2, powers_known: 1 },

    // Tactical Marine
    { class_id: tacticalMarine.id, level: 1, powers_known: 1 },
    { class_id: tacticalMarine.id, level: 3, powers_known: 2 },

    // Assault Marine
    { class_id: assaultMarine.id, level: 1, powers_known: 1 },
    { class_id: assaultMarine.id, level: 2, powers_known: 2 },

    // Tech-Priest
    { class_id: techPriest.id, level: 1, powers_known: 1 },
    { class_id: techPriest.id, level: 2, powers_known: 1 },

    // Inquisitor
    { class_id: inquisitor.id, level: 1, powers_known: 1 },
    { class_id: inquisitor.id, level: 2, powers_known: 2 }
  ])
}
