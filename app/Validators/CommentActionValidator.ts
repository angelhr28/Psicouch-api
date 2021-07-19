import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ActionComments from 'Contracts/Enums/ActionsComments';

export default class CommentActionValidator {
    constructor( protected ctx: HttpContextContract ) {
    }
    
    public schema = schema.create( {
        quote_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'quotes',
                column: 'id',
            } ),
        ] ),
        
        action: schema.enum( Object.values( ActionComments ) ),
        
        comment: schema.string.optional( {
            trim: true,
        }, [
            rules.minLength( 5 ),
            rules.maxLength( 100 ),
        ] ),
    
        comment_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'comments',
                column: 'id',
            } ),
        ] ),
        
    } );
    
    public messages = {};
}
