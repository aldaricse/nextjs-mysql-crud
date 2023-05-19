'use client'
import { Card, Button } from "flowbite-react";

export const TaskCard = ({ task, handleEdit, handleDelete }) => {
  return (
    <Card className="!bg-gray-800 color-white !border-gray-800">
      <div>
        <h5 className="text-2xl font-bold tracking-tight">
          {task.title}
        </h5>
        <p className="font-normal">
          {task.description}
        </p>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          color="success"
          onClick={() => handleEdit(task.id)}>
          Edit
        </Button>
        <Button
          color="failure"
          onClick={() => handleDelete(task)}>
          Delete
        </Button>
      </div>
    </Card>
  )
}