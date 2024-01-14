import { Module } from "@nestjs/common";
import { V1Module } from "./v1/v1.module";


@Module({
    controllers: [],
    providers:[],
    exports:[],
    imports:[
        V1Module
    ],

})

export class APIModule {}