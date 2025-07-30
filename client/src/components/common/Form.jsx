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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-col gap-4">
        {formControls.map(
          ({ name, label, placeholder, componentType, type, options }) => (
            <div key={name} className="flex flex-col gap-1">
              <Label htmlFor={name} className="font-medium text-sm text-gray-700">
                {label}
              </Label>

              {componentType === "select" ? (
                <Select
                  value={formData[name] || ""}
                  onValueChange={(val) => handleChange(name, val)}
                >
                  <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none">
                    <SelectValue placeholder={placeholder || label} />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {options?.map(({ id, label: optLabel }) => (
                      <SelectItem
                        key={id}
                        value={id}
                        className="cursor-pointer hover:bg-gray-100"
                      >
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
                  className="bg-white border border-gray-300 rounded-md p-2"
                />
              ) : (
                <Input
                  id={name}
                  name={name}
                  type={type || "text"}
                  placeholder={placeholder}
                  value={formData[name] || ""}
                  onChange={(e) => handleChange(name, e.target.value)}
                  className="bg-white border border-gray-300 rounded-md p-2"
                />
              )}
            </div>
          )
        )}
      </div>

      <Button
        disabled={isBtnDisabled}
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary/90 bg-black transition-all"
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
