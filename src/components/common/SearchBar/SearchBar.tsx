import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) => {
  return (
    <Search
      size="large"
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      onSearch={value => onChange(value)}
      allowClear
      style={{ margin: '8px 0' }}
    />
  );
};
