import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Sessions extends BaseSchema {
    protected tableName = 'sessions';
    
    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.bigInteger( 'user_id' ).unsigned().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
            table.bigInteger( 'product_id' ).unsigned().references( 'id' ).inTable( 'products' );
            table.bigInteger( 'color_id' ).unsigned().references( 'id' ).inTable( 'colours' );
            table.string( 'name', 255 );
            table.date( 'date' ).notNullable();
            table.text( 'note' );
            table.string( 'start_time', 8 ).notNullable();
            table.string( 'end_time', 8 ).notNullable();
            table.text( 'description').nullable();
            table.text( 'location').nullable();
            table.string( 'link_meet', 100).nullable();
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }
    
    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
