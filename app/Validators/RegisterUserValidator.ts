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
        
        // surname: schema.string.optional( {
        //     trim: true,
        // }, [
        //     rules.maxLength( 255 ),
        // ] ),
        
        email: schema.string( {
            trim: true,
        }, [
            rules.email(),
            rules.maxLength( 255 ),
        ] ),
        
        // phone: schema.string.optional( {
        //     trim: true,
        // }, [
        //     rules.maxLength( 255 ),
        // ] ),
        
        password: schema.string( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 20 ),
        ] ),
        
        // document_number: schema.string.optional( {
        //     trim: true,
        // }, [
        //     rules.regex( /[0-9]{8}$/ ),
        // ] ),
        //
    } );
    
    public messages = {
        'role_id.number': 'Valor incorrecto',
        'name.required': 'Ingrese un nombre',
        'name.string': 'Valor incorrecto',
        'name.maxLength': 'Excedió el limite de caracteres',
        'surname.required': 'Ingrese un apellido',
        'surname.string': 'Valor incorrecto',
        'surname.maxLength': 'Excedió el limite de caracteres',
        'email.string': 'Valor incorrecto',
        'email.email': 'Ingresa un email',
        'email.maxLength': 'Excedió el limite de caracteres',
        'phone.string': 'Valor incorrecto',
        'phone.maxLength': 'Excedió el limite de caracteres',
        'password.string': 'Valor incorrecto',
        'password.required': 'Ingresa una contraseña',
        'password.minLength': 'Ingresa una contraseña con 5 caracteres como mínimo',
        'password.maxLength': 'Ingresa una contraseña con 20 caracteres como maximo',
        'document_number.required': 'Ingrese un numero de documentos',
        'document_number.string': 'Valor incorrecto',
        'document_number.regex': 'Numero de DNI incorrecto',
    };
}
