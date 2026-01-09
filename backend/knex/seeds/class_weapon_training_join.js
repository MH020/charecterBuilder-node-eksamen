/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('class_weapon_training').del()

  // ---- Resolve Classes ----
  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first()
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first()
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first()
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first()

  // ---- Resolve Weapon Training Talents ----
  const lasTraining = await knex('talent').where({ name: 'Las Weapon Training' }).first()
  const solidTraining = await knex('talent').where({ name: 'Solid Projectile Weapon Training' }).first()
  const boltTraining = await knex('talent').where({ name: 'Bolt Weapon Training' }).first()
  const chainTraining = await knex('talent').where({ name: 'Chain Weapon Training' }).first()
  const powerTraining = await knex('talent').where({ name: 'Power Weapon Training' }).first()
  const heavyTraining = await knex('talent').where({ name: 'Heavy Weapon Training' }).first()

  // ---- Insert Class Weapon Training ----
  await knex('class_weapon_training').insert([
    // Guardsman
    { class_id: guardsman.id, talent_id: lasTraining.id },
    { class_id: guardsman.id, talent_id: solidTraining.id },
    { class_id: guardsman.id, talent_id: heavyTraining.id },

    // Tactical Marine
    { class_id: tacticalMarine.id, talent_id: boltTraining.id },
    { class_id: tacticalMarine.id, talent_id: chainTraining.id },
    { class_id: tacticalMarine.id, talent_id: powerTraining.id },

    // Assault Marine
    { class_id: assaultMarine.id, talent_id: chainTraining.id },
    { class_id: assaultMarine.id, talent_id: powerTraining.id },

    // Tech-Priest Enginseer
    { class_id: techPriest.id, talent_id: lasTraining.id },
    { class_id: techPriest.id, talent_id: solidTraining.id },

    // Interrogator
    { class_id: inquisitor.id, talent_id: lasTraining.id },
    { class_id: inquisitor.id, talent_id: solidTraining.id },
    { class_id: inquisitor.id, talent_id: chainTraining.id }
  ])
}
