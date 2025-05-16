import React, { useEffect, useState, useContext } from 'react';
import {
  Container, Typography, Grid, Box, Button, Modal, TextField, useTheme, CircularProgress, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LabelList
} from 'recharts';
import { format, parseISO, subDays, getMonth } from 'date-fns';
import { AuthContext } from '../contexts/AuthContext';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
} from '@mui/lab';

const API = process.env.REACT_APP_API_URL;

const neumorphicCard = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: theme.palette.mode === 'light'
    ? '6px 6px 12px #d3d3d3, -6px -6px 12px #ffffff'
    : '6px 6px 12px #0d0d0d, -6px -6px 12px #2a2a2a',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: theme.palette.mode === 'light'
      ? '8px 8px 15px #c4c4c4, -8px -8px 15px #ffffff'
      : '8px 8px 15px #3a3a3a, -8px -8px 15px #1a1a1a',
  }
});

const StatCard = ({ title, value }) => (
  <Box sx={neumorphicCard}>
    <Typography variant="body2" color="text.secondary" textTransform="capitalize">
      {title}
    </Typography>
    <Typography variant="h5" fontWeight={500} align="center">{value}</Typography>
  </Box>
);

const DailyActivitiesCard = () => {
  const [activities, setActivities] = useState([
    { time: '09:30 am', text: 'Payment received from John Doe of $385.90', color: '#42a5f5' },
    { time: '10:00 am', text: 'New sale recorded #ML-3467', color: '#66bb6a' },
    { time: '12:00 am', text: 'Payment was made of $64.95 to Michael', color: '#ffa726' },
    { time: '09:30 am', text: 'New arrival recorded', color: '#ab47bc' },
  ]);

  useEffect(() => {
    const ws = new WebSocket('wss://your-websocket-url'); // Replace with your WebSocket URL

    ws.onmessage = (event) => {
      const newActivity = JSON.parse(event.data);
      setActivities((prev) => [newActivity, ...prev]); // Add new activity to the top
    };

    return () => ws.close(); // Cleanup WebSocket connection on component unmount
  }, []);

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 2,
        p: 3,
        border: '1px solid #e0e0e0', // Thin outline
        boxShadow: 'none', // Remove shadow for a thinner look
        mb: 4,
        maxWidth: 550, // Increased width slightly
        width: '100%', // Ensure responsiveness
      }}
    >
      <Typography variant="h6" fontWeight={500} sx={{ mb: 1 }}>
        Daily Activities
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Overview of Years
      </Typography>
      <Timeline>
        {activities.map((activity, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{
                flex: 0.2,
                fontSize: '0.875rem',
                color: 'text.secondary',
                textAlign: 'right', // Align time to the right
                whiteSpace: 'nowrap', // Prevent stacking of time
              }}
            >
              {activity.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ backgroundColor: activity.color }} />
              {index < activities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent
              sx={{
                fontSize: '0.875rem',
                display: 'flex',
                flexDirection: 'column', // Stack the text
                gap: 0.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {activity.text.split(' ')[0]} {/* Highlight the first word */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.text.slice(activity.text.indexOf(' ') + 1)} {/* Remaining text */}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

const TopGiversCard = () => {
  const [selectedMonth, setSelectedMonth] = useState('March 2025');

  const giversByMonth = {
    'January 2025': [
      { id: 1, name: 'John Doe', category: 'Platinum Donor', amount: '$3,500', color: '#42a5f5' },
      { id: 2, name: 'Jane Smith', category: 'Gold Donor', amount: '$2,800', color: '#66bb6a' },
      // Add more givers for January
    ],
    'February 2025': [
      { id: 1, name: 'Michael Brown', category: 'Silver Donor', amount: '$1,200', color: '#ffa726' },
      { id: 2, name: 'Emily Davis', category: 'Bronze Donor', amount: '$950', color: '#ab47bc' },
      // Add more givers for February
    ],
    'March 2025': [
      { id: 1, name: 'Chris Green', category: 'Platinum Donor', amount: '$3,200', color: '#42a5f5' },
      { id: 2, name: 'Anna White', category: 'Gold Donor', amount: '$2,500', color: '#66bb6a' },
      // Add more givers for March
    ],
    // Add data for other months...
  };

  const months = Object.keys(giversByMonth);

  const topGivers = giversByMonth[selectedMonth] || [];

  return (
    <Box
      sx={{
        background: '#fff',
        borderRadius: 2,
        p: 3,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 400, // Limit the height to 400px
        overflowY: 'auto', // Enable scrolling if content exceeds maxHeight
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={500}>
          Top Givers Monthly
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="month-select-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Month"
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Givers List */}
      <Box sx={{ flexGrow: 1 }}>
        {topGivers.map((giver, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              borderBottom: index < topGivers.length - 1 ? '1px solid #e0e0e0' : 'none',
            }}
          >
            <Typography variant="body2" sx={{ width: '30%' }}>
              {giver.name}
            </Typography>
            <Typography variant="body2" sx={{ width: '40%', color: 'text.secondary' }}>
              {giver.category}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                width: '30%',
                textAlign: 'right',
                fontWeight: 500,
                color: giver.color,
              }}
            >
              {giver.amount}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function Dashboard() {
  const theme = useTheme();
  const { permissions } = useContext(AuthContext);
  const canViewDashboard = permissions.includes('view_dashboard') || permissions.includes('manage_dashboard');
  const canEditDashboard = permissions.includes('edit_dashboard') || permissions.includes('manage_dashboard');

  const [counts, setCounts] = useState({});
  const [data, setData] = useState({
    members: [], prayers: [], sessions: [], foundations: [], baptisms: [], firstTimers: [], newConverts: []
  });
  const [dateRange, setDateRange] = useState([subDays(new Date(), 6), new Date()]);
  const [drillData, setDrillData] = useState({ title: '', items: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoints = [
        'members', 'prayer-requests', 'counseling',
        'milestones', 'new-converts?baptism_scheduled=true',
        'first-timers', 'new-converts'
      ].map(path => fetch(`${API}/${path}`));

      const responses = await Promise.all(endpoints);
      const jsons = await Promise.all(responses.map(res => res.ok ? res.json() : []));
      const [members, prayers, sessionsRaw, foundations, baptisms, fts, ncs] = jsons;
      const sessions = Array.isArray(sessionsRaw) ? sessionsRaw : [];

      setData({ members, prayers, sessions, foundations, baptisms, firstTimers: fts, newConverts: ncs });

      setCounts({
        members: members.length,
        prayers: prayers.length,
        sessions: sessions.length,
        baptisms: baptisms.length,
        foundations: foundations.filter(f => f.milestone_name?.toLowerCase().includes('foundation')).length,
        firstTimers: fts.length,
        newConverts: ncs.length
      });
      setLoading(false);
    } catch (err) {
      setError('Error loading data');
      setLoading(false);
    }
  };

  useEffect(() => { if (canViewDashboard) loadData(); }, [canViewDashboard]);

  const monthlyPrayers = () => {
    const counts = Array(12).fill(0);
    data.prayers.forEach(({ created_at }) => counts[getMonth(new Date(created_at))]++);
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .map((m, i) => ({ month: m, count: counts[i] }));
  };

  const monthlyNewMembers = () => {
    const counts = Array(12).fill(0);
    data.members.forEach(({ joined_at }) => counts[getMonth(new Date(joined_at))]++);
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .map((month, i) => ({ month, count: counts[i] }));
  };

  const sessionModes = () => {
    const map = {};
    data.sessions.forEach(s => {
      const mode = s.mode || 'Unknown';
      map[mode] = (map[mode] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  };

  if (!canViewDashboard) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h6">You do not have permission to view the dashboard.</Typography>
      </Container>
    );
  }

  const chartBlocks = [
    {
      title: "New Members",
      chart: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyNewMembers()} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="url(#gradientBar)" radius={[6, 6, 0, 0]}>
              <LabelList dataKey="count" position="top" style={{ fill: '#fff', fontWeight: 'bold' }} />
            </Bar>
            <defs>
              <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#42a5f5" />
                <stop offset="100%" stopColor="#1e88e5" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "Prayer Requests",
      chart: (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyPrayers()} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="url(#gradientLine)"
              strokeWidth={3}
              dot={{ stroke: '#1e88e5', strokeWidth: 2, fill: '#42a5f5' }}
            />
            <defs>
              <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#66bb6a" />
                <stop offset="100%" stopColor="#43a047" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      title: "Session Modes",
      chart: (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={sessionModes()} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={theme.palette.primary.dark} radius={[6, 6, 0, 0]}>
              <LabelList dataKey="value" position="top" style={{ fill: '#fff', fontWeight: 'bold' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 5,
            alignItems: 'center',
            justifyContent: 'center', // Center-align horizontally
            textAlign: 'center', // Ensure text alignment is centered
          }}
        >
          <DatePicker
            label="Start Date"
            value={dateRange[0]}
            onChange={(newValue) => setDateRange([newValue, dateRange[1]])}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={dateRange[1]}
            onChange={(newValue) => setDateRange([dateRange[0], newValue])}
            renderInput={(params) => <TextField {...params} />}
          />
          {canEditDashboard && (
            <Button variant="contained" onClick={loadData}>Refresh</Button>
          )}
        </Box>
      </LocalizationProvider>

      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffca28, #fbc02d)',
          color: '#333',
          borderRadius: 2,
          p: 2,
          mb: 4,
          textAlign: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="body1">
          🚀 New feature available! Check out the updated reports section.
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />
      ) : error ? (
        <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {Object.entries(counts).map(([key, val]) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                <StatCard title={key.replace(/([A-Z])/g, ' $1')} value={val} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>Insights</Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {chartBlocks.map(({ title, chart }, index) => (
              <Box
                key={index}
                sx={{
                  ...neumorphicCard(theme),
                  width: '100%',
                  maxWidth: 400,
                  flexGrow: 1,
                  flexBasis: '30%',
                  minWidth: 280,
                }}
              >
                <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 2, textAlign: 'center' }}>
                  {title}
                </Typography>
                {chart}
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 3, // Space between the cards
              mt: 5,
            }}
          >
            {/* Daily Activities Card */}
            <Box
              sx={{
                flexBasis: '45%', // Occupies 30% of the row
                //maxWidth: '350px', // Ensures the card doesn't grow too wide
                flexShrink: 0, // Prevents shrinking
              }}
            >
              <DailyActivitiesCard />
            </Box>

            {/* Top Givers Card */}
            <Box
              sx={{
                flexBasis: '55%', // Occupies the remaining 70% of the row
              }}
            >
              <TopGiversCard />
            </Box>
          </Box>
        </>
      )}

      <Modal open={!!drillData.items.length} onClose={() => setDrillData({ title: '', items: [] })}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 350,
          bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2, p: 4,
        }}>
          <Typography variant="h6" gutterBottom>{drillData.title}</Typography>
          {drillData.items.map((item, i) => (
            <Typography key={i} variant="body2">{item.name || 'Unnamed'}</Typography>
          ))}
        </Box>
      </Modal>
    </Container>
  );
}
