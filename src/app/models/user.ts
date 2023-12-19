import { RefModel } from "./reference";

export class User {
    userId?: number;
    userName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    emailAddress?: string;
    status?: string;
    createdDate?: Date;
    updatedDate?: Date;
    roles?: Array<RefModel> = [];
}
export class LoginRequest {
    username?: string;
    password?: String;
    constructor(username?: string, password?: string) { }
}
export class UpdatePassword {
    userId?: number;
    oldPassword?: string;
    newPassword?: string;
    customer?: boolean;
}
export class LoginResponse {
    userCd?: string;
    roles?: string;
    name?: string;
    token?: string;
}
export class JwtResponse {
    token?: string;
    userId?: number;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    roles?: string[];
}
