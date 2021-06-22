'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ErrorMessageBag from 'Contracts/Enums/ErrorMessageBag';
import RegisterUserValidator from 'App/Validators/RegisterUserValidator';
import { RegisterUserServices } from 'App/Services/RegisterUserServices';

export default class RegisterUsersController {
    public async invoke( { request, response }: HttpContextContract ) {
        
        const data = await request.validate( RegisterUserValidator );
        const service = new RegisterUserServices(
            data.password, data.email, data.secret_question, data.secret_response, data.name, data.role_id ? Number( data.role_id ) : null );
        
        if ( await service.isExistUser() ) {
            return response.badRequest( { message: ErrorMessageBag.EXIST_REGISTER } );
        }
        
        return await service.registrer() ?
            response.ok( { message: 'Se registró el usuario correctamente.' } )
            : response.badRequest( { message: ErrorMessageBag.BAD_ATTEMPT } );
    }
}
