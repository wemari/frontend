// src/components/member/SummaryCards.jsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { fetchMemberStats } from '../../api/memberStatsService';

export default function SummaryCards({ memberId }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchMemberStats(memberId).then(setStats).catch(console.error);
  }, [memberId]);

  if (!stats) return <CircularProgress />;

  const items = [
    { label: 'Total Given',     value: stats.totalGiven },
    { label: 'Gifts Made',      value: stats.giftCount },
    { label: 'Avg. Gift',       value: stats.avgGift.toFixed(2) },
    { label: 'Pledge Fulfilled',value: `${stats.pledgePct}%` },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {items.map((item, i) => (
        <Grid item xs={6} md={3} key={i}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">{item.label}</Typography>
              <Typography variant="h5">{item.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
