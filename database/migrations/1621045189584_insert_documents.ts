import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertDocuments extends BaseSchema {
    protected tableName = 'documents';
    protected rows = [
        {id: '1', name: 'DNI'},
        {id: '2', name: 'CEX'},
        {id: '3', name: 'Pasaporte'},
        {id: '4', name: 'RUC'},
        {id: '5', name: 'Partida de nacimiento'},
        {id: '6', name: 'Otros'},
    ];

    public async up() {
        await Database.table( this.tableName ).insert( this.rowsFinal() );
    }

    public async down() {
        for (let row of this.rowsFinal()) {
            await Database.from( this.tableName ).where( 'name', row.name ).delete();
        }
    }

    rowsFinal() {
        const audit = {
            created_at: new Date(),
            updated_at: new Date(),
        };

        return this.rows.map( row => Object.assign( row, audit ) );
    }
}
