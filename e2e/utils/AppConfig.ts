import env from "env-var";

type ConfigUser = {
    username: string;
    password: string;
    access_token?: string;
};

class AppConfig {
    private static instance: AppConfig;

    public appURL!: string;
    public apiURL!: string;

    public testUser!: ConfigUser;
    public supplementaryUser!: ConfigUser;

    private constructor() {}

    public static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }

        return AppConfig.instance;
    }

    public initialize() {
        this.appURL = env.get("APP_BASE_URL").required().asString();
        this.apiURL = env.get("API_BASE_URL").required().asString();

        this.testUser = {
            username: env.get("TEST_USER_USERNAME").required().asString(),
            password: env.get("TEST_USER_PASSWORD").required().asString(),
            access_token: env.get("TEST_USER_ACCESS_TOKEN").asString(),
        };

        this.supplementaryUser = {
            username: env
                .get("SUPPLEMENTARY_USER_USERNAME")
                .required()
                .asString(),
            password: env
                .get("SUPPLEMENTARY_USER_PASSWORD")
                .required()
                .asString(),
            access_token: env.get("SUPPLEMENTARY_USER_ACCESS_TOKEN").asString(),
        };
    }
}

export default AppConfig;
