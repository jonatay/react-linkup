import { ApiList } from 'src/mid/api/index';
import { attendDeptActions } from './attend-dept-actions';
import { AttendDept } from './attend-dept';

const attendDeptPath = 'attend/attend-depts';

class AttendDeptList extends ApiList {}

export const attendDeptList = new AttendDeptList(
  {
    onAdd: attendDeptActions.createAttendDeptFulfilled(),
    onChange: attendDeptActions.updateAttendDeptFulfilled(),
    onLoad: attendDeptActions.loadAttendDeptsFulfilled(),
    onRemove: attendDeptActions.removeAttendDeptFulfilled()
  },
  AttendDept,
  attendDeptPath
);
