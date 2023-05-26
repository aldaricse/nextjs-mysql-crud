'use client';
import { Card, Button, Label, TextInput, Textarea } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios'
import ModalConfirm from '../components/ModalConfirm'
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const TaskForm = ({ taskDetail }) => {
  const { register, handleSubmit, getValues, reset, setFocus, setValue, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  // useEffect(() => {
  //   if (taskDetail)
  //     Object.keys(taskDetail).forEach(key => setValue(key, taskDetail[key]));
  // }, [taskDetail])

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (!taskDetail)
        handleAddTask()
      else
        handleEditTask()
    }, 500)
  }

  const handleAddTask = async () => {
    try {
      const response = await axios.post('/api/tasks', getValues())
      // console.log(response.data);
      const { data: result } = response
      // console.log(result);
      toast.success(result.message);
      setLoading(false);
      setOpen(false)
      reset()
      setTimeout(() => setFocus('title'), 250)
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditTask = async () => {
    try {
      const response = await axios.put('/api/tasks/' + taskDetail?.id, getValues())
      console.log(response.data);
      const { data: result } = response
      console.log(result.message);
      setLoading(false);
      setOpen(false)
      router.push('/')
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="max-w-lg mx-auto">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit((values) => setOpen(true))}>
        <div>
          <div className="mb-2 block">
            <h2 className="text-black font-bold text-center text-lg">{
              !taskDetail ? 'Create Task' : 'Edit Task'
            }</h2>
          </div>

          <div className="mb-2 block">
            <Label value="Title" />
          </div>
          <TextInput
            autoFocus
            type="text"
            {...register('title', { required: true, value: taskDetail?.title })}
          />
          {
            errors.title && <p className="text-red-500">*title is required</p>
          }
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Description" />
          </div>
          <Textarea
            rows="3"
            {...register('description', { required: true, value: taskDetail?.description })}
          />
          {
            errors.description && <p className="text-red-500">*description is required</p>
          }
        </div>
        <Button type="submit">
          Save Task
        </Button>
      </form>

      <ModalConfirm
        message={'sure to save the task?'}
        show={open}
        disabledSuccess={loading}
        onSuccess={onSubmit}
        onClose={() => setOpen(false)}
      />
    </Card>
  )
}

export default TaskForm