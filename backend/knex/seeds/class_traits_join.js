/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('class_traits').del()

  const guardsman = await knex('class').where({ name: 'Guardsman' }).first()
  const sheerDetermination = await knex('trait').where({ name: 'Sheer Determination' }).first()

  await knex('class_traits').insert([
    { class_id: guardsman.id, trait_id: sheerDetermination.id, level: 1 }
  ])
}
