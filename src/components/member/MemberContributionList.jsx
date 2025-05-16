// src/components/member/MemberContributionList.jsx
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { fetchContributions } from '../../api/contributionService';

export default function MemberContributionList({ memberId }) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    fetchContributions(memberId).then(data => {
      setRows(data.map(r => ({ ...r, id: r.id })));
    }).catch(console.error);
  }, [memberId]);

  if (!rows) return <CircularProgress />;

  if (rows.length === 0) {
    return <Typography>No contributions yet.</Typography>;
  }

  const columns = [
    { field: 'transaction_date', headerName: 'Date', flex: 1 },
    { field: 'type',             headerName: 'Type', flex: 1 },
    { field: 'amount',           headerName: 'Amount', flex: 1 },
    { field: 'method',           headerName: 'Method', flex: 1 },
  ];

  return (
    <Box sx={{ height: 400, mb: 4 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
      />
    </Box>
  );
}
