import { BadRequestError } from "routing-controllers";

export class PayloadError extends BadRequestError {
    constructor(message: string = "Invalid request payload", messages?: unknown[]) {
        super(message);
        this.name = "Invalid request payload";
        this.messages = messages;
    }
    private messages: unknown[];
}
