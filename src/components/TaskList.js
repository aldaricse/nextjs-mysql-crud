'use client'
import { useEffect, useState } from 'react';
import { TaskCard } from '../components/TaskCard';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ModalConfirm from '../components/ModalConfirm'
import { Spinner } from 'flowbite-react';
import classNames from 'classnames';
import { useRouter, usePathname } from 'next/navigation';

export const TaskList = () => {
  // console.log(taskList);
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const [taskSelected, setTaskSelected] = useState({})
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = async () => {
    try {
      const response = await axios.get('/api/tasks')
      // console.log(response.data);
      setTasks(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const goEdit = (id) => router.push('/task/' + id)

  const handleConfirmDeleteTask = async (task) => {
    setTaskSelected(task)
    setOpen(true)
  }

  const onDelete = () => {
    setLoadingModal(true);
    setTimeout(async () => {
      try {
        const response = await axios.delete('/api/tasks/' + taskSelected.id)
        // console.log(response.data);
        const { data: result } = response
        // console.log(result);
        toast.success(result.message);
        setLoadingModal(false);
        setOpen(false)
        getTasks();
      } catch (error) {
        console.log(error);
      }
    }, 500)
  }

  return (
    <>
      <div className={classNames({
        'grid gap-4': true,
        'grid-cols-4': tasks && tasks.length > 1,
        'grid-cols-1': !tasks || tasks.length === 0,
      })}>
        {
          tasks && tasks.length > 1 ? tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleEdit={goEdit}
              handleDelete={handleConfirmDeleteTask}
            />
          )) : (
            loading ?
              <div className="flex justify-center mt-4">
                <Spinner
                  aria-label="Loading tasks..."
                  size="xl"
                />
              </div>
              : <p className='flex justify-center mt-4'>No task registered</p>
          )
        }
      </div>

      <ModalConfirm
        message={`sure to delete the task "${taskSelected?.title}"?`}
        show={open}
        disabledSuccess={loadingModal}
        onSuccess={onDelete}
        onClose={() => setOpen(false)}
      />
      <ToastContainer />
    </>
  )
}

export default TaskList