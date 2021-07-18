import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import VerifyMeetingValidator from 'App/Validators/VerifyMeetingValidator';
import { VerifyMeetingsServices } from 'App/Services/Meeting/VerifyMeetingsServices';

export default class VerifyMeetingsController {
    public async invoke( { request, response }: HttpContextContract ) {
        
        const data = await request.validate( VerifyMeetingValidator );
        
        const verify = new VerifyMeetingsServices( data.meeting_id, data.status );
        const meeting = await verify.get();
        
        return meeting
            ? response.ok( meeting )
            : response.badRequest( { message: 'Sin resultados.' } );
    }
}
