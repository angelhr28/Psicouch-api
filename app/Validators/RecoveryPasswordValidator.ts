'use strict';

import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Actions from 'Contracts/Enums/Actions';

export default class RecoveryPasswordValidator {
    constructor( protected ctx: HttpContextContract ) {
    }
    
    public schema = schema.create( {
        
        action: schema.enum( Object.values( Actions ) ),
        
        email: schema.string( {
            trim: true,
        }, [
            rules.email(),
            rules.maxLength( 100 ),
        ] ),
        
        secret_response: schema.string.optional( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 100 ),
        ] ),
        
        password: schema.string.optional( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 20 ),
        ] ),
    } );
    
    public messages = {
        'action.enum': 'Tipo de resultado incorrecto',
        
        'email.required': 'Ingrese un correo',
        'email.string': 'Valor incorrecto',
        'email.email': 'Ingresa un email',
        'email.maxLength': 'Excedió el limite de caracteres',
        'email.minLength': 'Falta de caracteres',
        
        'secret_response.required': 'Ingresa una respuesta secreta',
        'secret_response.string': 'Valor incorrecto',
        'secret_response.minLength': 'Ingresa una respuesta secreta con 5 caracteres como mínimo',
        'secret_response.maxLength': 'Ingresa una respuesta secreta con 100 caracteres como maximo',
        
        'password.string': 'Valor incorrecto',
        'password.required': 'Ingresa una contraseña',
        'password.maxLength': 'Excedió el limite de caracteres',
        'password.minLength': 'Falta de caracteres',
    };
}
