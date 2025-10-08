import * as React from "react"
import { ControllerRenderProps } from "react-hook-form"
import { useFormContext } from "react-hook-form"

const FormFieldContext = React.createContext<ControllerRenderProps | null>(null)

function useFormField() {
  const context = React.useContext(FormFieldContext)
  if (!context) {
    throw new Error("useFormField must be used within a <FormField />")
  }
  return context
}

export {
  FormFieldContext,
  useFormField,
}