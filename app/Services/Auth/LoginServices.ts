'use strict';

import Config from '@ioc:Adonis/Core/Config';
import Str from '@supercharge/strings';
import moment from 'moment';
import Route from '@ioc:Adonis/Core/Route';
import Jwt from 'jsonwebtoken';

const Moment: moment.Moment = moment( 1458586740000 );

export class LoginServices {
    
    private readonly rememberMe: boolean;
    private readonly email: string;
    private readonly password: string;
    private readonly auth: any;
    private user: any;
    private exp: any;
    
    constructor( rememberMe: boolean, email: string, password: string, auth: any ) {
        this.rememberMe = rememberMe;
        this.email = email;
        this.password = password;
        this.auth = auth;
    }
    
    async login() {
        let session: any;
        try {
            
            const user = await this.auth.use( 'api' ).attempt( this.email, this.password, { expiresIn: '60mins' } );
            
            this.exp = Moment.add( this.ttl, 'minutes' ).unix();
            this.user = user.toJSON();
            const result = {
                ...this.user,
                ...this.claims,
            };
            
            session = {
                token: Jwt.sign( result, Config.get( 'app.jwtSecret' ), { expiresIn: this.exp } ),
                type: 'Bearer',
            };
        } catch (e) {
            console.log( e );
            return null;
        }
        
        return session;
    }
    
    get claims() {
        return {
            iss: Config.get( 'app.url' ) + Route.makeUrl( 'login' ),
            expiresIn: this.exp,
            iat: Moment.unix(),
            nbf: Moment.unix(),
            jti: Str.random( 32 ),
        };
    }
    
    get ttl() {
        return this.rememberMe
            ? parseInt( Config.get( 'auth.jwt.ttlRemember' ) )
            : parseInt( Config.get( 'auth.jwt.ttl' ) );
    }
    
}
