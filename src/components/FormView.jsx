import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import { useBoxStore } from "../state/zustandStore";
import TextMaskCustom from "./TextMaskCustom";
import { Link } from "react-router-dom";

const COUNTRIES = [
  { Sweden: "7.35" },
  { China: "11.53" },
  { Brazil: "15.63" },
  { Australia: "50.09" },
];

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const FormView = () => {
  const [formData, setFormData] = useState({
    receiverName: "",
    weight: "",
    color: "",
    country: "",
  });

  const [errorData, setErrorData] = useState({
    receiverName: false,
    weight: false,
    color: false,
    country: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const { addBox } = useBoxStore((state) => state);

  useEffect(() => {
    const hasError = Object.values(errorData).some((val) => val === true);
    const hasEmpty = Object.values(formData).some((val) => val === "");
    setIsDisabled(hasError || hasEmpty);
  }, [formData, errorData]);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    checkValidation(field, value);
  }, []);

  const checkValidation = (field, value) => {
    switch (field) {
      case "receiverName":
        setErrorData((prev) => ({
          ...prev,
          receiverName: value.trim() === "",
        }));
        break;
      case "weight":
        setErrorData((prev) => ({ ...prev, weight: Number(value) <= 0 }));
        break;
      case "color":
        setErrorData((prev) => ({
          ...prev,
          color: !/^#([0-9A-F]{3}){1,2}$/i.test(value),
        }));
        break;
      case "country":
        setErrorData((prev) => ({ ...prev, country: value === "" }));
        break;
      default:
        break;
    }
  };

  const handleBlurChange = (field, value)=> {
    checkValidation(field, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = COUNTRIES.find(
      (obj) => Object.keys(obj)[0] === formData.country,
    );
    const rate = selected ? Object.values(selected)[0] : 0;

    const newFormData = {
      ...formData,
      cost: rate,
      color: hexToRgb(formData.color),
    };

    addBox(newFormData);
    setFormData({
      receiverName: "",
      weight: "",
      color: "#fff",
      country: "",
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "20px" }}>
      <p style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}>
        Calculate Shipping Cost
      </p>

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            required
            label="Receiver Name"
            variant="outlined"
            error={errorData.receiverName}
            value={formData.receiverName}
            onChange={(e) => handleChange("receiverName", e.target.value)}
            onBlur={(e)=> handleBlurChange("receiverName", e.target.value)}
          />
          {errorData.receiverName && (
            <p style={{ color: "red" }}>There's some error in name</p>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            required
            error={errorData.weight}
            label="Weight (kg)"
            variant="outlined"
            type="number"
            value={formData.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            onBlur={(e)=> handleBlurChange("weight", e.target.value)}
          />
          {errorData.weight && (
            <p style={{ color: "red" }}>There's some error in weight</p>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <TextField
            required
            label="Color (Hex)"
            error={errorData.color}
            variant="outlined"
            value={formData.color}
            onChange={(e) => handleChange("color", e.target.value)}
            onBlur={(e)=> handleBlurChange("color", e.target.value)}
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
          />
          {errorData.color && (
            <p style={{ color: "red" }}>There's some error in color</p>
          )}
          <Link style={{marginTop:'5px'}} to={'https://htmlcolorcodes.com/'} target="_blank">Check some colors from here 😉</Link>
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel id="country-select-label">Country</InputLabel>
          <Select
            required
            error={errorData.country}
            labelId="country-select-label"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            onBlur={(e)=> handleBlurChange("country", e.target.value)}
          >
            {COUNTRIES.map((obj) => {
              const [country, value] = Object.entries(obj)[0];
              return (
                <MenuItem key={country} value={country}>
                  {country} – {value}
                </MenuItem>
              );
            })}
          </Select>
          {errorData.country && (
            <p style={{ color: "red" }}>There's some error in countries</p>
          )}
        </FormControl>

        <Button
          disabled={isDisabled}
          fullWidth
          type="submit"
          variant="contained"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default FormView;
