import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Workshops extends BaseSchema {
    protected tableName = 'workshops';
    
    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.string( 'name', 255 );
            table.string( 'topic', 255 );
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }
    
    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
