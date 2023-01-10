import axios from 'axios';
import moment from 'moment/moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import Task from '../../models/Task';

const ManageTasksOfStudent = ({ tasks }) => {
  const router = useRouter();
  const deleteTask = async (id) => {
    await axios
      .post(`/api/tasks/delete`, { id })
      .then(() => {
        toast.success('Task deleted!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => toast.error(`${err}`));
  };

  console.log(tasks);
  return (
    <div className='mt-main'>
      <h3>Manage Tasks of {router.query.name}</h3>
      <Link href={`/add-task/${router.query.studentId}`}>Add Task</Link>
      {tasks.length === 0 && (
        <>
          <div>No Tasks right now for {router.query.name}</div>
        </>
      )}
      {tasks.length > 0 &&
        tasks.map((task, i) => {
          return (
            <div key={i} className='mt-task'>
              <span>
                Due Date: {moment(task.dueDate).format('DD MMM YYYY')}
              </span>
              <h3>
                {task.surahName} ({task.type})
              </h3>
              <p>
                From {task.fromAya} to {task.toAya} ayah
              </p>
              <span>
                {task.completedDate ? (
                  <span style={{ color: 'green' }}>COMPLETED</span>
                ) : (
                  <span style={{ color: 'orange' }}>PENDING</span>
                )}
              </span>
              <div>
                {task.completedDate ? (
                  <>
                    {' '}
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete Task
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        router.push(`/edit-task/${task._id}?id=${task._id}`)
                      }
                    >
                      Edit Task
                    </button>
                    <button
                      style={{ cursor: 'pointer' }}
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete Task
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ManageTasksOfStudent;

export async function getServerSideProps(ctx) {
  const tsks = await Task.find({ studentId: ctx.query.studentId });
  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tsks)),
    },
  };
}
