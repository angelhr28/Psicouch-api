'use strict';

import Actions from 'Contracts/Enums/Actions';
import User from 'App/Models/User';

export class RecoveryPasswordsServices {

    private readonly action: Actions;
    private readonly email: string;
    private readonly secretResponse: string;
    private readonly password: string;

    constructor( action: Actions, email: string, secretResponse: string, password: string ) {
        this.action = action;
        this.email = email;
        this.secretResponse = secretResponse;
        this.password = password;
    }

    async getAction() {
        switch (this.action) {
            case Actions.VERIFY_EMAIL:
                return this.getVerifyEmail();
            case Actions.VERIFY_SECRET:
                return this.getVerifySecret();
            case Actions.CHANGE_PASSWORD:
                return this.getChangePassword();
            default:
                return this.getVerifyEmail();
        }
    }

    async getVerifyEmail() {

        const user = await User.query().select( 'secret_question', 'help_phrase' ).where( 'email', this.email ).first();

        return {
            message: user ? 'El correo esta registrado' : 'El correo no se encuntra registrado intente nuevamente',
            body: user?.toJSON(),
        };
    }

    async getVerifySecret() {

        const user = await User.query()
            .select('id')
            .where( 'email', this.email )
            .where( 'secret_response', this.secretResponse )
            .first();

        return {
            message: user ? 'La respuesta secreta es correcta' : 'La respuesta secreta no es correcta intente nuevamente',
            body: user ? {} : undefined
        };

    }

    async getChangePassword() {

        const user = await User.findBy( 'email', this.email );

        const response = {
            message: user ? 'La contraseña se modificó con exito' : 'La contraseña no se modificó intente nuevamente',
            body: user ? {} : undefined
        };

        if ( user ) {
            user.password = this.password;
            await user.save();
        }

        return response;

    }

}
