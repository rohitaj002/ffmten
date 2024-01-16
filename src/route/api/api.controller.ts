import { Controller, Get, Post } from "@nestjs/common";
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('api') // Adding a base path for the controller
export class APIController {
    constructor() {}

    @ApiExcludeEndpoint ()
    @Get()
    welcome(): string {
        return 'Welcome to /api (GET)';
    }

    @ApiExcludeEndpoint ()
    @Post()
    postSomething(): string {
        return 'Received a POST request at /api';
    }
}
