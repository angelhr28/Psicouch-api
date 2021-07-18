'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingRegisterValidator from 'App/Validators/MeetingRegisterValidator';
import { MeetingRegisters } from 'App/Services/Meeting/MeetingRegistersServices';

export default class MeetingRegistersController {
    public async invoke( { request, response, auth }: HttpContextContract ) {
    
        console.error('-----------------------------------------------------------------------')
        console.log(request)
        console.error('-----------------------------------------------------------------------')
    
    
        const data = await request.validate( MeetingRegisterValidator );
        const profile = auth.toJSON().guards.api.user;
        
        if ( data.is_app ) {
            data.emails     = JSON.parse( request.input( 'emails_app' ) );
            data.date       = JSON.parse( request.input( 'date_app' ) );
            data.start_time = JSON.parse( request.input( 'start_time_app' ) );
            data.end_time   = JSON.parse( request.input( 'end_time_app' ) );
        }

        console.error('-----------------------------------------------------------------------')
        console.log(data)
        console.error('-----------------------------------------------------------------------')
        
        const service = new MeetingRegisters( profile.id,
            data.name, data.surname, data.age, data.phone, data.document_id,
            data.document_number, data.emails ?? [], data.product_id, data.gender_id, data.description,
            data.disease, data.date ?? [], data.start_time ?? [], data.end_time ?? [],
        );
        
        const result = await service.get();
        
        return result.status == 200
            ? response.ok( { message: result.message } )
            : response.badRequest( { message: result.message } );
    }
}
