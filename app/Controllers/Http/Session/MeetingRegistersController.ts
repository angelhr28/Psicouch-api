'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingRegisterValidator from 'App/Validators/MeetingRegisterValidator';

export default class MeetingRegistersController {
    // public async store( { request, response, auth }: HttpContextContract ) {
    //
    //     const data =    await request.validate( MeetingRegisterValidator );
    //
    //     try {
    //         const crossing = new VisitJourneyCrossingService( userId, date, startTime, endTime );
    //         await crossing.isExist();
    //
    //         if ( !personId ) {
    //             const people = new PeopleValidateExistServices( ruc );
    //             const personIdAux = await people.getPeopleByRuc();
    //             personId = personIdAux ? personIdAux.id : await new PeopleVisitServices().register( ruc, businessName, userId );
    //         }
    //
    //         if ( !clientId ) {
    //             const client = new ClientValidateExistServices( personId );
    //             const clientAux = await client.getClientByPersonId();
    //             clientId = clientAux ? clientAux?.id : null;
    //         }
    //
    //         const result = await new VisitPostServices().register( personId, clientId, meetingTypeId, subject, name,
    //             phone, email, note, date, address, ubigeoKey, latitude, longitude, startTime, endTime, userId, storeKey, storeId );
    //
    //         if ( !result.$isPersisted ) {
    //             response.unprocessableEntity( { message: 'No se pudo agendar al cliente. Intente nuevamente.' } );
    //         }
    //
    //         response.created( { message: 'Se agendó la visita correctamente.', id: result.id } );
    //     } catch (e) {
    //         console.log( 'ERROR', e );
    //         return response.badRequest( e.messages ?? { message: e ?? 'Error en la consulta. Intente nuevamente.' } );
    //     }
    // }
}
