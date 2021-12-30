import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("price_ranges",(table: Knex.TableBuilder)=> {
        table.increments("id").primary().unsigned()
        table.string('content',50).notNullable().defaultTo('')
        table.boolean('visible').notNullable().defaultTo(true)
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("price_ranges")
}

