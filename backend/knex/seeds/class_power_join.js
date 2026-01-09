/**
 * @param { import("knex").Knex } knex
 */
export async function seed (knex) {
  await knex('class_powers').del()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first()
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first()
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first()
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first()

  const fireball = await knex('power').where({ name: 'Fireball' }).first()
  const iceSpike = await knex('power').where({ name: 'Ice Spike' }).first()
  const healingLight = await knex('power').where({ name: 'Healing Light' }).first()
  const shieldBash = await knex('power').where({ name: 'Shield Bash' }).first()

  await knex('class_powers').insert([
    // Guardsman
    { class_id: guardsman.id, power_id: shieldBash.id, level: 1 },

    // Tactical Marine
    { class_id: tacticalMarine.id, power_id: shieldBash.id, level: 1 },
    { class_id: tacticalMarine.id, power_id: healingLight.id, level: 3 },

    // Assault Marine
    { class_id: assaultMarine.id, power_id: shieldBash.id, level: 1 },
    { class_id: assaultMarine.id, power_id: fireball.id, level: 2 },

    // Tech-Priest
    { class_id: techPriest.id, power_id: healingLight.id, level: 1 },
    { class_id: techPriest.id, power_id: iceSpike.id, level: 2 },

    // Inquisitor
    { class_id: inquisitor.id, power_id: healingLight.id, level: 1 },
    { class_id: inquisitor.id, power_id: fireball.id, level: 2 }
  ])
}
