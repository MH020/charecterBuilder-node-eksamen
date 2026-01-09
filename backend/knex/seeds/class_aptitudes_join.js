/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('class_aptitudes').del()

  const agility = await knex('aptitude').where({ name: 'Agility' }).first()
  const awareness = await knex('aptitude').where({ name: 'Awareness' }).first()
  const strength = await knex('aptitude').where({ name: 'Strength' }).first()
  const intelligence = await knex('aptitude').where({ name: 'intelligence' }).first()
  const charisma = await knex('aptitude').where({ name: 'Charisma' }).first()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first()
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first()
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first()
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first()

  await knex('class_aptitudes').insert([
    // Guardsman
    { class_id: guardsman.id, aptitude_id: agility.id },
    { class_id: guardsman.id, aptitude_id: awareness.id },
    { class_id: guardsman.id, aptitude_id: strength.id },

    // Tactical Marine
    { class_id: tacticalMarine.id, aptitude_id: strength.id },
    { class_id: tacticalMarine.id, aptitude_id: awareness.id },
    { class_id: tacticalMarine.id, aptitude_id: agility.id },

    // Assault Marine
    { class_id: assaultMarine.id, aptitude_id: strength.id },
    { class_id: assaultMarine.id, aptitude_id: agility.id },

    // Tech-Priest Enginseer
    { class_id: techPriest.id, aptitude_id: intelligence.id },
    { class_id: techPriest.id, aptitude_id: awareness.id },

    // Interrogator
    { class_id: inquisitor.id, aptitude_id: intelligence.id },
    { class_id: inquisitor.id, aptitude_id: charisma.id },
    { class_id: inquisitor.id, aptitude_id: awareness.id }
  ])
}
