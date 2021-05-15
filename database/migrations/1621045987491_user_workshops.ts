import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UserWorkshops extends BaseSchema {
    protected tableName = 'user_workshops';
    
    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.bigInteger( 'user_id' ).unsigned().references( 'id' ).inTable( 'users' );
            table.bigInteger( 'workshop_id' ).unsigned().references( 'id' ).inTable( 'workshops' );
            table.timestamps( true );
        } );
    }
    
    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
