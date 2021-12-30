import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("restaurants",(table: Knex.TableBuilder)=> {
        table.increments("id").primary().unsigned()
        table.integer('location_id').unsigned().references('id').inTable('locations')
        table.integer('range_id').unsigned().references('id').inTable('price_ranges')
        table.string('name',100).notNullable().defaultTo('')
        table.string('zh_address',200).notNullable().defaultTo('')
        table.string('en_address',200).notNullable().defaultTo('')
        table.boolean('visible').notNullable().defaultTo(true)
        table.timestamps(true,true)
        table.index(['name','zh_address','en_address'],'idx_restaurant_search',{
            indexType: 'FULLTEXT'
        })
    })

    await knex.schema.createTable('restaurant_links',(table: Knex.TableBuilder)=>{
        table.increments("id").primary().unsigned()
        table.integer('restaurant_id').unsigned().references('id').inTable('restaurants')
        table.text('link').notNullable()
        table.string('type',50).notNullable().defaultTo('website')
        table.boolean('visible').notNullable().defaultTo(true)
        table.timestamps(true,true)
    })

    await knex.schema.createTable('restaurant_tags',(table: Knex.TableBuilder)=>{
        table.increments("id").primary().unsigned()
        table.integer('restaurant_id').unsigned().references('id').inTable('restaurants')
        table.integer('tag_id').unsigned().references('id').inTable('tags')
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("restaurant_tags")
    await knex.schema.dropTable("restaurant_links")
    await knex.schema.dropTable("restaurants")
}