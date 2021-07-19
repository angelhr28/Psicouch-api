'use strict';

import QueryObjectInterface from 'App/Domain/QueryObjectInterface';
import Database from '@ioc:Adonis/Lucid/Database';
import GetQuote from 'App/Domain/Meeting/GetQuote';

export class GetQuotesServices {
    
    private queryObject: QueryObjectInterface;
    private rows: any[];
    
    public constructor() {
        this.queryObject = new GetQuote();
    }
    
    private async getFromDatabase(): Promise<any[]> {
        // @ts-ignore
        const [ rows, meta ] = await Database.rawQuery(
            this.queryObject.query(),
            this.queryObject.bindings(),
        );
        
        return rows;
    }
    
    private hasResult(): boolean {
        return this.rows.length > 0;
    }

    public async get() {
        this.rows = await this.getFromDatabase();
        if ( !this.hasResult() ) {
            return null;
        }
        return this.rows;
    }
}
