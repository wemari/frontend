// src/components/member/Badges.jsx
import React, { useEffect, useState } from 'react';
import { Stack, Chip, Typography, CircularProgress } from '@mui/material';
import { fetchMemberBadges } from '../../api/memberStatsService';

export default function Badges({ memberId }) {
  const [badges, setBadges] = useState(null);

  useEffect(() => {
    fetchMemberBadges(memberId).then(setBadges).catch(console.error);
  }, [memberId]);

  if (!badges) return <CircularProgress />;

  return (
    <>
      <Typography variant="h6" gutterBottom>Badges</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
        {badges.map((b,i) => (
          <Chip key={i} label={b.label} icon={<span className="material-icons">{b.icon_name}</span>} />
        ))}
      </Stack>
    </>
  );
}
