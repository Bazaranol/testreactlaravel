import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [user, setUser] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [checkedName, setCheckedName] = useState(false);

  useEffect(()=>{
      if(checkedName){
          axiosClient
              .get("/tasks")
              .then(({ data }) => {
                  setLoading(false);
                  data.data.sort( (a, b) => {
                      let textA = a.name.toUpperCase();
                      let textB = b.name.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  });
                  setTasks(data.data);
              })
              .catch(() => {
                  setLoading(false);
              });
      }else {
          getTasks();
      }
  }, [checkedName])

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
      setNotification("Вы вошли в аккаунт");
    });
    getTasks();
  }, []);

  const filterTasks = ev =>{
    if(ev.checked){
        axiosClient
            .get("/tasks")
            .then(({ data }) => {
                setLoading(false);
                var filteredData = data.data.filter(function(word) {
                    return /^A/.test(word);
                });
                setTasks(filteredData);
            })
            .catch(() => {
                setLoading(false);
            });
    }else {
      getTasks();
    }
  }
  const onDeleteClick = task =>{
    if (!window.confirm(`Уверены что хотите удалить таск ${task.name}?`)) {
      return;
    }
    axiosClient.delete(`/tasks/${task.id}`)
      .then(() => {
        setNotification('Таск успешно удален')
        getTasks()
      })
  }
  const getTasks = () => {
    setLoading(true);

    axiosClient
      .get("/tasks")
      .then(({ data }) => {
        setLoading(false);
        setTasks(data.data);
      })
      .catch(() => {
        setLoading(false);
      });

  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Таски</h1>
          <div className="d-flex">
              <div>
                  <label className="text-center">Сортировать по названию</label>
                  <input type="checkbox"
                         defaultChecked={checkedName}
                         onChange={() => setCheckedName((state) => !state)}
                  />
              </div>
          </div>

        <Link className="btn" to="/tasks/new">
          Добавить таск
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <div className="text-center">
              <>
                  <div className="table-header d-flex space-between">
                      <div>Название: </div>
                      <div>Создан: </div>
                      <div>Обновлён: </div>
                      <div></div>
                  </div>
                <tbody className="table-tasks">
                  {tasks.map((task) => (
                    <tr key={task.id} className="d-flex space-between card">
                    <td className="d-flex task-item text-start">
                      {task.name}
                    </td>
                      <td className="d-flex task-item items-center">
                        {task.created_at}
                      </td>
                        <td className="d-flex task-item items-center">
                            {task.updated_at}
                        </td>
                      <td className="d-flex task-item text-end">
                        <Link className="btn-edit" to={'/tasks/' + task.id}>Edit</Link>
                        &nbsp;
                        <button className="btn-delete" onClick={ev => onDeleteClick(task)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}
