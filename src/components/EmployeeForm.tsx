import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../features/employeeSlice";
import { AppDispatch } from "../app/store";
import { Employee } from "../features/employeeSlice";
import { TextField, Button, Box } from "@mui/material";

interface EmployeeFormProps {
  currentEmployee?: Employee;
  onSave: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  currentEmployee,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (currentEmployee) {
      setName(currentEmployee.name);
      setPosition(currentEmployee.position);
      setDepartment(currentEmployee.department);
    }
  }, [currentEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEmployee: Employee = {
      id: currentEmployee ? currentEmployee.id : Math.random().toString(),
      name,
      position,
      department,
    };

    if (currentEmployee) {
      dispatch(updateEmployee(newEmployee));
    } else {
      dispatch(addEmployee(newEmployee));
    }

    setName("");
    setPosition("");
    setDepartment("");
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {currentEmployee ? "Update Employee" : "Add Employee"}
        </Button>
      </Box>
    </form>
  );
};

export default EmployeeForm;
