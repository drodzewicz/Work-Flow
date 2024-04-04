import BasePage from "@/pages/BasePage";

class TaskDialogElement extends BasePage {
    // VIEW STATE
    get deleteButton() {
        return this.page
            .getByRole("dialog")
            .getByRole("button", { name: "Delete" });
    }

    get editButton() {
        return this.page
            .getByRole("dialog")
            .getByRole("button", { name: "Edit" });
    }

    // EDIT STATE
    get saveChangesButton() {
        return this.page
            .getByRole("dialog")
            .getByRole("button", { name: "Save Changes" });
    }

    get assigneeSearch() {
        return this.page
            .getByRole("dialog")
            .getByRole("textbox", { name: "Assignees" });
    }

    get tagSearch() {
        return this.page
            .getByRole("dialog")
            .getByRole("textbox", { name: "Tags" });
    }

    get titleInput() {
        return this.page
            .getByRole("dialog")
            .getByRole("textbox", { name: "title" });
    }

    get descriptionInput() {
        return this.page
            .getByRole("dialog")
            .getByRole("textbox", { name: "description" });
    }

    getTaskAssigneeCard(username: string) {
        return this.page
            .getByRole("dialog")
            .getByTestId("user-card")
            .filter({ hasText: username });
    }
}

export default TaskDialogElement;
