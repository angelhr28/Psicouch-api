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
        const rememberMe = data.remember_me ?? false;
        
        const service = new LoginServices( rememberMe, email, password, auth );
        const result = await service.login();
        
        return result ?? response.unauthorized( { message: Error.INVALID_CREDENTIALS } );
    }
}
