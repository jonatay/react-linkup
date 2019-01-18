import { ApiList } from 'src/mid/api/index';
import { codeLkpActions } from './code-lkp-actions';
import { CodeLkp } from './code-lkp';

const codeLkpPath = 'hr-sars/code-lkps';

class CodeLkpList extends ApiList {}

export const codeLkpList = new CodeLkpList(
  {
    onAdd: codeLkpActions.createCodeLkpFulfilled(),
    onChange: codeLkpActions.updateCodeLkpFulfilled(),
    onLoad: codeLkpActions.loadCodeLkpsFulfilled(),
    onRemove: codeLkpActions.removeCodeLkpFulfilled()
  },
  CodeLkp,
  codeLkpPath
);
