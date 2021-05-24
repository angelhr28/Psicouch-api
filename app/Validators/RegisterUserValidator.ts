'use strict';

import { rules, schema } from '@ioc:Adonis/Core/Validator';
import Roles from 'Contracts/Enums/Roles';

export default class RegisterUserValidator {
    
    public schema = schema.create( {
        role_id: schema.enum.optional( Object.values( Roles ), [
                rules.exists( {
                    table: 'roles',
                    column: 'id',
                    where: { status: '1' },
                } ),
            ],
        ),
        
        name: schema.string.optional( {
            trim: true,
        }, [
            rules.maxLength( 255 ),
        ] ),
        
        email: schema.string( {
            trim: true,
        }, [
            rules.email(),
            rules.maxLength( 255 ),
        ] ),
        
        password: schema.string( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 20 ),
        ] ),
        
    } );
    
    public messages = {
        'role_id.number': 'Valor incorrecto',
        'name.string': 'Valor incorrecto',
        'name.maxLength': 'Excedió el limite de caracteres',
        'email.required': 'Ingrese un correo',
        'email.string': 'Valor incorrecto',
        'email.email': 'Ingresa un email',
        'email.maxLength': 'Excedió el limite de caracteres',
        'password.required': 'Ingresa una contraseña',
        'password.string': 'Valor incorrecto',
        'password.minLength': 'Ingresa una contraseña con 5 caracteres como mínimo',
        'password.maxLength': 'Ingresa una contraseña con 20 caracteres como maximo',
    };
}
