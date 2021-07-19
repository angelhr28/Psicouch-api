// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CommentActionValidator from 'App/Validators/CommentActionValidator';
import { CommentActionsServices } from 'App/Services/Meeting/CommentActionsServices';

export default class CommentActionsController {
    public async invoke( { request, response }: HttpContextContract ) {
        
        const data = await request.validate( CommentActionValidator );
        
        const comment = new CommentActionsServices( data.quote_id, data.action, data.comment, data.comment_id );
        const result = await comment.get();
        
        return result
            ? response.ok( result )
            : response.badRequest( { message: 'Hubo un error.' } );
    }
}
