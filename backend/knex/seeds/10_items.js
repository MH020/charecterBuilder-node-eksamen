/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex('item').del();

  const [Blade] = await knex('category').where({ name: 'Blade' });
  const [Firearm] = await knex('category').where({ name: 'Firearm' });
  const [Explosive] = await knex('category').where({ name: 'Explosive' });
  const [Energy] = await knex('category').where({ name: 'Energy' });
  const [Thrown] = await knex('category').where({ name: 'Thrown' });

  const [Common] = await knex('availability').where({ name: 'Common' });
  const [Uncommon] = await knex('availability').where({ name: 'Uncommon' });
  const [Rare] = await knex('availability').where({ name: 'Rare' });
  const [Very_Rare] = await knex('availability').where({ name: 'Very_Rare' });
  const [Legendary] = await knex('availability').where({ name: 'Legendary' });

  await knex('item').insert([
    {
      name: 'Boltgun',
      description: 'A standard-issue firearm of the Adeptus Astartes, fires explosive bolts capable of tearing through armor.',
      category_id: Firearm.id, 
      availability_id: Common.id, 
      is_custom: false
    },
    {
      name: 'Chainsword',
      description: 'A vicious close-combat weapon with a motorized chainsaw blade, favored by Space Marines.',
      category_id: Blade.id, 
      availability_id: Common.id, 
      is_custom: false
    },
    {
      name: 'Power Armor',
      description: 'Reinforced armor that enhances strength and protects against ballistic and energy attacks.',
      category_id: Energy.id, 
      availability_id: Uncommon.id, 
      is_custom: false
    },
    {
      name: 'Plasma Pistol',
      description: 'A high-energy sidearm that can melt through the toughest armor but risks overheating.',
      category_id: Energy.id, 
      availability_id: Uncommon.id, 
      is_custom: false
    },
    {
      name: 'Servo Skull',
      description: 'Floating skull-shaped drone used for reconnaissance, illumination, or carrying small equipment.',
      category_id: Thrown.id, 
      availability_id: Rare.id, 
      is_custom: false
    },
    {
      name: 'Force Sword',
      description: 'A blade that channels psychic energy, allowing the wielder to strike with lethal precision against enemies both material and warp-bound.',
      category_id: Blade.id, 
      availability_id: Rare.id, 
      is_custom: false
    },
    {
      name: 'Cadian Pattern Lasgun',
      description: 'A standard-issue rifle of the Imperial Guard. Reliable, mass-produced, and deadly at range.',
      category_id: Firearm.id, 
      availability_id: Common.id, 
      is_custom: false
    },
    {
      name: 'Aquila Medallion',
      description: 'A sacred Imperial amulet that inspires troops and can protect against minor psychic attacks.',
      category_id: Energy.id, 
      availability_id: Rare.id, 
      is_custom: false
    }
  ]);
};
