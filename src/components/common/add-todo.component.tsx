export interface IAddTodo {
  todoName: string;
  onClickAddTodo: () => void | ((id: string) => void);
  onChangeAddTodo: (value: string) => void;
}

const AddTodo = ({ todoName, onClickAddTodo, onChangeAddTodo }: IAddTodo) => {
  return (
    <div className="flex gap-4">
      {" "}
      <input
        type="text"
        className="border-primary-600 bg-grey border rounded-md py-2 pl-2 shadow-sm pr-3"
        value={todoName}
        placeholder="Enter Todo"
        onChange={(e) => onChangeAddTodo(e.target.value)}
      />
      <button
        className="rounded-md bg-primary-600 p-1 px-5 text-white"
        onClick={onClickAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
