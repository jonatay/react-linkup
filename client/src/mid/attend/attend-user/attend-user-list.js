import { ApiList } from 'src/mid/api/index';
import { attendUserActions } from './attend-user-actions';
import { AttendUser } from './attend-user';

const attendUserPath = 'attend/attend-users';

class AttendUserList extends ApiList {}

export const attendUserList = new AttendUserList(
  {
    onAdd: attendUserActions.createAttendUserFulfilled(),
    onChange: attendUserActions.updateAttendUserFulfilled(),
    onLoad: attendUserActions.loadAttendUsersFulfilled(),
    onRemove: attendUserActions.removeAttendUserFulfilled()
  },
  AttendUser,
  attendUserPath
);
