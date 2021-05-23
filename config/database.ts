/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env';
import { OrmConfig } from '@ioc:Adonis/Lucid/Orm';
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';
import Url from 'url-parse';

const CLEARDB_DATABASE_URL = new Url( Env.get( 'CLEARDB_DATABASE_URL' ) );

const databaseConfig: DatabaseConfig & { orm: Partial<OrmConfig> } = {
    /*
    |--------------------------------------------------------------------------
    | Connection
    |--------------------------------------------------------------------------
    |
    | The primary connection for making database queries across the application
    | You can use any key from the `connections` object defined in this same
    | file.
    |
    */
    connection: Env.get( 'DB_CONNECTION' ),
    
    connections: {
        /*
        |--------------------------------------------------------------------------
        | MySQL config
        |--------------------------------------------------------------------------
        |
        | Configuration for MySQL database. Make sure to install the driver
        | from npm when using this connection
        |
        | npm i mysql
        |
        */
        mysql: {
            client: 'mysql',
            connection: {
                host: Env.get( 'MYSQL_HOST', CLEARDB_DATABASE_URL.host ),
                port: Number(''),
                user: Env.get( 'MYSQL_USER', CLEARDB_DATABASE_URL.username ),
                password: Env.get( 'MYSQL_PASSWORD', CLEARDB_DATABASE_URL.host.password ),
                database: Env.get( 'MYSQL_DB_NAME', CLEARDB_DATABASE_URL.pathname.substr( 1 ) ),
            },
            healthCheck: false,
            debug: false,
        },
        
    },
    
    /*
    |--------------------------------------------------------------------------
    | ORM Configuration
    |--------------------------------------------------------------------------
    |
    | Following are some of the configuration options to tweak the conventional
    | settings of the ORM. For example:
    |
    | - Define a custom function to compute the default table name for a given model.
    | - Or define a custom function to compute the primary key for a given model.
    |
    */
    orm: {},
};

export default databaseConfig;
