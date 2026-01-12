import { APIRequestContext } from '@playwright/test'

export class TodoApiPage {
    request: APIRequestContext;

    baseURL: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseURL = "https://material.playwrightvn.com/api/todo-app/v1";
    }

    async getTodos() {
        const url = `${this.baseURL}/todos.php`;
        const response = await this.request.get(url);
        const responseJSON = await response.json();
        return responseJSON;
    }

    async getTodo(id: string) {
        const url = `${this.baseURL}/todo.php`;
        const response = await this.request.get(url);
        const responseJSON = await response.json();
        return responseJSON;
    }

    async createTodo(title: string, description: string, status: string, priority: string, user_id: number) {
        

    }

    async updateTodo() { 
        const url = `${this.baseURL}/todo.php`;
        const response = await this.request.put(url);
        const responseJSON = await response.json();
        return responseJSON;
    }

    async deleteTodo() {
        const url = `${this.baseURL}/todo.php`;
        const response = await this.request.delete(url);
        const responseJSON = await response.json();
        return responseJSON;
    }
}