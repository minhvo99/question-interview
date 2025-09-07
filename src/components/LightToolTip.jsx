import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const LightTooltip = styled(({ className, showTooltip, ...props }) => {
  if (!showTooltip) {
    return <>{props.children}</>;
  }
  return <Tooltip {...props} classes={{ popper: className }} />;
})(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
    maxHeight: '400px',
    overflow: 'scroll',
  },
}));
