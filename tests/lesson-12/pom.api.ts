import {APIRequestContext} from '@playwright/test';

class BaseApiPage {
    request: APIRequestContext;
    baseURL: string;
    token: string;

    constructor (request: APIRequestContext){
        this.request = request;
        this.baseURL = "https://material.playwrightvn.com/api/user-management/v1";
        this.token = "";
    }
 }

 export class AuthenticationApiPage extends BaseApiPage {
    loginURL = `${this.baseURL}/login.php`;

    constructor (request: APIRequestContext){
        super (request);
    }

    async login (email: string, password: string) {
        const loginResponse = await this.request.post(this.loginURL, {
            data: {
                "email": email,
                "password": password
            }
        })
        const loginResponseJSON = await loginResponse.json();
        this.token = loginResponseJSON.data.token;
        return loginResponseJSON;
    }
 }

export class UserApiPage extends BaseApiPage {
    userURL = `${this.baseURL}/users.php`;
    constructor (request: APIRequestContext, token: string) {
        super (request);
        this.token = token;
    }

    async getUsers () {
        const getUserResponse = await this.request.get(this.userURL, {
            headers:{
                'Authorization': `Bearer ${this.token}`
            },
        })
        const getUserResponseJSON = await getUserResponse.json();
        return getUserResponseJSON;
    }

    async addUser (name: string, email: string, password: string, facebook: string, avatar: string, hobbies: string, role: string) {
        const addUserResponse = await this.request.post(this.userURL, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            },
            data:{
                "name": name,
                "email": email,
                "password": password,
                "facebook": facebook,
                "avatar": avatar,
                "hobbies": hobbies,
                "role": role
            }
        })
        const addUserResponseJSON = await addUserResponse.json();
        return addUserResponseJSON;
    }

    async deleteUser (id: string) {
        const deleteUserResponse = await this.request.delete(this.userURL,{
            headers:{
                'Authorization': `Bearer ${this.token}`
            },
            data:{
                "id": id
            }
        })
        const deleteUserResponseJSON = await deleteUserResponse.json();
        return deleteUserResponseJSON;
    }
 }