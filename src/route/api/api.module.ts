// src\route\api\api.module.ts
import { Module } from "@nestjs/common";
import { V1Module } from "./v1/v1.module";
import { APIController } from "./api.controller";

@Module({
    controllers: [APIController],
    providers: [],
    exports: [],
    imports: [V1Module],
})
export class APIModule {}
