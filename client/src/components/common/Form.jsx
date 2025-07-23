import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map(({ name, label, placeholder, componentType, type, options }) => (
          <div key={name} className="flex flex-col">
            <Label htmlFor={name} className="mb-1">
              {label}
            </Label>

            {componentType === "select" ? (
              <Select
                value={formData[name] || ""}
                onValueChange={(val) => handleChange(name, val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder || label} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map(({ id, label: optLabel }) => (
                    <SelectItem key={id} value={id}>
                      {optLabel}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : componentType === "textarea" ? (
              <Textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            ) : (
              <Input
                id={name}
                name={name}
                type={type || "text"}
                placeholder={placeholder}
                value={formData[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
