export type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  selected: string;
  background?: string
};

export default function Select({ options, selected, background, ...rest }: SelectProps) {
  return (
    <select {...rest} defaultValue={selected} style={{background}}>
      <option key={"value"} value={""}>
        Not set
      </option>
      {options.map(({ label, value }) => (
        <option key={value} value={value} selected={value === selected}>
          {label}
        </option>
      ))}
    </select>
  );
}
