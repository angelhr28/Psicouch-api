import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable( this.tableName, ( table ) => {
      table.bigIncrements( 'id' );
      table.string( 'name', 100 );
      table.string( 'cant_session', 100 );
      table.string( 'price', 100 );
      table.string( 'property', 100 );
      table.string( 'colour', 100 );
      table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
      table.timestamps( true );
    } );
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
