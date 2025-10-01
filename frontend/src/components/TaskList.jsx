import React from 'react'
import TaskEmptyState from './TaskEmptyState';
import TaskCard from './TaskCard';

const TaskList = ({ filteredTasked, filter, handleTaskChanged }) => {


    if (!filteredTasked || filteredTasked.length == 0) {
        return <TaskEmptyState filter={filter} />

    }
    return (
        <div className='space-y-3'>
            {filteredTasked.map((task, index) => (
                <TaskCard
                    key={task._id ?? index}
                    task={task}
                    index={index}
                    handleTaskChanged={handleTaskChanged}
                />

            ))}
        </div>
    )
}

export default TaskList