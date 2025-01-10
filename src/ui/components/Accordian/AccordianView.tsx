import { observer } from 'mobx-react';
import { Check, ExpandMore } from '@mui/icons-material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Stepper from '../Stepper/Stepper';

function AccordianView(props: any) {
  const {
    item = {
      text: '',
    },
  } = props;
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === item.text}
      onChange={handleChange(item.text)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box>
          <Typography sx={{ width: '90%', textOverflow: 'ellipsis' }}>
            {item.text}
          </Typography>
          <Box sx={{ width: '10%' }}>
            <Check />
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper />
      </AccordionDetails>
    </Accordion>
  );
}
export default observer(AccordianView);
