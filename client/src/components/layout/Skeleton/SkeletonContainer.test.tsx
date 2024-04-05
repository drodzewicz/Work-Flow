import { render, screen } from "@testing-library/react";
import * as Skeleton from "./index";

describe("Test Component - SkeletonContainer", () => {
    it("should display four skeleton components", () => {
        const numberOfElement = 4;

        render(<Skeleton.Container show count={numberOfElement} element={<Skeleton.Task />} />);

        const taskSkeletonElements = screen.queryAllByTestId("skeleton-task");

        expect(taskSkeletonElements).toHaveLength(numberOfElement);
    });

    it("should not render skeleton components", () => {
        const numberOfElement = 4;

        render(
            <Skeleton.Container show={false} count={numberOfElement} element={<Skeleton.Task />} />
        );

        const taskSkeletonElements = screen.queryAllByTestId("skeleton-task");

        expect(taskSkeletonElements).toHaveLength(0);
    });

    it("should not render children elements", () => {
        const numberOfElement = 4;

        render(
            <Skeleton.Container show count={numberOfElement} element={<Skeleton.Task />}>
                <div data-testid="skeleton-container-test-element" className="test-container">
                    <div>test 1</div>
                    <div>test 2</div>
                </div>
            </Skeleton.Container>
        );

        expect(screen.queryByTestId("skeleton-container-test-element")).not.toBeInTheDocument();
    });

    it("should render children elements", () => {
        const numberOfElement = 4;

        render(
            <Skeleton.Container show={false} count={numberOfElement} element={<Skeleton.Task />}>
                <div data-testid="skeleton-container-test-element" className="test-container">
                    <div>test 1</div>
                    <div>test 2</div>
                </div>
            </Skeleton.Container>
        );

        expect(screen.getByTestId("skeleton-container-test-element")).toBeInTheDocument();
    });
});
