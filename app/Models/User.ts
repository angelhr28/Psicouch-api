'use strict';

import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
    column,
    beforeSave,
    BaseModel,
} from '@ioc:Adonis/Lucid/Orm';
import Status from 'Contracts/Enums/Status';
import Roles from 'Contracts/Enums/Roles';

export default class User extends BaseModel {
    @column( { isPrimary: true } )
    public id: number;

    @column()
    public roleId: Roles;

    @column()
    public email?: string;

    @column()
    public name?: string | null;

    @column()
    public surname?: string | null;

    @column()
    public age?: number | null;

    @column()
    public documentId?: number | null;

    @column()
    public genderId?: number | null;

    @column()
    public phone?: string  | null;

    @column( { serializeAs: null } )
    public password: string;

    @column()
    public documentNumber: string;

    @column()
    public status: Status;

    @column()
    public rememberMeToken?: string;

    @column.dateTime( { autoCreate: true } )
    public createdAt: DateTime;

    @column.dateTime( { autoCreate: true, autoUpdate: true } )
    public updatedAt: DateTime;

    @column()
    public secretResponse: string;

    @column()
    public secretQuestion: string;

    @column()
    public helpPhrase: string;

    @beforeSave()
    public static async hashPassword( user: User ) {
        if ( user.$dirty.password ) {
            user.password = await Hash.make( user.password );
        }
    }
}
