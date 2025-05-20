'use client';

import React, { JSX } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  tooltip?: string;
  badgeCount?: number;
  color?: 'primary' | 'secondary' | 'error';
}

export default function CustomIconButton({
  onClick,
  icon,
  tooltip,
  badgeCount,
  color = 'primary',
}: ButtonProps) {
  return (
    <Tooltip title={tooltip}>
      <IconButton color={color} onClick={onClick}>
        <Badge badgeContent={badgeCount} color="primary">
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
