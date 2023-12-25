import React, { useEffect, useState } from 'react';
import Scheduler from 'devextreme-react/scheduler';

import { useAuth } from '../../contexts/auth';

import './calendar.scss';

const currentDate = new Date();
const views = ['week', 'month'];

function CalendarPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const sReq = `/tasks/${user.username}`;

    fetch(sReq)
      .then((res) => res.json())
      .then((taskData) => {
        const aEntries = [];
        taskData.forEach((element) => {
          aEntries.push({
            text: element.title,
            startDate: element.date_starts,
            endDate: element.date_ends,
          });
        });
        setTasks(aEntries);
      });
  }, []);

  return (
    <>
      <h2 className="content-block">Calendar</h2>
      <div className="content-block">
        <div className="dx-card responsive-paddings">
          <Scheduler
            timeZone="America/Los_Angeles"
            dataSource={tasks}
            views={views}
            defaultCurrentView="month"
            defaultCurrentDate={currentDate}
            height={600}
            startDayHour={9}
          />
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
