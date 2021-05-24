'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class DeleteLogoutController {
    public async invoke( { response, auth }: HttpContextContract ) {
        await auth.use( 'api' ).revoke();
        return response.ok( { message: 'Cerro sesion.', revoked: true } );
    }
}
