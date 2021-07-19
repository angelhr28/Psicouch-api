'use strict';

import QueryObject from 'App/Domain/QueryObjectInterface';

export default class GetQuote implements QueryObject {
    
    public query(): string {
        return `
            select m.id                                             as meeting_id,-
                concat('Paquete: ', p.name, ' - Tema: ', m.name) as name
            from meetings as m
                     inner join quotes q on m.id = q.meeting_id
                     inner join products p on m.product_id = p.id
            where m.is_paid = '1'
              and m.status = '1'
            group by m.id
        `;
    }
    
    public bindings = (): any[] => [];
}
