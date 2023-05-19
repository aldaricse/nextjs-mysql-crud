import axios from 'axios'
import TaskList from '@/components/TaskList';

const getTasks = async () => {
  try {
    const response = await axios.get(process.env.URL_API + '/tasks');
    return response.data
  } catch (error) {
    console.log(error);
  }
}

// const Page = async ({ params }) => {
//   console.log(params);
//   const taskList = await getTasks();
//   console.log((new Date()).toLocaleTimeString());
//   console.log(taskList);
//   return <TaskList />
// }

const Page = () => <TaskList />

export default Page