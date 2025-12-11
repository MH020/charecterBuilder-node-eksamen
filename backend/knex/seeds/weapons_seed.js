/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('weapon').del()

  await knex('weapon').insert([
    {
      weapon_class_id: 1,      
      type: 'Sword',
      category_id: 1,           
      name: 'Longsword',
      range: 'Melee',
      hands: '1-2',
      rof: '1',
      damage: '1d8',
      pen: 2,
      clip: null,
      reload: null,
      wt: 3,
      availability_id: 1,       
      projectile_id: null,
      is_custom: false
    },
    {
      weapon_class_id: 2,      
      type: 'Pistol',
      category_id: 2,           
      name: '9mm Handgun',
      range: 'Short',
      hands: '1',
      rof: '2',
      damage: '1d6',
      pen: 3,
      clip: 15,
      reload: 2,
      wt: 2,
      availability_id: 1,       
      projectile_id: null,
      is_custom: false
    },
    {
      weapon_class_id: 2,     
      type: 'Rifle',
      category_id: 2,
      name: 'Assault Rifle',
      range: 'Medium',
      hands: '2',
      rof: '3',
      damage: '1d10',
      pen: 5,
      clip: 30,
      reload: 3,
      wt: 8,
      availability_id: 2,       
      projectile_id: null,
      is_custom: false
    },
    {
      weapon_class_id: 1,      
      type: 'Axe',
      category_id: 1,
      name: 'Battle Axe',
      range: 'Melee',
      hands: '2',
      rof: '1',
      damage: '1d12',
      pen: 4,
      clip: null,
      reload: null,
      wt: 7,
      availability_id: 2,       
      projectile_id: null,
      is_custom: false
    },
    {
      id: 5,
      weapon_class_id: 3,     
      type: 'Grenade',
      category_id: 3,
      name: 'Fragmentation Grenade',
      range: 'Short',
      hands: '1',
      rof: '1',
      damage: '2d6',
      pen: 5,
      clip: null,
      reload: null,
      wt: 1,
      availability_id: 3,       
      projectile_id: null,
      is_custom: false
    }
  ])
}
