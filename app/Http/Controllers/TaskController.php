<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class TaskController extends Controller
{
    /**
     * Отображаем список тасков
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    function index(){
        $u_id =  Auth::id();
       return TaskResource::collection(Task::query()->where('user_id', "=", $u_id)->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Сохраняем созданную сущность в хранилище
     *
     * @param \App\Http\Requests\StoreTaskRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $task = Task::create($data);
        return response(new TaskResource($task) , 201);
    }

    /**
     * Отображаем определенную сущность
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Обновляем определенную сущность в хранилище
     *
     * @param \App\Http\Requests\UpdateTaskRequest $request
     * @param \App\Models\Task                     $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $task->update($data);

        return new TaskResource($task);
    }

    /**
     * Удаляем определенную сущность из хранилища
     *
     * @param \App\Models\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response("", 204);
    }
}
