import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class MeetingCrossingValidator {
    constructor( protected ctx: HttpContextContract ) {
    }


    public schema = schema.create( {

        date: schema.string( {
            trim: true,
        } ),

        start_time: schema.string( {
            trim: true,
        }, [ rules.maxLength( 8 ) ] ),


        end_time: schema.string( {
            trim: true,
        }, [ rules.maxLength( 8 ) ] ),

    } );

    public messages = {};
}
