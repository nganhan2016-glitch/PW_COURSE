import { test, expect } from '@playwright/test';
import { TodoApiPage } from './todo.api';

test.describe("Todo Happy case", async () => {
    let todoApiPage: TodoApiPage;

    test.beforeEach(async ({ request }) => {
        todoApiPage = new TodoApiPage(request);
    });

    test(`get list todo`, async ({ request }) => {
        const response = await todoApiPage.getTodos();
        console.log(response);
        expect(response).toBeTruthy()
        expect(response.todos.length).toBeGreaterThan(2);
    })

    test(`get todo`, async ({ request }) => {
        const response = await todoApiPage.getTodo("5");
        console.log(response);
    })

    test(`delete todo`, async ({ request }) => {
        const response = await todoApiPage.deleteTodo();
        console.log(response);
    })

})