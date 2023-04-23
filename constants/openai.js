import { Configuration } from "openai";

import { ORGANIZATION, OPENAI_API_KEY } from '@env'

const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey: OPENAI_API_KEY,
});

export default configuration;