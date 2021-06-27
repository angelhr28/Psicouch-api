import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Genders extends BaseSchema {
    protected tableName = 'genders';

    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' );
            table.enum( 'name', [ 'Femenino', 'Masculino', 'Sin definir' ] ).defaultTo('Sin definir');
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }

    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
