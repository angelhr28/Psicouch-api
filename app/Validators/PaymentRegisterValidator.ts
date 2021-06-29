import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class PaymentRegisterValidator {
    constructor( protected ctx: HttpContextContract ) {
    }

    public schema = schema.create( {
        meeting_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'meetings',
                column: 'id',
            } ),
        ] ),
    } );

    public messages = {};
}
