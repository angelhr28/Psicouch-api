'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ErrorMessageBag from 'Contracts/Enums/ErrorMessageBag';
import RegisterUserValidator from 'App/Validators/RegisterUserValidator';
import { RegisterUserServices } from 'App/Services/RegisterUserServices';

export default class RegisterUsersController {
    public async invoke( { request, response }: HttpContextContract ) {
        
        const data = await request.validate( RegisterUserValidator );
        console.log( data.role_id );
        const service = new RegisterUserServices(
            data.password, data.email, data.role_id ? Number( data.role_id ) : null,
        );
        
        if ( await service.isExistUser() ) {
            return response.badRequest( { message: ErrorMessageBag.EXIST_REGISTER } );
        }
        
        return await service.registrer() ?? response.badRequest( { message: ErrorMessageBag.BAD_ATTEMPT } );
    }
}
