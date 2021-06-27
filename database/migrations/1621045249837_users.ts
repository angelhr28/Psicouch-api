import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema {
    protected tableName = 'users';

    public async up() {
        this.schema.createTable( this.tableName, ( table ) => {
            table.bigIncrements( 'id' ).primary();
            table.bigInteger( 'role_id' ).unsigned().references( 'id' ).inTable( 'roles' );
            table.string( 'email', 100 ).nullable();
            table.string( 'password', 100 ).notNullable();
            table.string( 'name', 255 ).nullable();
            table.string( 'surname', 255 ).nullable();
            table.integer( 'age', 2 ).nullable();
            table.string( 'phone', 16 ).nullable();
            table.string( 'remember_me_token' ).nullable();
            table.text( 'secret_response' ).nullable();
            table.text( 'secret_question' ).nullable();
            table.text( 'help_phrase' ).nullable();
            table.bigInteger( 'document_id' ).unsigned().references( 'id' ).inTable( 'documents' ).nullable().defaultTo(1);
            table.bigInteger( 'gender_id' ).unsigned().references( 'id' ).inTable( 'genders' ).defaultTo(3);
            table.string( 'document_number', 16 ).nullable();
            table.enum( 'status', [ 0, 1 ] ).defaultTo( 1 );
            table.timestamps( true );
        } );
    }

    public async down() {
        this.schema.dropTable( this.tableName );
    }
}
