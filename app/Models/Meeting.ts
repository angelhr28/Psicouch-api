import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import Status from 'Contracts/Enums/Status';

export default class Meeting extends BaseModel {
    @column( { isPrimary: true } )
    public id: number;

    @column()
    public userId: number;

    @column()
    public productId: number;

    @column()
    public colorId: number;

    @column()
    public name: string;

    @column()
    public note: string;

    @column()
    public description: string;

    @column()
    public location: string;

    @column( {
        prepare: ( value: string ) => JSON.stringify( value ),
        consume: ( value: string ) => JSON.parse( value ),
    } )
    public emails: string[];

    @column.dateTime( { autoCreate: true } )
    public createdAt: DateTime;

    @column.dateTime( { autoCreate: true, autoUpdate: true } )
    public updatedAt: DateTime;

    @column()
    public status: Status;

    @column()
    public isPaid: Status;
}
