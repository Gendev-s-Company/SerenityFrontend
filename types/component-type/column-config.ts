// types.ts
type ColumnType = 'text' | 'button' | 'link' | 'actions' | 'checkbox' | 'amount'|'date'|'datetime';

interface CurrencyType {
    currency: string,
    lang: string
}
export interface ColumnConfig<T> {
  key: string;        
  header: string;       
  type?: ColumnType;    
  amountType?: CurrencyType,
  hiding?: boolean,
  sorting?: boolean,
  onClick?: (data: T) => void;
  onDelete?: (data:T)=>void;
  onUpdate?:(data:T)=>void;
  href?: (data: T) => string; 
}