import { Alert, FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { Header } from "../components/Header";
import { Task } from "../components/Task";
import { useRef, useState } from "react";
import { TaskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/Empty";
import { generateUUID } from "../utils/uuid";

export function Home() {

    const [tasks, setTasks] = useState<TaskDTO[]>([]);
    const [newTask, setNewTask] = useState('');
    const newTaskInputRef = useRef<TextInput>(null);

    function handleTaskAdd() {

        if (newTask === '' || newTask.length <= 5) {
            return Alert.alert("Alerta", "Informe no mínimo 5 caracteres");
        }

        setTasks((tasks) => [
            ...tasks,
            { id: generateUUID(), isCompleted: false, title: newTask.trim() }
        ]);
        setNewTask('');

        newTaskInputRef.current?.blur();

    }

    function handleTaskDone(id: string) {
        setTasks((task) => task.map((task) => {
            task.id === id ? (task.isCompleted = !task.isCompleted) : null
            return task
        }),
        )
    }

    function handleTaskDeleted(id: string) {
        Alert.alert('Excluir tarefa', 'Deseja excluir tarefa?', [
            {
                text: 'Sim',
                style: 'default',
                onPress: () => setTasks((tasks) => tasks.filter((task) => task.id !== id))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ]);
    }

    const totalTasksCreated = tasks.length;
    const totalTasksCompleted = tasks.filter(({ isCompleted }) => isCompleted).length;

    return (
        <View style={styles.container}>
            <Header
                inputRef={newTaskInputRef}
                task={newTask}
                onChangeText={setNewTask}
                onPress={handleTaskAdd}
            />
            <View style={styles.tasksContainer}>
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.tasksCreated}>Criadas</Text>
                        <View style={styles.counterContainer}>
                            <Text style={styles.counterText}>{totalTasksCreated}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.tasksDone}>Concluídas</Text>
                        <View style={styles.counterContainer}>
                            <Text style={styles.counterText}>{totalTasksCompleted}</Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={tasks}
                    keyExtractor={(tasks) => tasks.id!}
                    renderItem={({ item }) => (
                        <Task
                            key={item.id}
                            //id={item.id}
                            onTaskDone={() => handleTaskDone(item.id)}
                            onTaskDeleted={() => handleTaskDeleted(item.id)}
                            //title={item.title}
                            //isCompleted={item.isCompleted}
                            {...item}
                        />
                    )}
                    ListEmptyComponent={<Empty />}
                />
            </View>
        </View>
    );
}