import React, { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/auth';

import CrudFacade from '../../api/rest-api';
import './home.scss';

function HomePage() {
  const { user } = useAuth();
  const [task, setTask] = useState({});

  let oCrudFacade;

  useEffect(() => {
    oCrudFacade = CrudFacade();

    oCrudFacade.getTasksForUser(user.username, (aData) => {
      let tasks = aData;
      if (!tasks.sort) {
        tasks = [];
      }
      tasks = tasks.filter((t) => t.owner === user.username);
      if (tasks.length === 0) {
        tasks.push({ title: '', description: '', date_starts: null });
      } else {
        tasks.sort((a, b) => a.date_starts > b.date_starts);
      }
      setTask(tasks[0]);
    });
  }, []);

  return (
    <div className="form" style={{ width: '50%' }}>
      <div className="dx-fieldset">
        <div className="dx-fieldset-header">
          Hello,
          {' '}
          {user.firstname}
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Next Task</div>
          <div className="dx-field-value-static">
            {task.title}
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Description</div>
          <div className="dx-field-value-static">
            {task.description}
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Deadline</div>
          <div className="dx-field-value-static">
            {task.date_starts}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
