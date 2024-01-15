import { Controller, Get, Post } from "@nestjs/common";

@Controller('api') // Adding a base path for the controller
export class APIController {
    constructor() {}

    @Get()
    welcome(): string {
        return 'Welcome to /api (GET)';
    }

    @Post()
    postSomething(): string {
        return 'Received a POST request at /api';
    }
}
