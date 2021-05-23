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

const DATABASE_URL = new Url( Env.get( 'DATABASE_URL' ) );

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
                host: Env.get( 'MYSQL_HOST', DATABASE_URL.hostname as string ),
                port: Env.get( 'MYSQL_PORT', DATABASE_URL.port ),
                user: Env.get( 'MYSQL_USER', DATABASE_URL.username as string),
                password: Env.get( 'MYSQL_PASSWORD', DATABASE_URL.password as string),
                database: Env.get( 'MYSQL_DB_NAME', DATABASE_URL.pathname.substr( 1 ) as string),
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
