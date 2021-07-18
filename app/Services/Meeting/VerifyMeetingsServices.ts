'use strict';

import Status from 'Contracts/Enums/Status';
import Meeting from 'App/Models/Meeting';
import Quote from 'App/Models/Quote';
import GoogleCalendarServices from 'App/Services/GoogleApis/GoogleCalendarServices';

export class VerifyMeetingsServices {
    
    private readonly meetingId: number;
    private readonly status: Status;
    
    public constructor( meetingId: number, status: Status ) {
        
        this.meetingId = meetingId;
        this.status = status;
        
    }
    
    public async get() {
        
        try {
            
            const meeting = await Meeting.findByOrFail( 'id', this.meetingId );
            meeting.status = this.status;
            meeting.isPaid = this.status;
            await meeting.save();
            
            await Quote.query().where( 'meeting_id', this.meetingId ).update( {
                status: this.status,
                updated_at: new Date().toISOString().replace( /^([\d-]+)T([\d:]+)(.*)/, `$1 $2` ),
            } );
            
            const calendar = new GoogleCalendarServices( meeting );
            return await calendar.get();
            
        } catch (e) {
            return null;
        }
    }
    
}
