import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertProducts extends BaseSchema {
    protected tableName = 'products';

    protected rows = [
        { id: 1, name: 'BASIC'   , cant_session: '1' , price: '70' },
        { id: 2, name: 'REGULAR' , cant_session: '3' , price: '340' },
        { id: 3, name: 'MEDIUM'  , cant_session: '4' , price: '360' },
        { id: 4, name: 'PREMIUM' , cant_session: '5' , price: '370' },
        { id: 5, name: 'LUXURY'  , cant_session: '6' , price: '380' },
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
