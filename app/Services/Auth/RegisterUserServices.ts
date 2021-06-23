'use strict';

import User from 'App/Models/User';
import Roles from 'Contracts/Enums/Roles';

export class RegisterUserServices {
    
    private readonly roleId: Roles;
    private readonly name?: string | null;
    private readonly email: string;
    private readonly password: string;
    private readonly secretQuestion: string;
    private readonly secretResponse: string;
    private readonly helpPhrase: string;
    
    constructor(
        password: string,
        email: string,
        secretQuestion: string,
        secretResponse: string,
        helpPhrase: string,
        name?: string | null,
        roleId?: Roles | null,
    ) {
        const random = Math.floor( Math.random() * ( 999 - 100 + 1 ) + 100 );
        this.name = name ? name : `Usuario ${ random }`;
        this.roleId = roleId ? roleId : Roles.CLIENT;
        this.email = email;
        this.password = password;
        this.secretResponse = secretResponse;
        this.secretQuestion = secretQuestion;
        this.helpPhrase = helpPhrase;
    }
    
    async registrer() {
        const user = new User();
        user.roleId = this.roleId;
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        user.secretQuestion = this.secretQuestion;
        user.secretResponse = this.secretResponse;
        user.helpPhrase = this.helpPhrase;
        
        try {
            await user.save();
            await user.refresh();
            return 'Se registró el usuario correctamente.';
        } catch (e) {
            console.log( e );
            return null;
        }
    }
    
    async isExistUser() {
        return await User.findBy( 'email', this.email );
    }
    
}