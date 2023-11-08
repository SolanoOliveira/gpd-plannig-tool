import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';

const HrmSpecificMonthModal = ({ monthLabel, monthIndex, peakAmmountJson, onClose }) => {

  const generateRolesForThisMonth = () => {
    const rolesLabels = [];
    const mes_atual = "month" + (monthIndex + 1);
    
    const monthValue = peakAmmountJson[mes_atual];
    for (const role in monthValue) {
      const formattedRole = role.replace(/_/g, ' ');
      rolesLabels.push(formattedRole)
    }

    return rolesLabels;
  };

  const rolesLabels = generateRolesForThisMonth();

  const [selectedRoles, setSelectedRoles] = useState({});
  const [collaboratorsByRole, setCollaboratorsByRole] = useState({});

  const fetchCollaboratorsAndSet = async (role) => {
    try {
      const formattedRole = role.replace(' ', '_');
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_ROTA_COLABORADORES}/${formattedRole}`);
      const collaborators = response.data;
      setCollaboratorsByRole((prevCollaboratorsByRole) => ({
        ...prevCollaboratorsByRole,
        [role]: collaborators,
      }));
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
    }
  };

  const handleRoleChange = (event, role) => {
    const selectedRole = event.target.value;
    
    setSelectedRoles({
      ...selectedRoles,
      [role]: selectedRole,
    });
  };

  const clearSelectedRole = (role) => {
    setSelectedRoles({
      ...selectedRoles,
      [role]: '',
    });
  };

  useEffect(() => {
    rolesLabels.forEach((role) => {
      fetchCollaboratorsAndSet(role);
    });
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Allocation on {monthLabel}
          </Typography>
        </Grid>
        <Grid container sx={{ marginTop: 2 }} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={3} sx={{ marginBottom: 2 }}>
            <strong>Roles</strong>
          </Grid>
          <Grid item xs={6} sx={{ marginBottom: 2 }}>
            <strong>Collaborators</strong>
          </Grid>
          <Grid item xs={2} sx={{ marginBottom: 4 }}>
            <strong>Actions</strong>
          </Grid>
          {rolesLabels.map((role, index) => (
            <Grid container key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <Grid item xs={3} sx={{paddingLeft: '16px'}}>
                <span>{role}</span>
              </Grid>
              <Grid item xs={5} sx={{ marginLeft: 2 }}>
              <Select
                value={selectedRoles[role] || ''}
                fullWidth
                onChange={(event) => handleRoleChange(event, role)}
                sx={{height: 35}}
              >
                <MenuItem disabled value="">
                  <em>Select a collaborator</em>
                </MenuItem>
                {collaboratorsByRole[role] && collaboratorsByRole[role].map((colaborador, index) => (
                  <MenuItem key={index} value={colaborador.nome}>
                    {colaborador.nome}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={3} sx={{paddingLeft: '24px'}}>
                  <Button
                    color="error"
                    sx={{ height: 40, marginLeft: '10px'}}
                    onClick={() => clearSelectedRole(role)}
                  >
                    Clear
                  </Button>
                </Grid>
            </Grid>
          ))}
        </Grid>
        <div style={{display: 'flex', justifyContent: 'flex-start', marginTop: '20px'}}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ height: 40, marginRight: 1}}
            onClick={onClose}
          >
            Return
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ height: 40, marginRight: 1}}
          >
            Save
          </Button>
        </div>
      </Box>
    </>
  );
};

export default HrmSpecificMonthModal;
