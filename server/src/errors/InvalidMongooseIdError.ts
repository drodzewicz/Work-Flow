type InvalidMongooseIdErrorAttributes = {
    modelName: string;
};

export class InvalidMongooseIdError extends Error {
    constructor(message: string = "provided invalid Mongoose Id", modelName: string = "Uknown") {
        super(message);
        this.name = "Invalid Mongoose Id";
        this.modelName = modelName;
    }
    public modelName: string;
}
