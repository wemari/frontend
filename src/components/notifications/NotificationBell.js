import React, { useContext, useState, useEffect } from 'react';
import {
  Badge,
  IconButton,
  Popover,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  useTheme,
  ListItemButton,
  useMediaQuery,
} from '@mui/material';
import { Bell } from 'lucide-react';
import NotificationContext from '../../contexts/NotificationContext';
import { useSwipeable } from 'react-swipeable';


const NotificationBell = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useContext(NotificationContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [prevCount, setPrevCount] = useState(notifications.length);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    markAllAsRead();
  };

  const handleClose = () => setAnchorEl(null);

  const groupedNotifications = notifications.reduce((acc, notification) => {
    acc[notification.type] = acc[notification.type] || [];
    acc[notification.type].push(notification);
    return acc;
  }, {});

  const popoverWidth = isMobile ? '90vw' : 360;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => markAllAsRead(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (notifications.length > prevCount) {
      const audio = new Audio('/notification.mp3');
      audio.play().catch((error) => console.error('Audio play error:', error));
      if (Notification.permission === 'granted') {
        const latest = notifications[0];
        new Notification(latest.title, {
          body: latest.message,
          icon: '/logo192.png',
        });
      }
    }
    setPrevCount(notifications.length);
  }, [notifications.length]);

  return (
    <>
      <IconButton onClick={handleOpen} aria-label={`Show notifications (${unreadCount} unread)`}>
        <Badge badgeContent={unreadCount} color="error">
          <Bell />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          elevation: 4,
          sx: {
            width: popoverWidth,
            maxHeight: '60vh',
            borderRadius: 2,
            overflowY: 'auto',
            backgroundColor: isDark ? theme.palette.background.paper : '#fff',
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <Box sx={{ p: 2 }} {...swipeHandlers}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'All caught up!'}
          </Typography>

          <List disablePadding>
            {Object.entries(groupedNotifications).map(([type, items]) => (
              <Box key={type} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ textTransform: 'capitalize', mb: 1 }}>
                  {type}
                </Typography>
                {items.map((notification) => (
                  <ListItem key={notification.id} disablePadding>
                    <ListItemButton
                      onClick={() => markAsRead(notification.id)}
                      sx={{
                        alignItems: 'flex-start',
                        backgroundColor: notification.is_read
                          ? 'transparent'
                          : isDark
                          ? 'rgba(66, 133, 244, 0.1)'
                          : '#e3f2fd',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: isDark
                            ? 'rgba(66, 133, 244, 0.2)'
                            : '#d0e5fc',
                        },
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        py: 1.5,
                        px: 2,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: notification.is_read ? 400 : 600,
                              color: theme.palette.text.primary,
                            }}
                          >
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.disabled"
                              sx={{ display: 'block', mt: 0.5 }}
                            >
                              {new Date(notification.created_at).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default NotificationBell;
