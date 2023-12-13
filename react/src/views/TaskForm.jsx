import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function TaskForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [task, setTask] = useState({
    id: null,
    name: '',
    user_id: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  const {user} = useStateContext();
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/tasks/${id}`)
        .then(({data}) => {
          setLoading(false)
          setTask(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (task.id) {
      axiosClient.put(`/tasks/${task.id}`, task)
        .then(() => {
          setNotification('Таск обновлен')
          navigate('/profile')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      task.user_id = user.id;
      axiosClient.post('/tasks', task)
        .then(() => {
          setNotification('Таск успешно создан')
          navigate('/profile')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {task.id && <h1>Update Task: {task.name}</h1>}
      {!task.id && <h1>New Task</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={task.name} onChange={ev => setTask({...task, name: ev.target.value})} placeholder="Name"/>
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  )
}
