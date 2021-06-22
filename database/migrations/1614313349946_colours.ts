import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Colours extends BaseSchema {
  protected tableName = 'colours'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('id').unique('id')
      table.string( 'name', 20).nullable();
      table.string( 'value', 20).nullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
