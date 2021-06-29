// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { google } from 'googleapis';
import Config from '@ioc:Adonis/Core/Config';
import path from 'path';
import fs from 'fs';

export default class GoogleDrivesController {

    public async invoke() {
        const { OAuth2 } = google.auth;

        const oAuth2Client = new OAuth2(
            Config.get( 'apiGoogle.dClientId' ),
            Config.get( 'apiGoogle.dClientSecret' ),
            Config.get( 'apiGoogle.redirectUri' ),
        );

        oAuth2Client.setCredentials( {
            refresh_token: Config.get( 'apiGoogle.dRefreshToken' ),
        } );

        const drive = await google.drive(
            {
                version: Config.get( 'apiGoogle.apiVersion' ),
                auth: oAuth2Client,
            },
        );

        // const filePath = path.join( __dirname + '/resources/images', 'img.jpg' );
        const filePath = path.join(Config.get( 'apiGoogle.pathImg' ), 'img.jpg' );

        console.log( filePath );
        try {

            const folderBody = {
                resource: {
                    name: 'Angel',
                    mimeType: 'application/vnd.google-apps.folder',
                },
                fields: 'id',
            };

            // @ts-ignore
            const folder = await drive.files.create( folderBody );

            console.log( folder.data );

            const body = {
                requestBody: {
                    mimeType: 'image/jpg',
                    name: 'photo.jpg',
                    parents: [ folder.data.id ],
                },
                media: {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream( filePath ),
                },
            };

            // @ts-ignore
            const response = await drive.files.create( body );

            console.log( response.data );
        } catch (error) {
            console.log( error.message );
        }
    }

}
