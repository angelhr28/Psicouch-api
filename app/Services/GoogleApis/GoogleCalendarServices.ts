'use strict';

import { google } from 'googleapis';
import Config from '@ioc:Adonis/Core/Config';
import Meeting from 'App/Models/Meeting';
import DateFormat from 'App/Helpers/DateFormat';
import Quote from 'App/Models/Quote';

export default class GoogleCalendarServices {
    
    private readonly meeting: Meeting;
    
    constructor( meeting: Meeting ) {
        this.meeting = meeting;
    }
    
    private getQuotes() {
        return Quote.query()
            .where( 'meeting_id', this.meeting.id );
    }
    
    async get() {
        const quote = await this.getQuotes();
        
        quote.forEach( q => {
            this.register( q );
        } );
        return { message: 'La cita se confirmo y agendo en tu calendario.' };
    }
    
    async register( quote: Quote ) {
        
        const { OAuth2 } = google.auth;
        
        const oAuth2Client = new OAuth2(
            Config.get( 'apiGoogle.cClientId' ),
            Config.get( 'apiGoogle.cClientSecret' ),
            Config.get( 'apiGoogle.redirectUri' ),
        );
        
        oAuth2Client.setCredentials( {
            refresh_token: Config.get( 'apiGoogle.cRefreshToken' ),
        } );
        
        const calendar = await google.calendar(
            {
                version: Config.get( 'apiGoogle.apiVersion' ),
                auth: oAuth2Client,
            },
        );
        
        const dateFormat = new DateFormat( quote.date );
        const emails = this.meeting.emails.map( ( value ) => ( { email: value } ) );
        
        const event = {
                summary: `Asunto: ${ this.meeting.name }`,
                description: this.meeting.description,
                location: 'Consultorio virtual',
                conferenceData: {
                    createRequest: {
                        conferenceSolutionKey: {
                            type: 'hangoutsMeet',
                        },
                        requestId: 'some-random-string',
                    },
                },
                start: {
                    dateTime: dateFormat.timeToIso( quote.startTime ),
                    timeZone: 'America/Lima',
                },
                attendees: emails,
                end: {
                    dateTime: dateFormat.timeToIso( quote.endTime ),
                    timeZone: 'America/Lima',
                },
                colorId: '7',
                backgroundColor: '#0088aa',
            }
        ;
        try {
            
            const response = await calendar.freebusy.query(
                {
                    requestBody: {
                        timeMin: dateFormat.timeToIso( quote.startTime ),
                        timeMax: dateFormat.timeToIso( quote.endTime ),
                        timeZone: 'America/Lima',
                        items: [
                            { id: 'primary' } ],
                    },
                } );
            
            const calenBusy = response?.data.calendars;
            
            const eventArr = calenBusy?.primary.busy;
            console.log( eventArr );
            
            if ( eventArr && eventArr.length !== 0 ) {
                return `La agenda ya esta llena en esa fecha`;
            }
            
            if ( !eventArr || eventArr.length === 0 ) {
                const insert = await calendar.events.insert(
                    { calendarId: 'primary', requestBody: event, conferenceDataVersion: 1 },
                );
                
                console.log( insert.data.hangoutLink );
                
            }
            
            return 'Se registro con exito la session.';
            
        } catch (e) {
            if ( e.code == 400 ) return console.error( 'Error al consultar la disponibilidad: ', e );
            
            if ( e ) return console.error( 'Hubo un error al crear la session:', e );
            
        }
        
        
    }
    
}



