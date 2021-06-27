import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Quotes extends BaseSchema {
    protected tableName = 'quotes';

    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.date( 'date' ).notNullable();
            table.string( 'start_time', 8 ).notNullable();
            table.string( 'end_time', 8 ).notNullable();
            table.string( 'link_meet', 100 ).nullable();
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.bigInteger( 'meeting_id' ).unsigned().references( 'id' ).inTable( 'meetings' );
            table.timestamps( true );
        } );
    }

    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
