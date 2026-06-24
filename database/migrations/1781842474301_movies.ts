import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Movies extends BaseSchema {
  protected tableName = 'movies'

public async up () {
  this.schema.createTable(this.tableName, (table) => {
    table.increments('id').primary()               
    table.string('title', 255).notNullable()    
    table.string('director', 255).notNullable()    
    table.integer('release_year').notNullable()    
    table.decimal('imdb_rating', 3, 1).notNullable()
    table.timestamps(true, true)                  
  })        
} 

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
