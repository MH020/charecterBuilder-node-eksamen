/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('weapon_weapon_class').del()

  const pistol = await knex('weapon_class').where({ name: 'Pistol' }).first()
  const carbine = await knex('weapon_class').where({ name: 'Carbine' }).first()
  const longRifle = await knex('weapon_class').where({ name: 'Long Rifle:' }).first()
  const heavy = await knex('weapon_class').where({ name: 'Heavy' }).first()
  const superHeavy = await knex('weapon_class').where({ name: 'Super Heavy' }).first()

  const [longsword] = await knex('weapon').where({ name: 'Longsword' })
  const [handgun] = await knex('weapon').where({ name: '9mm Handgun' })
  const [assaultRifle] = await knex('weapon').where({ name: 'Assault Rifle' })
  const [battleAxe] = await knex('weapon').where({ name: 'Battle Axe' })
  const [fragGrenade] = await knex('weapon').where({ name: 'Fragmentation Grenade' })

  await knex('weapon_weapon_class').insert([

    { weapon_id: longsword.id, weapon_class_id: pistol.id },
    { weapon_id: battleAxe.id, weapon_class_id: pistol.id },

    { weapon_id: handgun.id, weapon_class_id: pistol.id },
    { weapon_id: assaultRifle.id, weapon_class_id: pistol.id },

    { weapon_id: fragGrenade.id, weapon_class_id: pistol.id }
  ])
}
