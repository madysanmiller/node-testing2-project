/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("cats", (tbl) => {
        tbl.increments("cat_id");
        tbl.string("cat_name").notNullable();
        tbl.integer("cat_age").notNullable().unsigned();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cats");
};