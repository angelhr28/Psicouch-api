'use strict';

import ActionComments from 'Contracts/Enums/ActionsComments';
import Comment from 'App/Models/Comment';

export class CommentActionsServices {
    
    private readonly quoteId: number;
    private readonly action: ActionComments;
    private readonly comment?: string;
    private readonly commentId?: number;
    
    public constructor( quoteId: number, action: ActionComments, comment?: string, commentId?: number ) {
        
        this.quoteId = quoteId;
        this.action = action;
        this.comment = comment;
        this.commentId = commentId;
        
    }
    
    public async get() {
        
        try {
            switch (this.action) {
                case ActionComments.ACTION_CREATE:
                    const newComment = new Comment();
                    newComment.quoteId = this.quoteId;
                    newComment.comment = this.comment ?? '';
                    await newComment.save();
                    return { message: 'Se registro con exito.' };
                case ActionComments.ACTION_UPDATE:
                case ActionComments.ACTION_DELETE:
                    if ( !this.commentId ) return null;
                    
                    const obj: any = {
                        updated_at: new Date().toISOString().replace( /^([\d-]+)T([\d:]+)(.*)/, `$1 $2` ),
                    };
                    
                    if ( ActionComments.ACTION_UPDATE == this.action ) obj.comment = this.comment ?? '';
                    else obj.status = '0';
                    
                    await Comment.query().where( 'id', this.commentId ).update( obj );
                    
                    return { message: 'Se modifico con exito.' };
                
            }
            
            return { message: 'La cita se confirmo y agendo en tu calendario.' };
            
        } catch (e) {
            return null;
        }
    }
    
}
