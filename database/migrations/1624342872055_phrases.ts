import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Phrases extends BaseSchema {
    protected tableName = 'phrases';
    
    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.bigIncrements( 'name' );
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }
    
    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
