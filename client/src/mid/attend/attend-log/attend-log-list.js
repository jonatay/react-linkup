import { ApiList } from 'src/mid/api/index';
import { attendLogActions } from './attend-log-actions';
import { AttendLog } from './attend-log';

const attendLogPath = 'attend/attend-logs';

class AttendLogList extends ApiList {}

export const attendLogList = new AttendLogList(
  {
    onAdd: attendLogActions.createAttendLogFulfilled(),
    onChange: attendLogActions.updateAttendLogFulfilled(),
    onLoad: attendLogActions.loadAttendLogsFulfilled(),
    onRemove: attendLogActions.removeAttendLogFulfilled()
  },
  AttendLog,
  attendLogPath
);
