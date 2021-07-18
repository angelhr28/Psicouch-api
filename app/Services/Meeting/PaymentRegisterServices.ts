'use strict';

import Status from 'Contracts/Enums/Status';
import Meeting from 'App/Models/Meeting';
import Quote from 'App/Models/Quote';

export class PaymentRegisterServices {

    private readonly meetingId: number;

    public constructor( meetingId: number ) {

        this.meetingId = meetingId;

    }

    public async get() {

        try {
            await Meeting.query().where( 'id', this.meetingId ).update( {
                status: Status.ACTIVE,
                updated_at: new Date().toISOString().replace( /^([\d-]+)T([\d:]+)(.*)/, `$1 $2` ),
            } );

            await Quote.query().where( 'meeting_id', this.meetingId ).update( {
                status: Status.ACTIVE,
                updated_at: new Date().toISOString().replace( /^([\d-]+)T([\d:]+)(.*)/, `$1 $2` ),
            } );

            return { message: 'La cita se confirmo y agendo en tu calendario.' };

        } catch (e) {
            return null;
        }
    }

}
