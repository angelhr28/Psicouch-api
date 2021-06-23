'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Error from 'Contracts/Enums/ErrorMessageBag';
import Phrase from 'App/Models/Phrase';

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

            const phrases = await Phrase.query()
                .select( 'name' )
                .orderByRaw( 'rand()' )
                .limit( 1 )
                .first();

            if ( phrases ) {
                profile.name = phrases.name
            }

            return profile;
        } catch (e) {
            console.error( e );
            return response.badRequest( { message: Error.BAD_ATTEMPT } );
        }
    }
}
