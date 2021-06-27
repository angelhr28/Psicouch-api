import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import Database from '@ioc:Adonis/Lucid/Database';

export default class InsertRoles extends BaseSchema {
    tableName = 'roles';

    rows = [
        { id:'1', name: 'Master' },
        { id:'2',name: 'Admin' },
        { id:'3',name: 'Cliente' },
    ];

    async up() {
        await Database.table( this.tableName ).insert( this.rowsFinal() );
    }

    async down() {
        for (let row of this.rowsFinal()) {
            await Database.from( this.tableName ).where( 'name', row.name ).delete();
        }
        await Database.raw( `ALTER TABLE ${ this.tableName }
            AUTO_INCREMENT = 1` );
    }

    rowsFinal() {
        const audit = {
            created_at: new Date(),
            updated_at: new Date(),
        };

        return this.rows.map( row => Object.assign( row, audit ) );
    }
}
