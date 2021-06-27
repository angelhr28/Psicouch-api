import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Sessions extends BaseSchema {
    protected tableName = 'meetings';

    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.bigInteger( 'user_id' ).unsigned().references( 'id' ).inTable( 'users' ).onDelete( 'CASCADE' );
            table.bigInteger( 'product_id' ).unsigned().references( 'id' ).inTable( 'products' );
            table.integer( 'color_id' );
            table.string( 'name', 255 );
            table.text( 'note' );
            table.text( 'description' ).nullable();
            table.text( 'location' ).nullable();
            table.text( 'emails' ).nullable();
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }

    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
