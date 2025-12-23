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
