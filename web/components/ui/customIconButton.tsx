'use client';

import React, { JSX } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  tooltip?: string;
  badgeCount?: number;
}

export default function CustomIconButton({
  onClick,
  icon,
  tooltip,
  badgeCount,
}: ButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color="primary" onClick={onClick}>
        <Badge badgeContent={badgeCount} color="primary">
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
