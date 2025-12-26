/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('prerequisite_powers').del();

  // Find powers dynamically
  const fireball = await knex('power').where({ name: 'Fireball' }).first();
  const iceSpike = await knex('power').where({ name: 'Ice Spike' }).first();
  const healingLight = await knex('power').where({ name: 'Healing Light' }).first();
  const shieldBash = await knex('power').where({ name: 'Shield Bash' }).first();

  await knex('prerequisite_powers').insert([

    { power_id: fireball.id, prerequisite_Powers_id: iceSpike.id },


    { power_id: iceSpike.id, prerequisite_Powers_id: healingLight.id }


  ]);
}
