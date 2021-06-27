'use strict';

export default class SessionRegistersController {

    // public async store( { request, response }: HttpContextContract ) {
    //
    //     await request.validate( VisitPostValidator );
    //     const userId = request.auth.uid;
    //
    //     let personId = request.input( 'person_id' );
    //     let clientId = request.input( 'client_id' );
    //     const meetingTypeId = request.input( 'meeting_type_id' );
    //     const subject = request.input( 'subject' );
    //     const name = request.input( 'name' );
    //     const phone = request.input( 'phone' );
    //     const email = request.input( 'email' );
    //     const note = request.input( 'note' );
    //     const date = request.input( 'date', new Date().toISOString().slice( 0, 10 ) );
    //     const address = request.input( 'address' );
    //     const ubigeoKey = request.input( 'ubigeo_key' );
    //     const latitude = request.input( 'latitude' );
    //     const longitude = request.input( 'longitude' );
    //     const startTime = request.input( 'start_time' );
    //     const endTime = request.input( 'end_time' );
    //     // const district = request.input( 'district' );
    //     const storeKey = request.input( 'store_key' );
    //     const storeId = request.input( 'store_id' );
    //
    //     const businessName = request.input( 'business_name' );
    //     const ruc = request.input( 'ruc' );
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
