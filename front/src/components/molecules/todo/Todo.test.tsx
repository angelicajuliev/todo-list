import { render, screen } from "@testing-library/react";
import { Todo } from "./Todo";

describe("When the user has pending todo ", () => {
  test("change todo text", () => {
    const textTest = "Probando";
    let onComplete = jest.fn();
    let onChange = jest.fn();
    let onDelete = jest.fn();

    render(
      <Todo
        text={textTest}
        isCompleted={true}
        onComplete={onComplete}
        onChange={onChange}
        onDelete={onDelete}
      />
    );
    const text = screen.getByText(textTest)
    // expect(input).toHaveAttribute("value", textTest);
  });
});
