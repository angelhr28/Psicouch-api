// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingCrossingValidator from 'App/Validators/MeetingCrossingValidator';
import { MeetingCrossingServices } from 'App/Services/Meeting/MeetingCrossingServices';

export default class MeetingCrossingsController {

    public async invoke( { request, response }: HttpContextContract ) {

        const data = await request.validate( MeetingCrossingValidator );

        const crossing = new MeetingCrossingServices( data.date, data.start_time, data.end_time );
        const validate = await crossing.isExist();

        return validate
            ? response.badRequest( { message: 'Existe una visita registrada en este rango de horas.' } )
            : response.status( 200 );
    }

}
