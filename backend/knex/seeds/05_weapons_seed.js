/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('weapon').del()

  const [Blade]       = await knex('category').where({ name: "Blade" });
  const [Firearm]     = await knex('category').where({ name: "Firearm" });
  const [Explosive]      = await knex('category').where({ name: "Explosive" });
  const [Energy]  = await knex('category').where({ name: "Energy" });
  const [Thrown]      = await knex('category').where({ name: "Thrown" });


  const [Common]       = await knex('availability').where({ name: "Common" });
  const [Uncommon]     = await knex('availability').where({ name: "Uncommon" });
  const [Rare]      = await knex('availability').where({ name: "Rare" });
  const [Very_Rare]  = await knex('availability').where({ name: "Very_Rare" });
  const [Legendary]      = await knex('availability').where({ name: "Legendary" });

  await knex('weapon').insert([
    {     
      type: 'Sword',
      category_id: Blade.id,           
      name: 'Longsword',
      range: 'Melee',
      hands: '1-2',
      rof: '1',
      damage: '1d8',
      pen: 2,
      clip: null,
      reload: null,
      wt: 3,
      availability_id: Common.id,       
      projectile_id: null,
      is_custom: false
    },
    {     

      type: 'Pistol',
      category_id: Firearm.id,          
      name: '9mm Handgun',
      range: 'Short',
      hands: '1',
      rof: '2',
      damage: '1d6',
      pen: 3,
      clip: 15,
      reload: 2,
      wt: 2,
      availability_id: Common.id,       
      projectile_id: null,
      is_custom: false
    },
    {  
      type: 'Rifle',
      category_id: Firearm.id,
      name: 'Assault Rifle',
      range: 'Medium',
      hands: '2',
      rof: '3',
      damage: '1d10',
      pen: 5,
      clip: 30,
      reload: 3,
      wt: 8,
      availability_id: Common.id,       
      projectile_id: null,
      is_custom: false
    },
    {   
      type: 'Axe',
      category_id: Blade.id,
      name: 'Battle Axe',
      range: 'Melee',
      hands: '2',
      rof: '1',
      damage: '1d12',
      pen: 4,
      clip: null,
      reload: null,
      wt: 7,
      availability_id: Common.id,       
      projectile_id: null,
      is_custom: false
    },
    {   
      type: 'Grenade',
      category_id: Thrown.id,
      name: 'Fragmentation Grenade',
      range: 'Short',
      hands: '1',
      rof: '1',
      damage: '2d6',
      pen: 5,
      clip: null,
      reload: null,
      wt: 1,
      availability_id: Common.id,       
      projectile_id: null,
      is_custom: false
    }
  ])
}
