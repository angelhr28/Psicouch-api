'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignInValidator from 'App/Validators/SignInValidator';
import { LoginServices } from 'App/Services/Auth/LoginServices';
import Error from 'Contracts/Enums/ErrorMessageBag';

export default class PostLoginsController {
    
    public async invoke( { request, response, auth }: HttpContextContract ) {
        
        const data = await request.validate( SignInValidator );
        const email = data.email;
        const password = data.password;
        
        const service = new LoginServices( email, password, auth );
        const result = await service.login();
        
        return result ? result : response.badRequest( { message: Error.INVALID_CREDENTIALS } );
    }
}
