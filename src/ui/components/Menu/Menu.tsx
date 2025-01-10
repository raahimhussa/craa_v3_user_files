import { observer } from 'mobx-react';
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonBase,
  Divider,
  Popper,
  Typography,
} from '@mui/material';
import { MenuItem as IMenuItem } from './type';
import uniqid from 'uniqid';
import { Check, CheckCircle, Cancel } from '@mui/icons-material';
import { green, grey, red } from '@mui/material/colors';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useEffect, useRef, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FolderIcon from '@mui/icons-material/Folder';
import customTheme from 'src/ui/theme/customizedTheme';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';
import { useRootStore } from 'src/stores';
function MenuView({
  label = 'Menu btn Label',
  startIcon = null,
  items = [
    {
      text: 'Menu1',
      children: [
        {
          text: 'Menu1-1',
          children: [
            {
              text: 'Menu1-2',
              children: [],
            },
          ],
        },
      ],
    },
    {
      text: 'Menu2',
      children: [],
    },
  ],
  viewport,
}: {
  label?: string;
  startIcon?: React.ReactNode;
  items?: Array<IMenuItem>;
  viewedSimDocIds?: any;
  viewport: any;
}) {
  const { viewportStore, simulationStore } = useRootStore();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  //@ts-ignore
  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  const anchorEl = useRef<null | HTMLElement>(null);
  const element = document.querySelector(
    '.viewport' + viewport.index
  ) as HTMLElement | null;

  const handleTreeviewClick = (event: any) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (anchorEl !== null) {
      viewportStore.popperBtns.push(anchorEl);
    }
    const handleClickOutside = (event: any) => {
      try {
        if (anchorEl.current && !anchorEl.current.contains(event.target)) {
          setOpen(false);
        }
      } catch (error) {}
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [anchorEl]);

  useEffect(() => {
    const folderIds = simulationStore.simulation?.folderIds;
    const idToDataMap = new Map();
    items.forEach((folder: any) => {
      folder.children.forEach((item: any) => {
        if (item.isFolder) {
          item.children.sort((a: any, b: any) => {
            if (a.seq === b.seq) {
              //@ts-ignore
              return new Date(a.createdAt) - new Date(b.createdAt);
            }
            return a.seq - b.seq;
          });
        }
      });
      folder.children.sort((a: any, b: any) => {
        if (a.seq === b.seq) {
          //@ts-ignore
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return a.seq - b.seq;
      });
      idToDataMap.set(folder._id, folder);
    });

    //@ts-ignore
    items = folderIds?.map((id) => idToDataMap.get(id));
  }, []);

  const RenderSubMenu = (props: any) => {
    // props.func(props.item);
    if (!props.item.isFolder && props.item.children.length == 0) {
      return (
        <Box
          id="document"
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            pl: 2,
            mb: 0.5,
          }}
        >
          {props.item.isViewed ? (
            <CheckIcon
              htmlColor={grey[600]}
              fontSize="small"
              sx={{ fontSize: '17px' }}
            />
          ) : (
            <></>
          )}
          {/* <TreeItem
            nodeId="2"
            label={props.item.text || props.item.title}
            onClick={() => {
              setOpen(false);
              props.item.onClick();
            }}
            // className={props.item.isViewed ? 'green' : 'red'}
            /> */}
          <Typography
            onClick={() => {
              setOpen(false);
              props.item.onClick();
            }}
            sx={{
              cursor: 'pointer',
              fontWeight: 500,
              ml: 0.5,
            }}
          >
            {props.item.text || props.item.title}
          </Typography>
        </Box>
      );
    } else if (props.item.isFolder && props.item.children.length > 0) {
      return (
        <Box
          sx={{
            bgcolor: '#f2f2f2',
            // p: 1,
            borderRadius: '10px',
            minWidth: '240px',
          }}
        >
          <Accordion
            onClick={(event) => {
              event.stopPropagation();
            }}
            sx={{
              boxShadow: 'none',
              bgcolor: 'transparent',
            }}
            className="simAccordion"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={{
                m: 0,
                pl: 2,
                pr: 0,
              }}
            >
              <FolderIcon
                sx={{
                  fontSize: '15px',
                  mt: 0.5,
                  ml: 0.3,
                  mr: 0.5,
                  color: customTheme.craa?.palette.orange,
                }}
              />
              <Typography>{props.item.text || props.item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {props.item.children?.map((child: any) => {
                return (
                  <Box
                    id="document"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      pl: 2,
                    }}
                  >
                    {child.isViewed ? (
                      // <CheckBoxIcon
                      //   htmlColor={grey[600]}
                      //   fontSize="small"
                      //   sx={{ fontSize: '17px' }}
                      // />
                      <CheckIcon
                        htmlColor={grey[600]}
                        fontSize="small"
                        sx={{ fontSize: '17px' }}
                      />
                    ) : (
                      // <CheckBoxOutlineBlankIcon
                      //   htmlColor={grey[600]}
                      //   fontSize="small"
                      //   sx={{ fontSize: '17px' }}
                      // />
                      <></>
                    )}
                    {/* <TreeItem
                      nodeId="4"
                      label={child.text || child.title}
                      onClick={() => {
                        setOpen(false);
                        child.onClick();
                      }}
                      // className={props.item.isViewed ? 'green' : 'red'}
                    /> */}
                    <Typography
                      onClick={() => {
                        setOpen(false);
                        child.onClick();
                      }}
                      sx={{
                        cursor: 'pointer',
                        fontWeight: 500,
                        // ml: 0.5,
                      }}
                    >
                      {child.text || child.title}
                    </Typography>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
          {/* <Box
            id="folder"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '100%',
              mb: 0.5,
              mt: 0.5,
            }}
          >
            <FolderIcon
              sx={{
                fontSize: '15px',
                mt: 0.5,
                ml: 0.3,
                color: customTheme.craa?.palette.orange,
              }}
            /> */}
          {/* @ts-ignore */}
          {/* <TreeItem nodeId="3" label={props.item.text || props.item.title}>
              {props.item.children?.map((child: any) => {
                return (
                  <Box
                    id="document"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    {child.isViewed ? (
                      // <CheckBoxIcon
                      //   htmlColor={grey[600]}
                      //   fontSize="small"
                      //   sx={{ fontSize: '17px' }}
                      // />
                      <CheckIcon
                        htmlColor={grey[600]}
                        fontSize="small"
                        sx={{ fontSize: '17px' }}
                      />
                    ) : (
                      // <CheckBoxOutlineBlankIcon
                      //   htmlColor={grey[600]}
                      //   fontSize="small"
                      //   sx={{ fontSize: '17px' }}
                      // />
                      <></>
                    )}
                    <TreeItem
                      nodeId="4"
                      label={child.text || child.title}
                      onClick={() => {
                        setOpen(false);
                        child.onClick();
                      }}
                      // className={props.item.isViewed ? 'green' : 'red'}
                    />
                  </Box>
                );
              })}
            </TreeItem>
          </Box> */}
          {/* <Divider /> */}
        </Box>
      );
    } else {
      return <></>;
    }
  };
  const renderMenu = (item: IMenuItem) => {
    // let cnt = 0;d
    return (
      <>
        {item.children.length > 0 ? (
          <Box
            sx={{
              bgcolor: '#f2f2f2',
              // p: 1,
              m: '0.5rem',
              mb: 1,
              borderRadius: '10px',
              minWidth: '240px',
            }}
          >
            {/* //   <Box
          //     id="folder"
          //     sx={{
          //       display: 'flex',
          //       alignItems: 'flex-start',
          //       width: '100%',
          //       mb: 0.5,
          //       mt: 0.5,
          //     }}
          //   >
          //     <FolderIcon
          //       sx={{
          //         fontSize: '15px',
          //         mt: 0.5,
          //         ml: 0.3,
          //         color: customTheme.craa?.palette.orange,
          //       }}
          //     /> */}
            {/* @ts-ignore */}
            {/* <TreeItem nodeId="1" label={item.text || item.title}>
                {item.children?.map((child) => {
                  return <RenderSubMenu item={child} />;
                })}
              </TreeItem>
            </Box> */}
            <Accordion
              onClick={(event) => {
                event.stopPropagation();
              }}
              sx={{
                boxShadow: 'none',
                bgcolor: 'transparent',
              }}
              className="simAccordion"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  m: 0,
                }}
              >
                <FolderIcon
                  sx={{
                    fontSize: '15px',
                    mt: 0.5,
                    ml: 0.3,
                    mr: 0.5,
                    color: customTheme.craa?.palette.orange,
                  }}
                />
                <Typography>{item.text || item.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item.children?.map((child) => {
                  return <RenderSubMenu item={child} />;
                })}
              </AccordionDetails>
            </Accordion>
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Box ref={anchorEl}>
      <Button
        id="documents"
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          color: 'white',
          p: 0,
          mr: 1.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {' '}
        <PostAddIcon
          sx={{
            fontSize: '1.2rem',
            mt: '-0.2rem',
            mr: '0.3rem',
          }}
        />
        <Typography sx={{ fontSize: '12px', fontWeight: 700, mt: 0.3 }}>
          Select Document
        </Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl.current}
        className="popper"
        placement="bottom"
        sx={{
          zIndex: viewport.index === 2 ? 1004 : 100,
          transform:
            viewport.index === 2
              ? `${element?.style.transform} !important`
              : 'none',
          top: viewport.index === 2 ? '115px !important' : '0 !important',
          left: viewport.index === 2 ? '-15px !important' : '0 !important',
          maxHeight: '700px',
          overflowY: 'auto',
        }}
      >
        {/* <TreeView
          sx={{
            m: 2,
          }}
          aria-label="multi-select"
          // defaultCollapseIcon={<ArrowDropDownIcon />}
          // defaultExpandIcon={<ArrowRightIcon />}
          // expanded={expanded}
          // selected={selected}
          // onNodeToggle={handleToggle}
          // onNodeSelect={handleSelect}
          multiSelect
          onClick={handleTreeviewClick}
        > */}
        {items?.map(renderMenu)}
        {/* </TreeView> */}
      </Popper>
    </Box>
  );
}
export default observer(MenuView);
