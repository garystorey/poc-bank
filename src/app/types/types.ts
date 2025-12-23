import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface Feature {
    icon: string;
    title: string;
    description: string;
}
export interface Service {
    title: string;
    description: string;
}

export interface Testimonial {
    name: string;
    position: string;
    feedback: string;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type ErrorSummaryMessage =
  | string
  | Record<string, string>
  | ((errors: ValidationErrors | null, control: AbstractControl) => string);

export type ErrorSummaryMessages = Record<string, ErrorSummaryMessage>;

export type ErrorItem = {
  path: string;
  message: string;
  anchorId: string; // used to link/focus the field; defaults to path
};
