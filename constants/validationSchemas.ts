import { string, object, array } from "yup";

export const noticeboardSchema = object().shape({
  title: string().required(),
  description: string().required(),
  multimedias: array().of(string()),
  documents: array().of(string()),
});
