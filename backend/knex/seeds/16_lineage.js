/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('lineage').del()


  const human = await knex('race').where({ name: 'Human' }).first()
  const astartes = await knex('race').where({ name: 'Adeptus Astartes' }).first()


  await knex('lineage').insert([

    {
      name: 'Imperial Worlder',
      description: 'Born on a typical Imperial world, accustomed to rigid hierarchy and discipline.',
      defining_features: 'Imperial Creed, Common Low Gothic, Adaptable',
      required_race_id: human.id,
      is_custom: false
    },
    {
      name: 'Hive Worlder',
      description: 'Raised in the overcrowded hive cities of the Imperium.',
      defining_features: 'Crowded environments, Streetwise, High tolerance for pollution',
      required_race_id: human.id,
      is_custom: false
    },
    {
      name: 'Forge Worlder',
      description: 'Hails from a Mechanicus forge world steeped in industry and ritual.',
      defining_features: 'Technical training, Machine Cult influence, Augmetics',
      required_race_id: human.id,
      is_custom: false
    },


    {
      name: 'Ultramarines',
      description: 'Scions of Guilliman, exemplars of discipline and tactical flexibility.',
      defining_features: 'Codex Astartes, Strategic doctrine, Leadership',
      required_race_id: astartes.id,
      is_custom: false
    },
    {
      name: 'Space Wolves',
      description: 'Feral warriors from Fenris, valuing strength and loyalty.',
      defining_features: 'Enhanced senses, Feral culture, Pack tactics',
      required_race_id: astartes.id,
      is_custom: false
    },
    {
      name: 'Blood Angels',
      description: 'Noble yet cursed sons of Sanguinius.',
      defining_features: 'Red Thirst, Black Rage, Artistic temperament',
      required_race_id: astartes.id,
      is_custom: false
    }
  ])
}
