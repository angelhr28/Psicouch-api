'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Error from 'Contracts/Enums/ErrorMessageBag';

export default class ProfileUsersController {

    public async invoke( { response, auth }: HttpContextContract ) {
        try {
            const profile = auth.toJSON().guards.api.user;
            delete profile.password;
            delete profile.remember_me_token;
            delete profile.created_at;
            delete profile.updated_at;
            delete profile.secret_question;
            delete profile.secret_response;
            delete profile.help_phrase;
            return auth.toJSON().guards.api.user;
        } catch (e) {
            return response.badRequest( { message: Error.BAD_ATTEMPT } );
        }
    }
}
