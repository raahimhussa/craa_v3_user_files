import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { CellProps } from 'react-table';
function CellSubCompExpanderView(props: CellProps<any>) {
  const row = props.row;

  const defaultHideIcon = <ExpandLess htmlColor="#666666" />;
  const defaultShowIcon = <ExpandMore htmlColor="#666666" />;

  const _style: React.CSSProperties = {
    paddingLeft: `${row.original?.depth * 2}rem`,
    display: 'inline-flex',
    verticalAlign: 'middle',
  };

  return (
    <span
      {...row.getToggleRowExpandedProps({
        style: _style,
      })}
    >
      {row.isExpanded ? defaultShowIcon : defaultHideIcon}
    </span>
  );
}
export default observer(CellSubCompExpanderView);

// ({ row }: any) => {
//   const kind = row.original.kind
//   const icon = row.isExpanded ? (
//     <>
//       {kind != 'file' ? <img src={folderImg} /> : <img src={docImg} />}
//       {kind != 'file' && <ExpandLess htmlColor="#666666" />}
//     </>
//   ) : (
//     <>
//       {kind != 'file' ? <img src={folderImg} /> : <img src={docImg} />}
//       {kind != 'file' && <ExpandMore htmlColor="#666666" />}
//     </>
//   )

//   return (
//     <>
//       <span
//         {...row.getToggleRowExpandedProps({
//           style: {
//             paddingLeft: `${row.depth * 2}rem`,
//           },
//         })}
//       >
//         {icon}
//       </span>
//     </>
//   )
// },
