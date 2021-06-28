'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import MeetingRegisterValidator from 'App/Validators/MeetingRegisterValidator';
import { MeetingRegisters } from 'App/Services/Meeting/MeetingRegistersServices';

export default class MeetingRegistersController {
    public async invoke( { request, response, auth }: HttpContextContract ) {

        const data = await request.validate( MeetingRegisterValidator );
        const profile = auth.toJSON().guards.api.user;

        const service = new MeetingRegisters( profile.id,
            data.name, data.surname, data.age, data.phone, data.document_id,
            data.document_number, data.email, data.product_id,data.gender_id, data.description,
            data.disease, data.date, data.start_time, data.end_time,
        );

        const result = await service.get()

        return result.status == 200
        ? response.ok(result.message)
        : response.ok(result.message)
    }
}
