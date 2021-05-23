"use strict";

// Require google from googleapis package.
const {google} = require("googleapis");

// Require oAuth2 from our google instance.
const {OAuth2} = google.auth;

class GooglePosController2 {

    async invoke() {
        // Create a new instance of oAuth and set our Client ID & Client Secret.


        const oAuth2Client = new OAuth2(
            "251838424508-qvkh2gdkje594ov418k8gjs19ouedjdg.apps.googleusercontent.com",
            "gEoEdDg4AxAm73A9qoIzqn3q", "https://developers.google.com/oauthplayground"
        );

// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
        oAuth2Client.setCredentials({
            refresh_token: "1//04e1rR_isayoYCgYIARAAGAQSNwF-L9IrOxlU3PQU7mZdEh-k1AfoOFMhRTXtL-9j-xjHuOHS2HAu6B4jwiWNpkFjgA0dT3qQUb4"
        });

// Create a new calender instance.
        const calendar = google.calendar({version: "v3", auth: oAuth2Client});

// Create a new event start date instance for temp uses in our calendar.
        const eventStartTime = new Date();
        eventStartTime.setDate(eventStartTime.getDay() + 2);

// Create a new event end date instance for temp uses in our calendar.
        const eventEndTime = new Date();
        eventEndTime.setDate(eventEndTime.getDay() + 4);
        eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

// Create a dummy event for temp uses in our calendar
        const event = {
            summary: `Prueba js`,
            location: `3595 California St, San Francisco, CA 94118`,
            description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
            colorId: 1,
            start: {
                dateTime: eventStartTime,
                timeZone: "America/Denver"
            },
            conferenceData: {
                createRequest: {
                    conferenceSolutionKey: {
                        type: "hangoutsMeet",
                    },
                    requestId: "some-random-string"
                }
            },
            attendees: [
                {email: "angelhuamannahui@gmail.com"},
                {email: "2016200055@untels.edu.pe"},
                {email: "2016200219@untels.edu.pe"}
            ],
            end: {
                dateTime: eventEndTime,
                timeZone: "America/Denver"
            }
        };

// Check if we a busy and have an event on our calendar for the same time.
        await calendar.freebusy.query(
            {
                resource: {
                    timeMin: eventStartTime,
                    timeMax: eventEndTime,
                    timeZone: "America/Denver",
                    items: [
                        {id: "primary"}]
                }
            },
            (err, res) => {
                // Check for errors in our query and log them if they exist.
                if (err) return console.error("Free Busy Query Error: ", err);

                // Create an array of all events on our calendar during that time.
                const eventArr = res.data.calendars.primary.busy;
                console.log(eventArr)
                // Check if event array is empty which means we are not busy
                if (eventArr.length === 0)
                    // If we are not busy create a new calendar event.
                    return calendar.events.insert(
                        {calendarId: "primary", resource: event, conferenceDataVersion: 1},
                        err => {
                            // Check for errors and log them if they exist.
                            if (err) return console.error("Error Creating Calender Event:", err);
                            // Else log that the event was created.
                            return console.log("Calendar event successfully created.");
                        }
                    );

                // If event array is not empty log that we are busy.
                return console.log(`Sorry I'm busy...`);
            }
        );

    }

}

module.exports = GooglePosController2;


