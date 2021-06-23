import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertColours extends BaseSchema {
    protected tableName = 'phrases';
    protected rows = [
        
        { id: 1, name: 'SIN ACCIÓN NO EXISTE NADA' },
        { id: 2, name: 'Mas vale "hecho" que "perfecto"' },
        { id: 3, name: 'Cuando la mente dice que ya no puede, es apenas su 40%' },
        // { id: 4, name: 'Flamingo' },
        // { id: 5, name: 'Banana' },
        // { id: 6, name: 'Tangerine' },
        // { id: 7, name: 'Peacock' },
        // { id: 8, name: 'Graphite' },
        // { id: 9, name: 'Blueberry' },
        // { id: 10, name: 'Basil' },
        // { id: 11, name: 'Tomato' },
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
