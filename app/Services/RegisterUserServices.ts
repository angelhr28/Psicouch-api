'use strict';

import User from 'App/Models/User';
import Roles from 'Contracts/Enums/Roles';

export class RegisterUserServices {
    
    private readonly roleId: Roles;
    private readonly name?: string | null;
    private readonly email: string;
    private readonly password: string;
    
    constructor(
        password: string,
        email: string,
        name?: string|null,
        roleId?: Roles|null,
    ) {
        const random = Math.floor(Math.random()*(999-100+1)+100);
        this.name = name ? name : `Usuario ${random}`;
        this.roleId = roleId ? roleId : Roles.CLIENT;
        this.email = email;
        this.password = password;
    }
    
    async registrer() {
        const user = new User();
        user.roleId = this.roleId;
        user.name = this.name;
        user.email = this.email;
        user.password = this.password;
        try {
            await user.save();
            await user.refresh();
            return user;
        } catch (e) {
            console.log( e );
            return null;
        }
    }
    
    async isExistUser() {
        return await User.query().where( 'email', this.email ).first();
    }
    
}