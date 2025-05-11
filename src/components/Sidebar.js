import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Home,
  User,
  Shield,
  Lock,
  LogOut,
  Menu,
  Users,
  Group,
  UserRoundPlus,
  UserCheck,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, token, permissions, userRole, memberId } = useContext(AuthContext);

  const toggleSidebar = () => setOpen(!open);
  if (!token) return null;

  const hasPermission = (perm) => permissions.includes(perm);

  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: userRole === 'admin' ? '/dashboard' : '/member-dashboard' },
    { label: 'Profile', icon: <User size={20} />, path: `/members/profile/${memberId}`, roles: ['member'] },
    { label: 'Users', icon: <User size={20} />, path: '/users', permission: 'view_users' },
    { label: 'Roles', icon: <Shield size={20} />, path: '/roles', permission: 'view_roles' },
    { label: 'Permissions', icon: <Lock size={20} />, path: '/permissions', permission: 'view_permissions' },
    { label: 'Members', icon: <Users size={20} />, path: '/members', permission: 'view_members' },
    { label: 'New Members', icon: <UserCheck size={20} />, path: '/first-timers-converts', permission: 'view_members' },
    { label: 'Counseling', icon: <Users size={20} />, path: '/members/1/interactions', permission: 'view_members' },
    { label: 'Cell Groups', icon: <Group size={20} />, path: '/cell-groups', permission: 'view_cell_groups' },
    { label: 'Departments', icon: <UserRoundPlus size={20} />, path: '/departments', permission: 'view_departments' },
    { label: 'Milestone Templates', icon: <ShieldCheck size={20} />, path: '/milestones', permission: 'view_milestones' },
    // <-- New Cell Rules entry
    {
      label: 'Cell Rules',
      icon: <Settings size={20} />,
      path: '/admin/cell-rules',
      permission: 'view_cell_rules'
    }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          transition: 'width 0.3s',
          overflowX: 'hidden'
        }
      }}
    >
      <IconButton onClick={toggleSidebar} sx={{ m: 1 }} disableRipple>
        <Menu size={24} />
      </IconButton>

      <List>
        {menuItems
          .filter(item => {
            if (item.permission && !hasPermission(item.permission)) return false;
            if (item.roles && !item.roles.includes(userRole)) return false;
            return true;
          })
          .map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem disablePadding key={idx}>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    backgroundColor: isActive ? 'action.selected' : 'transparent',
                    '&:hover': { backgroundColor: 'action.hover' }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {open && <ListItemText primary={item.label} />}
                </ListItemButton>
              </ListItem>
            );
          })}

        {/* Logout */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <ListItemIcon>
              <LogOut size={20} />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
