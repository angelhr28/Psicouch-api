'use strict';

import QueryObjectInterface from 'App/Domain/QueryObjectInterface';
import Database from '@ioc:Adonis/Lucid/Database';
import MeetingCrossing from 'App/Domain/Meeting/MeetingCrossing';

export class MeetingCrossingServices {

    private readonly date: string;
    private readonly startTime: string;
    private readonly endTime: string;
    private queryObject: QueryObjectInterface;
    private rows: any[];

    public constructor( date: string, start_time: string, end_time: string ) {
        this.date = date;
        this.startTime = start_time;
        this.endTime = end_time;
        this.queryObject = new MeetingCrossing( this.date, this.startTime, this.endTime );
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

    public async isExist() {
        this.rows = await this.getFromDatabase();
        return this.hasResult();
    }

}
