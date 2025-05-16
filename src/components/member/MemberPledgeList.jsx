// src/components/member/PledgeProgressList.jsx

import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { fetchPledges } from '../../api/pledgeService';

export default function PledgeProgressList({ memberId }) {
  const [pledges, setPledges] = useState(null);

  useEffect(() => {
    fetchPledges(memberId)
      .then(setPledges)
      .catch(console.error);
  }, [memberId]);

  if (!pledges) {
    return <CircularProgress />;
  }

  if (pledges.length === 0) {
    return <Typography>No pledges found.</Typography>;
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>Pledge Progress</Typography>
      <List>
        {pledges.map((p) => {
          // Coerce to numbers
          const amount    = Number(p.amount)    || 0;
          const fulfilled = Number(p.fulfilled) || 0;
          const pct       = amount > 0 ? (fulfilled / amount) * 100 : 0;

          return (
            <ListItem
              key={p.id}
              sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <ListItemText
                primary={`Goal: ${amount.toFixed(2)}`}
                secondary={`${fulfilled.toFixed(2)} fulfilled (${pct.toFixed(0)}%)`}
              />
              <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress variant="determinate" value={pct} />
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
