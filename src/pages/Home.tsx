import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])

    console.log(tasks)
  }

  function handleToggleTaskDone(id: number) {
    const updateTaks = tasks.map((tasks) => ({ ...tasks }))

    const newTasks = updateTaks.map((task) => {
      if(task.id === id) {
        return {
          ...task,
          done: !task.done
        } 
      } else {
        return task
      }
    })

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => tasks.filter((task) => task.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})