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
        roleId?: Roles|null,
    ) {
        console.log(roleId)
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