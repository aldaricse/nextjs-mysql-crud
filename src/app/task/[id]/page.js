import axios from 'axios'
import TaskForm from '@/components/TaskForm';

const getTask = async (id) => {
  try {
    const response = await axios.get(`${process.env.URL_API}/tasks/${id}`)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

// Dynamic metadata
export const generateMetadata = async ({ params }) => {
  try {
    const taskDetail = await getTask(params.id)
    return {
      title: `Task | ${taskDetail.title}`,
      description: taskDetail.description
    }
  } catch (error) {
    console.log(error);
  }
}

const Page = async ({ params }) => {
  // edit or new
  if (params?.id) {
    const taskDetail = await getTask(params.id)
    // console.log(taskDetail);
    return <TaskForm taskDetail={taskDetail} />
  } else {
    return <TaskForm />
  }
}

export default Page