import { render, screen } from "@testing-library/react";
import ItemContainer from "./ItemContainer";

type TestEntryType = { id: string; name: string };

const items: TestEntryType[] = [
    { id: "one", name: "name 1" },
    { id: "two", name: "name 2" },
    { id: "three", name: "name 3" },
];

const renderFunction = (props: TestEntryType) => <div>{props.name}</div>;

describe("Test Component - ItemContainer", () => {
    it("should render three items", () => {
        render(<ItemContainer itemKey="id" items={items} render={renderFunction} />);
        const firstItem = screen.getByText(items[0].name);
        const secondItem = screen.getByText(items[1].name);
        const thirdItem = screen.getByText(items[2].name);

        expect(firstItem).toBeInTheDocument();
        expect(secondItem).toBeInTheDocument();
        expect(thirdItem).toBeInTheDocument();
    });

    it("should display no content message when empty list of items is provided", () => {
        const noContentMessage = "There is no content";

        render(
            <ItemContainer
                noContentMessage={noContentMessage}
                itemKey="id"
                items={[]}
                render={renderFunction}
            />
        );

        expect(screen.getByText(noContentMessage)).toBeInTheDocument();
    });
});
