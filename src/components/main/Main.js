import "./main.css";
import { useState, useEffect } from "react";

function Main(props) {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [todoEdit, setTodoEdit] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("toDos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      setToDos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(toDos);
    localStorage.setItem("toDos", temp);
  }, [toDos]);

  const handleDelete = (e) => {
    e.preventDefault();
  };

  const deleteTodo = (id) => {
    const updatedTodos = [...toDos].filter((todo) => todo.id !== id);

    setToDos(updatedTodos);
  };

  const days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "wedneday",
    "Tuesday",
    "Friday",
    "Saturdat",
  ];
  let today = days[new Date().getDay()];

  function editTodo(id) {
    const updatedTodos = [...toDos].map((todo) => {
      if (todo.id === id) {
        todo.text = editText;
      }
      return todo;
    });
    setToDos(updatedTodos);
    setTodoEdit(null);
    setEditText("");
  }
  return (
    <div className="app">
      <form onSubmit={handleDelete}>
        <div className="mainHeading">
          <h1>ToDo List</h1>
        </div>
        <div className="subHeading">
          <br />
          <h2>Whoop, it's {today} ☕</h2>
        </div>

        <div className="input">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />
          <i
            onClick={() => {
              setToDos([
                ...toDos,
                { id: Date.now(), text: toDo, status: false },
              ]);
              setToDo("");
            }}
            className="fas fa-plus"
          >
          </i>
        </div>
        <div className="todos">
          {toDos.map((obj) => {
            return (
              <>
                {obj.status ? null : (
                  <div className="todo" key={obj.id}>
                    <div className="left">
                      <input
                        onChange={(e) => {
                          setToDos(
                            toDos.filter((obj2) => {
                              if (obj2.id === obj.id) {
                                obj2.status = e.target.checked;
                              }
                              return obj2;
                            })
                          );
                        }}
                        value={obj.status}
                        type="checkbox"
                        name=""
                        id=""
                      />
                      {obj.id !== todoEdit ? (
                        <p>{obj.text}</p>
                      ) : (
                        <input
                          type="text"
                          onChange={(e) => setEditText(e.target.value)}
                          value={editText}
                        />
                      )}
                    </div>
                    <div className="right">
                      {obj.id === todoEdit ? (
                        <i
                          className="fas fa-times"
                          onClick={() => editTodo(obj.id)}
                        >
                        </i>
                      ) : (
                        <i
                          className="fas fa-check"
                          onClick={() => setTodoEdit(obj.id)}
                        >
                        </i>
                      )}
                      <i
                        className="fas fa-times"
                        onClick={() => deleteTodo(obj.id)}
                      >
                      </i>
                    </div>
                  </div>
                )}
              </>
            );
          })}
          {/* ---------active todo------------ */}
          <div className="subHeading">
            <br />
            <h2>Finished works 🌝</h2>
          </div>

          {toDos.map((obj) => {
            if (obj.status) {
              return (
                <div className="todo finished" key={obj.id}>
                  <div className="left">
                    <input
                      onChange={(e) => {
                        setToDos(
                          toDos.filter((obj2) => {
                            if (obj2.id === obj.id) {
                              obj2.status = false;
                            }
                            return obj2;
                          })
                        );
                      }}
                      value={obj.status}
                      type="checkbox"
                      name=""
                      id=""
                    />

                    <p>{obj.text}</p>
                  </div>

                  <div className="right">
                    <i
                      className="fas fa-times"
                      onClick={() => deleteTodo(obj.id)}
                    >
                      time
                    </i>
                  </div>
                </div>
              );
            }
            return null;
          })}

          {/* ---------active todo------------ */}
        </div>
      </form>
    </div>
  );
}

export default Main;
