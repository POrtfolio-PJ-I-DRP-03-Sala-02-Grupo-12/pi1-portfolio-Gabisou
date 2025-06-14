import { Pool } from 'mysql2/promise';

declare global {
    namespace Express {
        interface Request {
            db?: Pool;
        }
    }
}