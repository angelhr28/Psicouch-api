'use strict';

import QueryObject from 'App/Domain/QueryObjectInterface';
import Roles from 'Contracts/Enums/Roles';

export default class MeetingCalendar implements QueryObject {

    private readonly userId: string;
    private readonly roleId: number;
    private readonly year: string;
    private readonly month: string;

    public constructor( userId: string, roleId: number, year: string, month: string ) {
        this.userId = userId;
        this.roleId = roleId;
        this.year = year;
        this.month = month;
    }

    public query(): string {
        let query = `
            select m.id as meeting_id,
                   q.id as quote_id,
                   concat('Paquete: ', p.name, ' - Tema: ', m.name) as name,
                   q.date,
                   q.start_time,
                   q.end_time,
                   m.is_paid,
                   m.status as status_meeting,
                   q.status as status_quote,
                   q.link_meet,
                   q.meeting_id,
                   concat( 'Estado: ', (case when m.status = 0 then 'Finalizada'
                                           when m.status = 1 and m.is_paid = 1 then 'Aprobada'
                                           when m.status = 2 and m.is_paid = 1 then 'Procesando'
                                           when m.status = 2 and m.is_paid = 0 then 'Falta pago'
                                       end)
                         ) as description
            from meetings as m
                     inner join quotes q on m.id = q.meeting_id
                     inner join products p on m.product_id = p.id
            where year(q.date) = ?
              and month(q.date) = ?
        `;

        if ( this.isClient() ) {
            query += 'and m.user_id = ?';
        }

        return query;
    }

    public isClient() {
        return this.roleId == Roles.CLIENT;
    }

    public bindings(): any[] {
        let bindings = [
            this.year,
            this.month,
        ];

        if ( this.isClient() ) {
            bindings.push( this.userId );
        }

        return bindings;

    }
}
