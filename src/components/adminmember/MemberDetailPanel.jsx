import React, { useState, useContext } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Users,
  Link as LinkIcon,
  Crown,
  Star,
  MessageCircle,
} from 'lucide-react';
import {
  EditIcon,
  DeleteIcon,
} from '../../components/common/ActionIcons'; 
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

export default function MemberDetailPanel({
  member,
  onEdit,
  onDelete,
  onNextOfKin,
  onFamily,
  onCellGroup,
  onMilestones,
  onNotify,
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Retrieve permissions from AuthContext
  const { permissions } = useContext(AuthContext);
  const canEdit = permissions.includes('edit_members') || permissions.includes('manage_members');
  const canDelete = permissions.includes('delete_members') || permissions.includes('manage_members');

  const handleDeleteClick = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);
  const handleConfirmDelete = () => {
    setDialogOpen(false);
    onDelete();
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          pb: 1,
          borderBottom: '1px solid #eee',
        }}
      >
        <Typography variant="h5">Member Details</Typography>
        <Box>
          {canEdit && (
            <EditIcon
              onClick={onEdit}
              sx={{
                cursor: 'pointer',
                color: 'blue',
                '&:hover': { color: 'darkblue' },
              }}
            />
          )}
          {canDelete && (
            <DeleteIcon
              onClick={handleDeleteClick}
              sx={{
                cursor: 'pointer',
                color: 'red',
                '&:hover': { color: 'darkred' },
              }}
            />
          )}
        </Box>
      </Box>

      {/* Avatar and Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar
          src={member.profile_picture_url}
          sx={{ width: 56, height: 56, mr: 2 }}
        >
          {member.first_name[0]}
          {member.surname[0]}
        </Avatar>
        <Box>
          <Typography variant="h5">
            {member.first_name} {member.surname}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1, mb: 2 }}>
            {/* Member Type Chip */}
            <Chip
              label={member.member_type.replace('_', ' ')}
              variant="outlined"
              size="small"
              sx={{
                borderColor:
                  member.member_type === 'member'
                    ? 'green'
                    : member.member_type === 'first_timer'
                    ? 'orange'
                    : member.member_type === 'new_convert'
                    ? 'purple'
                    : 'gray',
                color:
                  member.member_type === 'member'
                    ? 'green'
                    : member.member_type === 'first_timer'
                    ? 'orange'
                    : member.member_type === 'new_convert'
                    ? 'purple'
                    : 'gray',
              }}
            />
            {/* Status Chip */}
            <Chip
              label={member.status}
              variant="outlined"
              size="small"
              sx={{
                borderColor:
                  member.status === 'active'
                    ? 'green'
                    : member.status === 'inactive'
                    ? 'red'
                    : 'gray',
                color:
                  member.status === 'active'
                    ? 'green'
                    : member.status === 'inactive'
                    ? 'red'
                    : 'gray',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Details */}
      <Stack spacing={2} mb={2}>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Email
          </Typography>
          <Typography>{member.email}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Address
          </Typography>
          <Typography>{member.physical_address || 'Not Available'}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Phone
          </Typography>
          <Typography>{member.contact_primary}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Date Joined
            </Typography>
            <Typography>
              {new Date(member.date_joined_church).toLocaleDateString() || 'Not Available'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Date Born Again
            </Typography>
            <Typography>
              {new Date(member.date_born_again).toLocaleDateString() || 'Not Available'}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Date of Birth
            </Typography>
            <Typography>
              {new Date(member.date_of_birth).toLocaleDateString() || 'Not Available'}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              Gender
            </Typography>
            <Typography>{member.gender || 'Not Available'}</Typography>
          </Box>
        </Box>
      </Stack>

      {/* Action Icons Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mt: 3,
          px: 2,
          pb: 1,
          borderTop: '1px solid #eee',
        }}
      >
        <Tooltip title="Next of Kin">
          <IconButton size="large" onClick={onNextOfKin}>
            <Users size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Family Links">
          <IconButton size="large" onClick={onFamily}>
            <LinkIcon size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cell Group">
          <IconButton size="large" onClick={onCellGroup}>
            <Crown size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Milestones">
          <IconButton size="large" onClick={onMilestones}>
            <Star size={20} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Send Notification">
          <IconButton size="large" onClick={onNotify}>
            <MessageCircle size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={isDialogOpen}
        title="Confirm Delete"
        content="Are you sure you want to delete this member?"
        onClose={handleDialogClose}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
