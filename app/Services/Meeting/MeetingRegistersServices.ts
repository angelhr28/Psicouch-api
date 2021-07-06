'use strict';

import Meeting from 'App/Models/Meeting';
import User from 'App/Models/User';
import Quote from 'App/Models/Quote';
import Status from 'Contracts/Enums/Status';

export class MeetingRegisters {

    private readonly userId: number;
    private readonly name: string;
    private readonly surname: string;
    private readonly age: number;
    private readonly phone: string;
    private readonly documentId: number;
    private readonly documentNumber: string;
    private readonly email: string[];
    private readonly productId: number;
    private readonly genderId: number;
    private readonly description: string;
    private readonly disease: string;
    private readonly date: string[];
    private readonly startTime: string[];
    private readonly endTime: string[];
    private meetingId: number;

    constructor( userId: number, name: string, surname: string, age: number, phone: string, documentId: number,
                 documentNumber: string, email: string[], productId: number, genderId: number, description: string,
                 disease: string, date: string[], startTime: string[], endTime: string[],
    ) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.phone = phone;
        this.documentId = documentId;
        this.documentNumber = documentNumber;
        this.email = email;
        this.productId = productId;
        this.genderId = genderId;
        this.description = description;
        this.disease = disease;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public async get() {
        try {
            await this.registerUser();
            await this.registerMeeting();
            await this.registerQuote();

            return {
                status: 200,
                message: 'Se registro correctamente',
            };
        } catch (e) {
            console.error('-----------------------------------------------------------------------')
            console.log(e)
            console.error('-----------------------------------------------------------------------')
            return {
                status: 400,
                message: 'Hubo un error' + e,
            };
        }
    }

    public async registerUser() {
        await User.query().where( 'id', this.userId ).update( {
            name: this.name,
            surname: this.surname,
            age: this.age,
            document_id: this.documentId,
            document_number: this.documentNumber,
            gender_id: this.genderId,
            phone: this.phone,
            updated_at: new Date().toISOString().replace( /^([\d-]+)T([\d:]+)(.*)/, `$1 $2` ),
        } );
    }

    public async registerMeeting() {
        const meeting = new Meeting();
        meeting.userId = this.userId;
        meeting.productId = this.productId;
        meeting.colorId = 7;
        meeting.name = this.disease;
        meeting.description = this.description;
        meeting.emails = this.email;
        await meeting.save();
        await meeting.refresh();
        this.meetingId = meeting.id;
    }

    public async registerQuote() {
        for (let i = 0; i < this.date.length; i++) {
            const quote = new Quote();
            quote.meetingId = this.meetingId;
            quote.date = this.date[i];
            quote.startTime = this.startTime[i];
            quote.endTime = this.endTime[i];
            quote.status = Status.INACTIVE;
            await quote.save();
        }
    }

}
