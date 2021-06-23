'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Error from 'Contracts/Enums/ErrorMessageBag';
import RecoveryPasswordValidator from 'App/Validators/RecoveryPasswordValidator';
import { RecoveryPasswordsServices } from 'App/Services/RecoveryPassword/RecoveryPasswordsServices';
import Actions from 'Contracts/Enums/Actions';

export default class RecoveryPasswordsController {
    public async invoke( { request, response }: HttpContextContract ) {
        
        const data = await request.validate( RecoveryPasswordValidator );
        
        if ( data.action == Actions.VERIFY_SECRET && !data.secret_response ) {
            return response.badRequest( { message: Error.EXIST_SECRET_WORD } );
        }
        
        if ( data.action == Actions.CHANGE_PASSWORD && !data.password ) {
            return response.badRequest( { message: Error.EXIST_PASSWORD } );
        }
        
        const service = new RecoveryPasswordsServices( data.action, data.email, data.secret_response ?? '', data.password ?? '' );
        const result = await service.getAction();
        
        if ( result.body ) result.body.message = result.message;
        
        return result.body
            ? response.ok( result.body )
            : response.badRequest( { message: result.message } );
        
    }
}
