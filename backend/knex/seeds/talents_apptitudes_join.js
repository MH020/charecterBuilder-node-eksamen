/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed (knex) {
  await knex('talent_aptitude').del()


  const agility = await knex('aptitude').where({ name: 'Agility' }).first()
  const awareness = await knex('aptitude').where({ name: 'Awareness' }).first()
  const strength = await knex('aptitude').where({ name: 'Strength' }).first()
  const intelligence = await knex('aptitude').where({ name: 'intelligence' }).first()
  const charisma = await knex('aptitude').where({ name: 'Charisma' }).first()

  const ironWill = await knex('talent').where({ name: 'Iron Will' }).first()
  const battleHardened = await knex('talent').where({ name: 'Battle-Hardened' }).first()
  const machineEmpathy = await knex('talent').where({ name: 'Machine Empathy' }).first()
  const hiveSurvivor = await knex('talent').where({ name: 'Hive Survivor' }).first()
  const transhumanPhysiology = await knex('talent').where({ name: 'Transhuman Physiology' }).first()
  const fenrisianFerocity = await knex('talent').where({ name: 'Fenrisian Ferocity' }).first()
  const codexDiscipline = await knex('talent').where({ name: 'Codex Discipline' }).first()
  const redThirst = await knex('talent').where({ name: 'Red Thirst' }).first()


  await knex('talent_aptitude').insert([
    // Iron Will
    { talent_id: ironWill.id, aptitude_id: awareness.id },
    { talent_id: ironWill.id, aptitude_id: charisma.id },

    // Battle-Hardened
    { talent_id: battleHardened.id, aptitude_id: strength.id },

    // Hive Survivor
    { talent_id: hiveSurvivor.id, aptitude_id: agility.id },
    { talent_id: hiveSurvivor.id, aptitude_id: awareness.id },

    // Machine Empathy
    { talent_id: machineEmpathy.id, aptitude_id: intelligence.id },

    // Transhuman Physiology
    { talent_id: transhumanPhysiology.id, aptitude_id: strength.id },
    { talent_id: transhumanPhysiology.id, aptitude_id: agility.id },

    // Codex Discipline
    { talent_id: codexDiscipline.id, aptitude_id: intelligence.id },
    { talent_id: codexDiscipline.id, aptitude_id: awareness.id },

    // Fenrisian Ferocity
    { talent_id: fenrisianFerocity.id, aptitude_id: strength.id },
    { talent_id: fenrisianFerocity.id, aptitude_id: agility.id },

    // Red Thirst
    { talent_id: redThirst.id, aptitude_id: strength.id },
    { talent_id: redThirst.id, aptitude_id: charisma.id }
  ])
}
