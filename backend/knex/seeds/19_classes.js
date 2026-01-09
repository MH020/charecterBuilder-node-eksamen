/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  // Clear existing data
  await knex('class').del()

  // ===== Base Classes =====
  await knex('class').insert([
    {
      name: 'Guardsman',
      description: 'A soldier of the Astra Militarum, trained for mass warfare and survival against overwhelming odds.',
      parent_id: null
    },
    {
      name: 'Adeptus Astartes',
      description: 'A genetically enhanced Space Marine, engineered for relentless war in the Emperor’s name.',
      parent_id: null
    },
    {
      name: 'Adeptus Mechanicus',
      description: 'A servant of the Machine God, wielding forbidden technology and sacred rites.',
      parent_id: null
    },
    {
      name: 'Inquisition',
      description: 'An agent of the Imperium tasked with rooting out heresy, mutation, and xenos influence.',
      parent_id: null
    }
  ])

  // ===== Guardsman Subclasses =====
  await knex('class').insert([
    {
      name: 'Shock Trooper',
      description: 'Frontline infantry specializing in urban combat and rapid assaults.',
      parent_id: knex('class').select('id').where({ name: 'Guardsman' })
    },
    {
      name: 'Heavy Weapons Specialist',
      description: 'A Guardsman trained in the use of heavy bolters, lascannons, and autocannons.',
      parent_id: knex('class').select('id').where({ name: 'Guardsman' })
    },
    {
      name: 'Scout',
      description: 'A reconnaissance specialist skilled in stealth, survival, and forward observation.',
      parent_id: knex('class').select('id').where({ name: 'Guardsman' })
    }
  ])

  // ===== Space Marine Subclasses =====
  await knex('class').insert([
    {
      name: 'Tactical Marine',
      description: 'A versatile Space Marine trained to adapt to nearly any battlefield role.',
      parent_id: knex('class').select('id').where({ name: 'Adeptus Astartes' })
    },
    {
      name: 'Assault Marine',
      description: 'A close-combat specialist using jump packs and melee weapons.',
      parent_id: knex('class').select('id').where({ name: 'Adeptus Astartes' })
    },
    {
      name: 'Devastator Marine',
      description: 'A heavy support Marine wielding the deadliest ranged weapons.',
      parent_id: knex('class').select('id').where({ name: 'Adeptus Astartes' })
    }
  ])

  // ===== Adeptus Mechanicus Subclasses =====
  await knex('class').insert([
    {
      name: 'Tech-Priest Enginseer',
      description: 'A keeper of machine spirits and battlefield engineer.',
      parent_id: knex('class').select('id').where({ name: 'Adeptus Mechanicus' })
    },
    {
      name: 'Skitarrii Ranger',
      description: 'A cybernetically enhanced soldier armed with precision weaponry.',
      parent_id: knex('class').select('id').where({ name: 'Adeptus Mechanicus' })
    }
  ])

  // ===== Inquisition Subclasses =====
  await knex('class').insert([
    {
      name: 'Interrogator',
      description: 'An Inquisitorial agent skilled in investigation and extraction of information.',
      parent_id: knex('class').select('id').where({ name: 'Inquisition' })
    },
    {
      name: 'Acolyte',
      description: 'A trusted servant of an Inquisitor, operating in the shadows of the Imperium.',
      parent_id: knex('class').select('id').where({ name: 'Inquisition' })
    }
  ])
}
