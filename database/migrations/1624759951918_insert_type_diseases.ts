import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertTypeDiseases extends BaseSchema {
    protected tableName = 'diseases';

    protected rows = [

        { id: 1, name: 'Ansiedad' },
        { id: 2, name: 'Depresión' },
        { id: 3, name: 'Estrés' },
        { id: 4, name: 'Insomnio' },
        { id: 5, name: 'Dependencia emocional' },
        { id: 6, name: 'Duelo por perdida familiar' },
        { id: 7, name: 'Autoestima' },
        { id: 8, name: 'Infidelidad' },
        { id: 9, name: 'Desmotivación' },
        { id: 10, name: 'Procastinación' },
        { id: 11, name: 'Habilidades sociales' },
        { id: 12, name: 'Liderazgo' },
        { id: 13, name: 'Timidez' },
        { id: 14, name: 'Crisis existencial' },
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
