/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('weapon_weapon_traits').del()

  const [longsword] = await knex('weapon').where({ name: 'Longsword' })
  const [handgun] = await knex('weapon').where({ name: '9mm Handgun' })
  const [assaultRifle] = await knex('weapon').where({ name: 'Assault Rifle' })
  const [battleAxe] = await knex('weapon').where({ name: 'Battle Axe' })
  const [fragGrenade] = await knex('weapon').where({ name: 'Fragmentation Grenade' })

  const [accurate] = await knex('weapon_trait').where({ name: 'Accurate' })
  const [tearing] = await knex('weapon_trait').where({ name: 'Tearing' })
  const [reliable] = await knex('weapon_trait').where({ name: 'Reliable' })
  const [unwieldy] = await knex('weapon_trait').where({ name: 'Unwieldy' })
  const [blast] = await knex('weapon_trait').where({ name: 'Blast' })
  const [balanced] = await knex('weapon_trait').where({ name: 'Balanced' })

  await knex('weapon_weapon_traits').insert([
    { weapon_id: longsword.id, weapon_trait_id: balanced.id },

    { weapon_id: handgun.id, weapon_trait_id: reliable.id },

    { weapon_id: assaultRifle.id, weapon_trait_id: accurate.id },
    { weapon_id: assaultRifle.id, weapon_trait_id: reliable.id },

    { weapon_id: battleAxe.id, weapon_trait_id: tearing.id },

    { weapon_id: fragGrenade.id, weapon_trait_id: blast.id },
    { weapon_id: fragGrenade.id, weapon_trait_id: unwieldy.id }
  ])
}
