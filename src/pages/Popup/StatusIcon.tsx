import React from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { FiCheck, FiX } from 'react-icons/fi';
import { Status } from '../../constants';

type Props = { status: Status };

const ICON_SIZE = 18;

const StatusIcon: React.FC<Props> = ({ status }) => {
  switch (status) {
    case Status.PENDING:
      return (
        <AiOutlineLoading
          className="animate-spin"
          size={ICON_SIZE}
          title="Pending"
        />
      );
    case Status.SUCCESS:
      return (
        <FiCheck
          size={ICON_SIZE}
          className="text-emerald-500"
          title="Success"
        />
      );
    case Status.ERROR:
      return <FiX size={ICON_SIZE} className="text-rose-500" title="Error" />;
  }
};

export default StatusIcon;
