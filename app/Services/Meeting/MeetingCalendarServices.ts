'use strict';

import QueryObjectInterface from 'App/Domain/QueryObjectInterface';
import Database from '@ioc:Adonis/Lucid/Database';
import MeetingCalendar from 'App/Domain/Meeting/MeetingCalendar';
import Status from 'Contracts/Enums/Status';
import DateFormat from 'App/Helpers/DateFormat';

export class MeetingCalendarServices {
    
    private readonly userId: string;
    private readonly roleId: number;
    private readonly year: string;
    private readonly month: string;
    private queryObject: QueryObjectInterface;
    private rows: any[];
    
    public constructor( userId: string, roleId: number, year: string, month: string ) {
        this.userId = userId;
        this.roleId = roleId;
        this.year = year;
        this.month = month;
        this.queryObject = new MeetingCalendar( this.userId, this.roleId, this.year, this.month );
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
    
    private buildResponse() {
        return {
            calendar: this.getCalendar,
            pending: this.getPending,
        };
    }
    
    private get getCalendar() {
        
        const calendars = this.rows.filter( s =>
            s.status_meeting == Status.ACTIVE &&
            s.status_quote == Status.ACTIVE &&
            s.is_paid == Status.ACTIVE,
        ).filter( ( obj, index, self ) =>
            index === self.findIndex( ( t ) => ( t.quote_id === obj.quote_id ) ),
        );
        
        return calendars.map( s => ( {
                quote_id: s.quote_id,
                name: s.name,
                pa_name: s.pa_name,
                tem_name: s.tem_name,
                date: s.date,
                date_format: new DateFormat( s.date ).fullDateString(),
                time_format: `${ s.start_time } - ${ s.end_time }`,
                start_time: s.start_time,
                end_time: s.end_time,
                description: s.description,
                link_meet: s.link_meet,
                comments: this.getComments( s.quote_id ),
            } ),
        );
        
    }
    
    private get getPending() {
        const pending = this.rows.filter( s =>
            s.status_quote === Status.INACTIVE &&
            s.is_paid === Status.INACTIVE,
        ).filter( ( obj, index, self ) =>
            index === self.findIndex( ( t ) => ( t.meeting_id === obj.meeting_id ) ),
        );
        
        return pending.map( s => ( {
            meeting_id: s.meeting_id,
            name: s.name,
            description: s.state,
        } ) );
    }
    
    private getComments( quoteId: number ) {
        const comments = this.rows.filter( s =>
            s.status_meeting == Status.ACTIVE &&
            s.status_quote == Status.ACTIVE &&
            s.is_paid == Status.ACTIVE &&
            s.quote_id == quoteId,
        );
        
        return comments.map( s => ( {
            id: s.comment_id,
            comment: s.comment,
        } ) );
        
        
    }
    
    public async get() {
        this.rows = await this.getFromDatabase();
        if ( !this.hasResult() ) {
            return null;
        }
        return this.buildResponse();
    }
}




