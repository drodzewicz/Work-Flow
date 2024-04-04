import BasePage from "@/pages/BasePage";

class TaskCardElement extends BasePage {
    getByName(name: string) {
        return this.page.getByTestId("task-card").filter({ hasText: name });
    }

    getByIndex(columnName: string, index: number) {
        return this.page
            .getByTestId("column")
            .filter({ hasText: columnName })
            .getByTestId("task-card")
            .nth(index);
    }

    getTags(taskName: string) {
        return this.getByName(taskName).getByTestId("task-tag");
    }

    getAssignees(taskName: string) {
        return this.getByName(taskName).getByRole("img", {
            name: "task-assignee",
        });
    }

    async move(taskName: string, destinationColumnName: string, index: number) {
        const task = this.getByName(taskName);
        const destinationColumn = this.page
            .getByTestId("column")
            .filter({ hasText: destinationColumnName });

        const tasksFromColumn = destinationColumn.getByTestId("task-card");
        const taskCount = await tasksFromColumn.count();

        let box = await destinationColumn.boundingBox();

        let coordinates = { x: 0, y: 0 };

        if (taskCount === 0) {
            box = await destinationColumn.boundingBox();
            if (box) {
                coordinates = {
                    x: box.x + box.width / 2 + 100,
                    y: box.y + box.height / 2,
                };
            }
        } else {
            if (index < taskCount) {
                box = await tasksFromColumn.nth(index).boundingBox();
                if (box) {
                    coordinates = {
                        x: box.x + box.width / 2 + 100,
                        y: box.y + box.height / 2 - 10,
                    };
                }
            } else if (index >= taskCount) {
                box = await tasksFromColumn.last().boundingBox();
                if (box) {
                    coordinates = {
                        x: box.x + box.width / 2 + 100,
                        y: box.y + box.height / 2 + 100,
                    };
                }
            } else {
                throw new Error("Wrong index given");
            }
        }

        await task.hover();
        await this.page.mouse.down();
        await this.page.mouse.move(coordinates.x, coordinates.y, {
            steps: 5,
        });
        await this.page.mouse.up();

        await this.page.waitForTimeout(500);
    }
}

export default TaskCardElement;
