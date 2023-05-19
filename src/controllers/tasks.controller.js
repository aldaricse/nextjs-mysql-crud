import { pool } from '@/config/db'
import { NextResponse, NextRequest } from 'next/server';

export const getTasks = async () => {
  try {
    const [result] = await pool.query('SELECT * FROM tasks;');
    // console.log(result);
    console.log(process.env.DATABASE_HOST);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export const getTask = async (request, { params }) => {
  try {
    // console.log(params.id);
    const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [params.id])
    // console.log(result);
    return NextResponse.json(result && result.length > 0 ? result[0] : null, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export const addTask = async (request) => {
  try {
    const taskRequest = await request.json();
    const [result] = await pool.query('INSERT INTO tasks SET?', taskRequest)
    // console.log(result.insertId);
    return NextResponse.json({
      message: 'Task created successfully',
      data: { ...taskRequest, id: result.insertId }
    }, {
      status: 201
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export const updateTask = async (request, { params }) => {
  try {
    const taskRequest = await request.json();
    const result = await pool.query('UPDATE tasks SET ? WHERE id = ?', [taskRequest, params.id])
    // console.log(result);
    return NextResponse.json({
      message: 'Task updated successfully',
      data: { ...taskRequest, id: params.id }
    }, {
      status: 201
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }

}

export const deleteTask = async (request, { params }) => {
  try {
    // console.log(params.id);
    const result = await pool.query('DELETE FROM tasks WHERE id = ?;', [params.id])
    // console.log(result);
    return NextResponse.json({ message: 'Task deleted successfully' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}