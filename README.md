# React & Laravel fullstack
Регистрация и авторизация на стеке react + laravel с использованием токена.
> Для корректного запуска приложения необходим PHP v8.1+ и MySQL v5.6+. Так же установленный node.js и composer



## Установка и запуск 


1. Склонировать проект (или просто скачать)
2. Скопировать из файла `.env.example` в `.env` и добавить доступы к базе данных
3. Открыть терминал и перейти в корень проекта. Если используется окружение openServer, то можно через eё консоль, на ней установлен composer
4. Запустить команду `composer install`
5. Сгенерировать ключ приложения `php artisan key:generate --ansi`
6. Запустить миграции `php artisan migrate`
7. Запустить локальный сервер командной `php artisan serve`
8. Открыть вторую консоль и перейти в папку `react`
9. Скопировать из файла `.env.example` в папке `react` в `.env` и отредактировать значение параметра `VITE_API_BASE_URL` при необходимости
9. Запустить команду `npm install`
10. Запустить клиентский сервер командой `npm run dev` и перейти по url, который вернет консоль в ответе
