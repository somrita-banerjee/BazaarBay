import { CONSTANTS } from './configs.constants';

export const ConfigsSchema = () => ({
    SYSTEM: {
        PORT: parseInt(process.env.port, 10),
        IS_PROD: process.env.SYSTEM_NODE_ENV === CONSTANTS.ENV.PRODUCTION,
    },
});
