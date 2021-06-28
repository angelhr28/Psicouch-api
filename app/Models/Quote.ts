import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import Status from 'Contracts/Enums/Status';

export default class Quote extends BaseModel {
    @column( { isPrimary: true } )
    public id: number;

    @column()
    public meetingId: number;

    @column()
    public date: string;

    @column()
    public startTime: string;

    @column()
    public endTime: string;

    @column()
    public linkMeet: string;

    @column.dateTime( { autoCreate: true } )
    public createdAt: DateTime;

    @column.dateTime( { autoCreate: true, autoUpdate: true } )
    public updatedAt: DateTime;

    @column()
    public status: Status;
}
