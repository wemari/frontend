import {
  Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Box, Tooltip, Divider, useTheme
} from '@mui/material';
import {
  Home, User, LogOut, ChevronLeft, Users, Group, UserCheck, ShieldCheck,
  Settings, CalendarDays, BadgeDollarSign, ClockFading
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Sidebar({ open, setOpen }) {
  const theme = useTheme(); // Access the current theme
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, token, permissions, userRole, memberId } = useContext(AuthContext);

  const toggleSidebar = () => setOpen(!open);
  if (!token) return null;

  const hasPermission = (perm) => permissions.includes(perm);

  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: userRole === 'admin' ? '/dashboard' : '/member-dashboard' },
    { label: 'Profile', icon: <User size={20} />, path: `/members/profile/${memberId}`, roles: ['member'] },
    { label: 'My Giving', icon: <BadgeDollarSign size={20} />, path: `/members/${memberId}/finance`, roles: ['member'] },
    { label: 'My Events', icon: <ClockFading size={20} />, path: `/members/${memberId}/events`, roles: ['member'] },
    { label: 'Members', icon: <Users size={20} />, path: '/members', permission: 'view_members' },
    { label: 'New Members', icon: <UserCheck size={20} />, path: '/first-timers-converts', permission: 'view_members' },
    { label: 'Counseling', icon: <Users size={20} />, path: '/members/1/interactions', permission: 'view_members' },
    { label: 'Church Groups', icon: <Group size={20} />, path: '/groups-departments', permission: 'view_cell_groups' },
    { label: 'Events', icon: <CalendarDays size={20} />, path: '/events', roles: ['admin'] },
    { label: 'Finance', icon: <ShieldCheck size={20} />, path: '/finance', permission: 'view_finance' },
    { label: 'Settings', icon: <Settings size={20} />, path: '/settings', roles: ['admin'] },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 72,
        flexShrink: 0,
        height: '100vh',
        zIndex: theme.zIndex.drawer,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 72,
          backgroundColor: theme.palette.background.default, // Use theme background
          color: theme.palette.text.primary, // Use theme text color
          boxShadow: 'none', // Remove box shadow
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          borderRight: `1px solid ${theme.palette.divider}`, // Use theme divider color
          backdropFilter: 'blur(10px)', // Add blur effect
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleSidebar} sx={{ color: theme.palette.text.primary }}>
          <ChevronLeft size={20} />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems
          .filter((item) => {
            if (item.permission && !hasPermission(item.permission)) return false;
            if (item.roles && !item.roles.includes(userRole)) return false;
            return true;
          })
          .map((item, idx) => {
            const isActive = location.pathname === item.path;

            return (
              <Tooltip key={idx} title={!open ? item.label : ''} placement="right">
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    selected={isActive}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      my: 0.5,
                      backgroundColor: isActive ? theme.palette.action.selected : 'transparent', // Use theme action color
                      '&:hover': { backgroundColor: theme.palette.action.hover }, // Use theme hover color
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : 'auto',
                        justifyContent: 'center',
                        fontSize: open ? '1.25rem' : '1rem',
                        color: theme.palette.text.primary, // Use theme text color for icons
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.label} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          })}

        <Divider sx={{ my: 1 }} />

        <Tooltip title={!open ? 'Logout' : ''} placement="right">
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logout();
                navigate('/login');
              }}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                transition: 'background-color 0.3s ease',
                '&:hover': { backgroundColor: theme.palette.action.hover }, // Use theme hover color
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : 'auto',
                  justifyContent: 'center',
                  color: theme.palette.text.primary, // Use theme text color for icons
                }}
              >
                <LogOut size={20} />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
}

