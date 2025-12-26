/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {

  await knex('class_powers_known').del();


  const guardsman = await knex('class').where({ name: 'Guardsman' }).first();
  const tacticalMarine = await knex('class').where({ name: 'Tactical Marine' }).first();
  const assaultMarine = await knex('class').where({ name: 'Assault Marine' }).first();
  const techPriest = await knex('class').where({ name: 'Tech-Priest Enginseer' }).first();
  const inquisitor = await knex('class').where({ name: 'Interrogator' }).first();


  const fireball = await knex('power').where({ name: 'Fireball' }).first();
  const iceSpike = await knex('power').where({ name: 'Ice Spike' }).first();
  const healingLight = await knex('power').where({ name: 'Healing Light' }).first();
  const shieldBash = await knex('power').where({ name: 'Shield Bash' }).first();


  await knex('class_powers_known').insert([

    { class_id: guardsman.id, powers_known: 1, level: 1 },
    { class_id: guardsman.id, powers_known: 1, level: 2 },


    { class_id: tacticalMarine.id, powers_known: 1, level: 1 },
    { class_id: tacticalMarine.id, powers_known: 2, level: 3 },


    { class_id: assaultMarine.id, powers_known: 1, level: 1 },
    { class_id: assaultMarine.id, powers_known: 2, level: 2 },


    { class_id: techPriest.id, powers_known: 1, level: 1 },
    { class_id: techPriest.id, powers_known: 1, level: 2 },

  
    { class_id: inquisitor.id, powers_known: 1, level: 1 },
    { class_id: inquisitor.id, powers_known: 2, level: 2 }
  ]);
}
