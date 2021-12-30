import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("locations",(table: Knex.TableBuilder)=> {
        table.increments("id").primary().unsigned()
        table.string('zh_name',50).notNullable().defaultTo('')
        table.string('en_name',50).notNullable().defaultTo('')
        table.boolean('visible').notNullable().defaultTo(true)
        table.timestamps(true,true)
        table.index(['zh_name','en_name'],'idx_loc_name',{
            indexType: 'FULLTEXT'
        })
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("locations")
}

