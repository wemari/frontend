import { AppBar, Toolbar, Typography, IconButton, useTheme, Box } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Sun, Moon } from 'lucide-react';
import NotificationBell from '../components/notifications/NotificationBell';

export default function Topbar({ open }) {
  const { toggleTheme, mode, memberId } = useContext(AuthContext);
  const theme = useTheme(); // Access the current theme

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1, // Ensure it appears above the sidebar
        backgroundColor: 'transparent', // Fully transparent background
        color: theme.palette.text.primary, // Use theme text color
        boxShadow: 'none', // Remove shadow
        left: open ? '240px' : '72px', // Adjust position based on sidebar state
        width: `calc(100% - ${open ? '240px' : '72px'})`, // Adjust width based on sidebar state
        transition: theme.transitions.create(['left', 'width'], {
          duration: theme.transitions.duration.standard,
        }), // Smooth transition for AppBar width
        backdropFilter: 'blur(10px)', // Frosted glass effect
        borderRadius: 0, // Remove rounded corners
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          {/* App Title or Logo */}
        </Typography>

        {memberId && (
          <Box sx={{ mr: 2 }}>
            <NotificationBell memberId={memberId} />
          </Box>
        )}

        <IconButton
          onClick={toggleTheme}
          sx={{
            color: theme.palette.text.primary, // Use theme text color
            '&:hover': {
              backgroundColor: theme.palette.action.hover, // Subtle hover effect using theme
            },
          }}
        >
          {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
