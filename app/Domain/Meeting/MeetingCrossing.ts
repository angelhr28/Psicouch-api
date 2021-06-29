'use strict';

import QueryObject from 'App/Domain/QueryObjectInterface';

export default class MeetingCrossing implements QueryObject {

    private readonly date: string;
    private readonly startTime: string;
    private readonly endTime: string;

    public constructor( date: string, start_time: string, end_time: string) {
        this.date = date;
        this.startTime = start_time;
        this.endTime = end_time;
    }

    public query(): string {
        return `
            select true
            from meetings as m
                     left join quotes q on m.id = q.meeting_id
            where q.date = ?
              and q.start_time = ?
              and q.end_time = ?
              and (m.status in ('1', '2') or m.is_paid = '1')
        `;
    }

    public bindings(): any[] {
        return [
            this.date,
            this.startTime,
            this.endTime,
        ];
    }
}
