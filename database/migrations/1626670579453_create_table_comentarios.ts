import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateTableComentarios extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements( 'id' ).primary();
      table.bigInteger( 'quote_id' ).unsigned().references( 'id' ).inTable( 'quotes' );
      table.text( 'comment' );
      table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
