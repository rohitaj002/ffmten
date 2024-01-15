// src\route\api\v1\v1.route.ts

import { UserModule } from "./user/user.module";

export const V1Routes = [
    {
        path: 'user',
        controller: UserModule, 
    },
];
