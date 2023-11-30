import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()
  const [user, setUser] = useState([]);

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
        setNotification('Вы вошли в аккаунт')
      })
  }, [])

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Профиль</h1>
      </div>
      <div className="card animated fadeInDown">
        <table>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <div className="text-center">
              Привет, {user.name}
              <br/>
              <div className="text-center">
                Твой токен авторизации находится в localstorage.
                <br/>
                Попробуй удалить его и перезагрузить страницу, и тебя тут же выбросит из сессии!
              </div>
            </div>
          }
        </table>
      </div>
    </div>
  )
}
