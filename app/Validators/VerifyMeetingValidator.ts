import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Status from 'Contracts/Enums/Status';

export default class VerifyMeetingValidator {
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
        
        status:schema.enum( Object.values( Status ) ),
    } );
    
    public messages = {};
}
