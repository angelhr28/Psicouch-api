'use strict';

import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class SignInValidator {
    
    public schema = schema.create( {
        email: schema.string( {
            trim: true,
        }, [
            rules.email(),
            rules.maxLength( 100 ),
        ] ),
        
        password: schema.string( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 20 ),
        ] ),
        
    } );
    
    public messages = {
        'email.required': 'Ingrese un email',
        'email.string': 'Valor incorrecto',
        'email.email': 'Ingresa un email',
        'email.maxLength': 'Excedió el limite de caracteres',
        'email.minLength': 'Falta de caracteres',
    
        'password.string': 'Valor incorrecto',
        'password.required': 'Ingresa una contraseña',
        'password.maxLength': 'Excedió el limite de caracteres',
        'password.minLength': 'Falta de caracteres',
    };
}
