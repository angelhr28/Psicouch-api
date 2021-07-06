import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingCalendarValidator from 'App/Validators/MeetingCalendarValidator';
import { MeetingCalendarServices } from 'App/Services/Meeting/MeetingCalendarServices';

export default class MeetingCalendarsController {
    public async invoke( { request, response, auth }: HttpContextContract ) {
        
        const data = await request.validate( MeetingCalendarValidator );
        const profile = auth.toJSON().guards.api.user;
        console.log( profile );
        const crossing = new MeetingCalendarServices( profile.id, profile.role_id, data.year, data.month );
        const meeting = await crossing.get();
        
        return meeting
            ? response.ok( meeting )
            : response.badRequest( { message: 'Sin resultados.' } );
    }
}
