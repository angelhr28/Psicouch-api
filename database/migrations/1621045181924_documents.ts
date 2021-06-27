import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Documents extends BaseSchema {
    protected tableName = 'documents';

    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.string( 'name', 32 );
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }

    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
