'use strict';

import { google } from 'googleapis';
import Config from '@ioc:Adonis/Core/Config';

export default class GoogleCalendarController {

    public async invoke() {

        const { OAuth2 } = google.auth;

        const oAuth2Client = new OAuth2(
            Config.get( 'apiGoogle.cClientId' ),
            Config.get( 'apiGoogle.cClientSecret' ),
            Config.get( 'apiGoogle.redirectUri' ),
        );
        
        oAuth2Client.setCredentials( {
            access_token: Config.get('apiGoogle.cToken'),
            refresh_token: Config.get( 'apiGoogle.cRefreshToken' ),
        } );
        
        const calendar = await google.calendar(
            {
                version: Config.get( 'apiGoogle.apiVersion' ),
                auth: oAuth2Client,
            },
        );

        const eventStartTime = new Date();
        eventStartTime.setDate( eventStartTime.getDay() );
        const eventEndTime = new Date();
        eventEndTime.setDate( eventEndTime.getDay() );
        eventEndTime.setMinutes( eventEndTime.getMinutes() + 1 );

        const event = {
                summary: 'Prueba ts ',
                description: 'mi pruebitaaaaaaa',
                location: 'av. castro iglesias',
                conferenceData: {
                    createRequest: {
                        conferenceSolutionKey: {
                            type: 'hangoutsMeet',
                        },
                        requestId: 'some-random-string',
                    },
                },
                start: {
                    dateTime: eventStartTime.toISOString(),
                    timeZone: 'America/Lima',
                },
                attendees: [
                    { email: 'angelhuamannahui@gmail.com' },
                    { email: 'angelhuamannahui.job@gmail.com' },
                ],
                end: {
                    dateTime: eventEndTime.toISOString(),
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
                        timeMin: eventStartTime.toISOString(),
                        timeMax: eventEndTime.toISOString(),
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



