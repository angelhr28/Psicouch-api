"use strict";

import { google } from "googleapis";

export default class GooglePosController {
  
  public async invoke() {
  
    // Require oAuth2 from our google instance.
    const { OAuth2 } = google.auth
  
    const oAuth2Client = new OAuth2(
      "251838424508-qvkh2gdkje594ov418k8gjs19ouedjdg.apps.googleusercontent.com",
      "gEoEdDg4AxAm73A9qoIzqn3q", "https://developers.google.com/oauthplayground"
    )
  
    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
      refresh_token: "1//04e1rR_isayoYCgYIARAAGAQSNwF-L9IrOxlU3PQU7mZdEh-k1AfoOFMhRTXtL-9j-xjHuOHS2HAu6B4jwiWNpkFjgA0dT3qQUb4"
    })
    
    const calendar = await google.calendar(
      {
        version: "v3",
        auth: oAuth2Client
      }
    );
    
    const eventStartTime = new Date();
    eventStartTime.setDate( eventStartTime.getDay() + 2 );
    const eventEndTime = new Date();
    eventEndTime.setDate( eventEndTime.getDay() + 4 );
    eventEndTime.setMinutes( eventEndTime.getMinutes() + 45 );
    
    const event = {
        summary: "Prueba ts ",
        description: "mi pruebitaaaaaaa",
        location: "av. castro iglesias",
        conferenceData: {
          createRequest: {
            conferenceSolutionKey: {
              type: "hangoutsMeet"
            },
            requestId: "some-random-string"
          }
        },
        start: {
          // date: eventStartTime.toLocaleDateString(),
          dateTime: eventStartTime.toISOString(),
          timeZone: "America/Lima"
        },
        attendees: [
          { email: "angelhuamannahui@gmail.com" },
          { email: "2016200055@untels.edu.pe" },
          { email: "2016200219@untels.edu.pe" }
        ],
        end: {
          // date: eventEndTime.toLocaleDateString(),
          dateTime: eventEndTime.toISOString(),
          timeZone: "America/Lima"
        },
        colorId: "7"
      }
    ;
    await calendar.freebusy.query(
      {
        requestBody: {
          timeMin: eventStartTime.toISOString(),
          timeMax: eventEndTime.toISOString(),
          timeZone: 'America/Lima',
          items: [
            { id: 'primary' }],
        },
      },
      (err, res) => {
        if (err) return console.error('Error al consultar la disponibilidad: ', err)
      
        const calenBusy = res?.data.calendars
        const eventArr = calenBusy?.primary.busy
        
        if ( !eventArr || eventArr.length === 0)

          return calendar.events.insert(
            { calendarId: 'primary', requestBody: event, conferenceDataVersion:1 },
            err => {
              if (err) return console.error('Hubo un error al crear la session:', err)
              return console.log('Se registro con exito la session.')
            }
          )
      
        return console.log(`La agenda ya esta llena en esa fecha`)
      }
    )
    
  }
  
}



