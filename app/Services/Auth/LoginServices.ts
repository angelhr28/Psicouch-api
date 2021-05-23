'use strict';

export class LoginServices {
    
    private readonly email: string;
    private readonly password: string;
    private readonly auth: any;
    
    constructor( email: string, password: string, auth: any ) {
        this.email = email;
        this.password = password;
        this.auth = auth;
    }
    
    async login() {
        try {
            return await this.auth.use( 'api' ).attempt( this.email, this.password, { expiresIn: '180mins' } );
        } catch (e) {
            return null;
        }
    }
}
