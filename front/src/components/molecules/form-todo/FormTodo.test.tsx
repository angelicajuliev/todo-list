import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { REQUEST_STATES } from "../../../models/App";

import { FormTodo } from "./FormTodo";

describe("When the user interactue with form", () => {
  let onSubmit, button, input;

  beforeEach(() => {
    onSubmit = jest.fn();
    render(<FormTodo onSubmit={onSubmit} />);
    button = screen.getByRole("button");
    input = screen.getByRole("textbox");
  });

  test("submit without input value ", () => {
    userEvent.click(button);
    expect(onSubmit).not.toBeCalled();
  });

  test("enter when typing value", () => {
    const text = "Probar el proyecto de ToDo list";

    userEvent.type(input, `${text}{enter}`);
    expect(onSubmit).toHaveBeenCalledWith({ id: "", text, isCompleted: false });
  });

  test("submit with input value ", () => {
    const text = "Probar el proyecto de ToDo list";

    userEvent.type(input, `${text}`);
    userEvent.click(button);
    expect(onSubmit).toHaveBeenCalledWith({ id: "", text, isCompleted: false });
  });

  test("submit multiple times ", () => {
    const text = "Probar el proyecto de ToDo list";

    userEvent.type(input, `${text}{enter}`);
    userEvent.click(button);
    userEvent.click(button);
    userEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("When the user send value and the form's status change", () => {
  test("submit after complete status", () => {
    const onSubmit = jest.fn();
    const text = "Escribir";
    const { rerender } = render(<FormTodo onSubmit={onSubmit} />);
    const input = screen.getByRole("textbox");

    userEvent.type(input, `${text}{enter}`);
    expect(input).toHaveAttribute("value", text);
    rerender(<FormTodo onSubmit={onSubmit} state={REQUEST_STATES.SUCCESS} />);
    expect(input).toHaveAttribute("value", "");
    
    userEvent.type(input, `${text}{enter}`);
    expect(input).toHaveAttribute("value", text);
    rerender(<FormTodo onSubmit={onSubmit} state={REQUEST_STATES.PENDING} />);
    expect(input).toHaveAttribute("value", text);
    userEvent.type(input, `{enter}`);
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
