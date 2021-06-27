import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertGenders extends BaseSchema {
    protected tableName = 'genders';
    protected rows = [
        { id: 1, name: 'Femenino' },
        { id: 2, name: 'Masculino' },
        { id: 3, name: 'Sin definir' },
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
