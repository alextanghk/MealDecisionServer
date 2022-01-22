import * as KnexConfig from '../../knexfile'
import { knex } from 'knex';

const connection = knex(KnexConfig);

export default connection;