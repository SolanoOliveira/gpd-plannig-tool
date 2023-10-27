import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const NewProductForm = ( {data, updateFieldHandler, setData } ) => {

  const options = [
    {
      label: "Low",
      value: "low",
      months: 6
    },
    {
      label: "Medium",
      value: "mid",
      months: 8
    },
    {
      label: "High",
      value: "high",
      months: 10
    },
  ]
  
  const handleChangeTemplate = (option) => {
    updateFieldHandler("template_type", option.value)

    const allocations = [data.allocations]
    for (let i = 1; i < option.months; i++) {
      allocations.push({month: i, allocation: 0});
    }
    
    setData((prev) => {
      return { ...prev, allocations  };
    });
  };

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            New Product
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="nome"
            label="Product Name"
            variant="outlined"
            required
            fullWidth
            value={data.nome}
            onChange={(e) => updateFieldHandler("nome", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="leader"
            label="GPD Leader"
            variant="outlined"
            required
            fullWidth
            value={data.lider_npi}
            onChange={(e) => updateFieldHandler("lider_npi", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ minWidth: 100 }}>
            <InputLabel id="demo-simple-select-required-label">
              Template
            </InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={data.template_type}
              label="Template"
              defaultValue="Low"
              required
            >
              {options.map((option) => (
                <MenuItem value={option.value} onClick={() => handleChangeTemplate(option)}>{ option.label }</MenuItem>
              ))}

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl required fullWidth sx={{ minWidth: 100, marginTop: -1 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Date SA "
                  value={data.data_sa }
                  onChange={(e) => updateFieldHandler("data_sa", e)}
                  format="MM/YYYY"
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default NewProductForm;
