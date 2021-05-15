'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DeleteLogoutController {
    public async invoke( { response, auth }: HttpContextContract ) {
        console.log(auth.toJSON())
        await auth.use( 'api' ).revoke();
        
        return response.ok( { message: 'Cerro sesion.', revoked: true } );
    }
}
