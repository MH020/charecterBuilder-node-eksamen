/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.alterTable("skill", (table) => {
        table.boolean("is_custom").notNullable().defaultTo(false);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable("skill", (table) => {
    table.dropColumn("is_custom");
  });
};
