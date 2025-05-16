import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  OutlinedInput,
} from '@mui/material';
import { Plus, RefreshCcwDot, CheckCheck } from 'lucide-react';
import SnackbarAlert from '../common/SnackbarAlert'; // Import SnackbarAlert
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const roleOptions = [
  'Pastor',
  'Cell Leader',
  'Member',
  'Support',
  'Admin',
];

export default function FiltersPanel({
  typeFilter,
  onTypeChange,
  roleFilter,
  onRoleChange,
  onRunManual,
  onAddMember,
  onSendGroupNotification,
}) {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Retrieve permissions from AuthContext
  const { permissions } = useContext(AuthContext);
  const canCreate = permissions.includes('create_members') || permissions.includes('manage_members');
  const canSendNotifications = permissions.includes('send_notifications') || permissions.includes('manage_members');

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleManualUpdate = () => {
    onRunManual();
    setSnackbar({ open: true, message: 'Manual updates triggered!', severity: 'info' });
  };

  const handleGroupNotification = () => {
    onSendGroupNotification();
    setSnackbar({ open: true, message: 'Group notification sent!', severity: 'success' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Add Member Button */}
      {canCreate && (
        <Button variant="contained" startIcon={<Plus />} onClick={onAddMember}>
          Add Member
        </Button>
      )}

      {/* Type Filter */}
      <FormControl fullWidth>
        <InputLabel id="type-filter-label">Type</InputLabel>
        <Select
          labelId="type-filter-label"
          value={typeFilter}
          label="Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="member">Member</MenuItem>
          <MenuItem value="first_timer">First Timer</MenuItem>
          <MenuItem value="new_convert">New Convert</MenuItem>
        </Select>
      </FormControl>

      {/* Role Filter */}
      <FormControl fullWidth>
        <InputLabel id="role-filter-label">Role</InputLabel>
        <Select
          labelId="role-filter-label"
          multiple
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
          input={<OutlinedInput label="Role" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Run Manual Update */}
      <Button
        variant="outlined"
        startIcon={<RefreshCcwDot />}
        onClick={handleManualUpdate}
      >
        Manual Updates
      </Button>

      {/* Send Group Notification */}
      {canSendNotifications && (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CheckCheck />}
          onClick={handleGroupNotification}
        >
          Notifications
        </Button>
      )}

      {/* SnackbarAlert */}
      <SnackbarAlert
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {snackbar.message}
      </SnackbarAlert>
    </Box>
  );
}
