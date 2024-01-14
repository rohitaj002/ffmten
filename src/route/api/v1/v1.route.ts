import { UserController } from "./user/user.controller";


export const V1Routes = [
    {
        path: 'user',
        module: UserController
        // children: 
    }
]