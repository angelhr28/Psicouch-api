'use strict';

import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class SignInValidator {
    
    public schema = schema.create( {
        email: schema.string( {
            trim: true,
        }, [
            rules.email(),
            rules.maxLength( 255 ),
        ] ),
        
        password: schema.string( {
            trim: true,
        } ),
        
    } );
    
    public messages = {
        'email.required': 'Ingrese un email',
        'email.string': 'Valor incorrecto',
        'password.string': 'Valor incorrecto',
        'password.required': 'Ingresa una contraseña',
    };
}
