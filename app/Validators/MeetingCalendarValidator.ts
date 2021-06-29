import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class MeetingCalendarValidator {
    constructor( protected ctx: HttpContextContract ) {
    }

    public schema = schema.create( {
        year: schema.string( {
                trim: true,
            },
        ),
        month: schema.string( {
                trim: true,
            },
        ),
    } );

    public messages = {};
}
