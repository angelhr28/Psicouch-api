'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Error from 'Contracts/Enums/ErrorMessageBag';
import Phrase from 'App/Models/Phrase';
import Gender from 'App/Models/Gender';
import Document from 'App/Models/Document';
import Disease from 'App/Models/Disease';

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
            delete profile.status;

            profile.phrase = await ProfileUsersController.getPhrase();
            profile.combos = await ProfileUsersController.getCombos();

            return profile;
        } catch (e) {
            console.log( e );
            return response.badRequest( { message: Error.BAD_ATTEMPT } );
        }
    }

    private static async getCombos() {
        try {
            return {
                genders: await ProfileUsersController.getGenders(),
                document_type: await ProfileUsersController.getDocumentType(),
                diseases_type: await ProfileUsersController.getDiseasesType(),

            };
        } catch (e) {
            console.error( e );
            return null;
        }
    }

    private static async getGenders() {
        return Gender.query();
    }

    private static async getDocumentType() {
        return Document.query();
    }

    private static async getDiseasesType() {
        return Disease.query();
    }

    private static async getPhrase() {
        const phrase = await Phrase.query()
            .select( 'name' )
            .orderByRaw( 'rand()' )
            .limit( 1 )
            .first();

        return phrase?.name;
    }
}
