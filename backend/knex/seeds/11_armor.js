/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing armor
  await knex('armor').del();

  const [Common] = await knex('availability').where({ name: 'Common' });
  const [Uncommon] = await knex('availability').where({ name: 'Uncommon' });
  const [Rare] = await knex('availability').where({ name: 'Rare' });
  const [Very_Rare] = await knex('availability').where({ name: 'Very Rare' });
  const [Legendary] = await knex('availability').where({ name: 'Legendary' });

  await knex('armor').insert([
    {
      name: 'Flak Armor',
      description: 'Standard Imperial Guard armor offering minimal protection.',
      head_ap: 1,
      body_ap: 2,
      right_arm_ap: 1,
      left_arm_ap: 1,
      right_leg_ap: 1,
      left_leg_ap: 1,
      wt: 15,
      availability_id: Common.id,
      is_custom: false
    },
    {
      name: 'Carapace Armor',
      description: 'Heavier armor used by Stormtroopers and elite Guard units.',
      head_ap: 3,
      body_ap: 4,
      right_arm_ap: 3,
      left_arm_ap: 3,
      right_leg_ap: 3,
      left_leg_ap: 3,
      wt: 25,
      availability_id: Uncommon.id,
      is_custom: false
    },
    {
      name: 'Enforcer Carapace',
      description: 'Reinforced armor worn by Adeptus Arbites enforcers.',
      head_ap: 4,
      body_ap: 5,
      right_arm_ap: 4,
      left_arm_ap: 4,
      right_leg_ap: 4,
      left_leg_ap: 4,
      wt: 30,
      availability_id: Rare.id,
      is_custom: false
    },
    {
      name: 'Skitarii Vanguard Armor',
      description: 'Radiation-shielded armor worn by Skitarii Vanguard troops.',
      head_ap: 4,
      body_ap: 6,
      right_arm_ap: 4,
      left_arm_ap: 4,
      right_leg_ap: 5,
      left_leg_ap: 5,
      wt: 28,
      availability_id: Rare.id,
      is_custom: false
    },
    {
      name: 'Skitarii Ranger Armor',
      description: 'Lightweight armor optimized for long-range engagements.',
      head_ap: 3,
      body_ap: 5,
      right_arm_ap: 3,
      left_arm_ap: 3,
      right_leg_ap: 4,
      left_leg_ap: 4,
      wt: 22,
      availability_id: Uncommon.id,
      is_custom: false
    },
    {
      name: 'Sororitas Power Armor',
      description: 'Blessed power armor worn by the Adepta Sororitas.',
      head_ap: 6,
      body_ap: 8,
      right_arm_ap: 6,
      left_arm_ap: 6,
      right_leg_ap: 7,
      left_leg_ap: 7,
      wt: 45,
      availability_id: Very_Rare.id,
      is_custom: false
    },
    {
      name: 'Astartes Scout Armor',
      description: 'Light power armor used by Space Marine Scouts.',
      head_ap: 5,
      body_ap: 7,
      right_arm_ap: 5,
      left_arm_ap: 5,
      right_leg_ap: 6,
      left_leg_ap: 6,
      wt: 40,
      availability_id: Rare.id,
      is_custom: false
    },
    {
      name: 'Astartes Power Armor (Mk VII)',
      description: 'Iconic power armor of the Adeptus Astartes.',
      head_ap: 8,
      body_ap: 10,
      right_arm_ap: 8,
      left_arm_ap: 8,
      right_leg_ap: 9,
      left_leg_ap: 9,
      wt: 60,
      availability_id: Legendary.id,
      is_custom: false
    },
    {
      name: 'Chaos Space Marine Power Armor',
      description: 'Warp-tainted power armor worn by Heretic Astartes.',
      head_ap: 8,
      body_ap: 10,
      right_arm_ap: 8,
      left_arm_ap: 8,
      right_leg_ap: 9,
      left_leg_ap: 9,
      wt: 65,
      availability_id: Legendary.id,
      is_custom: false
    },
    {
      name: 'Terminator Armor',
      description: 'Tactical Dreadnought Armor providing extreme protection.',
      head_ap: 10,
      body_ap: 14,
      right_arm_ap: 10,
      left_arm_ap: 10,
      right_leg_ap: 12,
      left_leg_ap: 12,
      wt: 90,
      availability_id: Legendary.id,
      is_custom: false
    }
  ]);
}
