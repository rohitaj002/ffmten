import { V1Module } from "./v1/v1.module";
import { V1Routes } from "./v1/v1.route";


export const APIRoutes = [
    {
        Path: 'v1',
        module: V1Module,
        children: V1Routes,
    },
]