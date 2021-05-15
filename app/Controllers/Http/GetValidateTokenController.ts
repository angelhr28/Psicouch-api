'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class GetValidateTokenController {
    
    public async invoke( { auth }: HttpContextContract ) {
        console.log( 'llegooooooooooo ',  auth.toJSON() );
        return auth;
    }
}
