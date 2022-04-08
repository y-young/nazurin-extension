import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FiCheck, FiX } from 'react-icons/fi';
import { Status } from '../../constants';

type Props = { status: Status; handleRetry: () => void };

const ICON_SIZE = 18;

const StatusIcon: React.FC<Props> = ({ status, handleRetry }) => {
  switch (status) {
    case Status.PENDING:
      return (
        <AiOutlineLoading
          className="animate-spin"
          size={ICON_SIZE}
          title={chrome.i18n.getMessage('pendingStatus')}
        />
      );
    case Status.SUCCESS:
      return (
        <FiCheck
          size={ICON_SIZE}
          className="text-emerald-500"
          title={chrome.i18n.getMessage('successStatus')}
        />
      );
    case Status.ERROR:
      return (
        <FiX
          size={ICON_SIZE}
          className="text-rose-500 cursor-pointer"
          title={chrome.i18n.getMessage('errorStatus')}
          onClick={handleRetry}
        />
      );
  }
};

export default StatusIcon;
