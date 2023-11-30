import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function NotFound() {
  const {setNotification} = useStateContext()
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setNotification('Страница не найдена. Что-то пошло не так.')
      })
  }, [])
    return (
        <div>
            <h1>404 Page Not Found</h1>
        </div>
    )
}
