/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
  Button,
} from 'devextreme-react/data-grid';
import { useAuth } from '../../contexts/auth';
import CrudFacade from '../../api/rest-api';

function TaskPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);

  const refreshTasks = () => {
    CrudFacade().getTasksForUser(user.username, (aTasks) => {
      if (aTasks.length === 0) {
        aTasks.push({
          title: '',
          description: '',
          _id: '1',
        });
      }
      setTasks(aTasks);
    });
  };

  const isChief = () => false;

  const allowDeleting = (e) => !isChief(e.row.data.Position);

  const onRowValidating = (e) => {
    const position = e.newData.Position;

    if (isChief(position)) {
      e.errorText = `The company can have only one ${position.toUpperCase()}. Please choose another position.`;
      e.isValid = false;
    }

    const oFinalData = e.oldData;

    Object.keys(e.oldData).forEach((sAttr) => {
      if (e.newData[sAttr] !== undefined) {
        oFinalData[sAttr] = e.newData[sAttr];
      }
    });

    if (!oFinalData.owner) {
      oFinalData.owner = user.username;
    }

    if (!oFinalData.created_by) {
      oFinalData.created_by = user.username;
    }

    editTask(oFinalData);
  };

  const onEditorPreparing = (e) => {
    if (e.parentType === 'dataRow' && e.dataField === 'Position') {
      e.editorOptions.readOnly = isChief(e.value);
    }
  };

  const isCloneIconVisible = (e) => !e.row.isEditing && !isChief(e.row.data.Position);

  const cloneIconClick = (e) => {
    const clonedItem = { ...e.row.data };
    clonedItem.created_by = user.username;
    duplicateTask(clonedItem);
    e.event.preventDefault();
  };

  const deleteIconClick = (e) => {
    deleteTask(e.row.data);
    e.event.preventDefault();
  };

  const duplicateTask = (oTask) => {
    const newTask = { ...oTask };
    newTask.created_by = user.username;
    CrudFacade().postTask(newTask, (returnedTask) => {
      const currentTasks = tasks.concat(returnedTask);
      setTasks(currentTasks);
    });
  };

  const deleteTask = (oTask) => {
    CrudFacade().deleteTask(oTask._id, () => {
      const currentTasks = tasks.filter((task) => task._id !== oTask._id);

      setTasks(currentTasks);
    });
  };

  const editTask = (oTask) => {
    CrudFacade().patchTask(oTask, () => {
      refreshTasks();
    });
  };

  return (
    <>
      <h2 className="content-block">Tasks</h2>

      <DataGrid
        className="dx-card wide-card"
        dataSource={tasks}
        showBorders={false}
        focusedRowEnabled
        defaultFocusedRowIndex={0}
        keyExpr="_id"
        columnAutoWidth
        columnHidingEnabled
        onRowValidating={onRowValidating}
        onEditorPreparing={onEditorPreparing}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector showInfo />
        <FilterRow visible />

        <Editing
          mode="row"
          useIcons
          allowUpdating
          allowDeleting={allowDeleting}
        />
        <Column type="buttons" width={110}>
          <Button name="edit" />
          <Button name="delete" onClick={deleteIconClick} />
          <Button
            hint="Clone"
            icon="repeat"
            visible={isCloneIconVisible}
            onClick={cloneIconClick}
          />
        </Column>

        {/* <Column dataField={'_id'} width={90} hidingPriority={2} /> */}
        <Column
          dataField="title"
          width={190}
          caption="Subject"
          hidingPriority={8}
          allowEditing="false"
        />
        <Column
          dataField="description"
          width={190}
          caption="Description"
          hidingPriority={8}
          allowEditing="false"
        />
        <Column dataField="is_done" caption="Status" hidingPriority={6} />
        <Column
          dataField="owner"
          caption="Assigned To"
          allowSorting={false}
          hidingPriority={7}
        />
        <Column
          dataField="date_starts"
          caption="Start Date"
          dataType="date"
          hidingPriority={3}
        />
        <Column
          dataField="date_ends"
          caption="Due Date"
          dataType="date"
          hidingPriority={4}
        />
        <Column
          dataField="created_by"
          caption="Created by"
          hidingPriority={0}
          allowEditing="false"
        />
        <Column
          dataField="created_at"
          caption="Created on"
          hidingPriority={0}
        />
      </DataGrid>
    </>
  );
}

export default TaskPage;
