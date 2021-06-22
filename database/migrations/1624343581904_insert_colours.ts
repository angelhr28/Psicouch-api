import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertColours extends BaseSchema {
    protected tableName = 'colours';
    protected rows = [
        { id: 1, name: 'Lavender', value: '#7986cb' },
        { id: 2, name: 'Sage', value: '#33b679' },
        { id: 3, name: 'Grape', value: '#8e24aa' },
        { id: 4, name: 'Flamingo', value: '#e67c73' },
        { id: 5, name: 'Banana', value: '#f6c026' },
        { id: 6, name: 'Tangerine', value: '#f5511d' },
        { id: 7, name: 'Peacock', value: '#039be5' },
        { id: 8, name: 'Graphite', value: '#616161' },
        { id: 9, name: 'Blueberry', value: '#3f51b5' },
        { id: 10, name: 'Basil', value: '#0b8043' },
        { id: 11, name: 'Tomato', value: '#d60000' },
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
