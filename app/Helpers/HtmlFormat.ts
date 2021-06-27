'use strict';

import ParseHTML from 'node-html-parser';

export default class HtmlFormat {
    
    private text: string;
    
    constructor( text?: string ) {
        this.text = text ?? '';
    }
    
    public fromHtml() {
        this.text = this.text.split( '\n' ).join( '<br />' );
        return ParseHTML( this.text );
    }
}

