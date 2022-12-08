import { AnySchema } from "yup";
import Lazy from "yup/lib/Lazy";

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;
export type SchemaShape<T extends object> = PartialRecord<
  keyof T,
  AnySchema | Lazy<AnySchema>
>;
