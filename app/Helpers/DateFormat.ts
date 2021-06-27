'use strict';

export default class DateFormat {
    private readonly date: string;
    private readonly language: string = 'es-ES';

    constructor( dateString: string ) {
        this.date = dateString;
    }

    public fullDateString(): string {
        const date: Date = new Date( this.date );
        date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
        const weekday: string = date.toLocaleDateString( this.language, { day: 'numeric', weekday: 'long' } );
        const monthYear: string = date.toLocaleDateString( this.language, { year: 'numeric', month: 'long' } );
        return `${ DateFormat.capitalize( weekday ) } de ${ DateFormat.capitalize( monthYear ) }`;
    }

    public dateString(): string {
        const date: Date = new Date( this.date );
        date.setMinutes( date.getMinutes() + date.getTimezoneOffset() );
        const day: string = date.toLocaleDateString( this.language, { day: 'numeric' } );
        const month: string = date.toLocaleDateString( this.language, { month: 'long' } );
        const year: string = date.toLocaleDateString( this.language, { year: 'numeric' } );

        return `${ day } de ${ DateFormat.capitalize( month ) } del ${ year }`;
    }

    public timeString(): String {

        const time = new Date();
        const pieces = this.date.split( ':' );

        if ( pieces.length < 2 ) return this.date;

        const hour = parseInt( pieces[0], 10 );
        const minute = parseInt( pieces[1], 10 );

        time.setHours( hour );
        time.setMinutes( minute );

        const format: String = time.toLocaleTimeString( 'en-US', { hour: 'numeric', minute: 'numeric', hour12: true } );
        return format.toLowerCase();
    }

    private static capitalize( text: string ): string {
        return text.charAt( 0 ).toUpperCase() + text.slice( 1 );
    }
}

