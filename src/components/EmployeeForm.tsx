import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, updateEmployee } from "../features/employeeSlice";
import { AppDispatch } from "../app/store";
import { Employee } from "../features/employeeSlice";

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
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full px-4 py-2"
          required
        />
      </div>
      <div>
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border w-full px-4 py-2"
          required
        />
      </div>
      <div>
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border w-full px-4 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {currentEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
