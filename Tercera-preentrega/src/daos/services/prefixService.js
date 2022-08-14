import { get } from "axios";

export default async function prefixService() {
   
  const response = await get(
    "https://api-prefixes.herokuapp.com/api/prefixes"
  );
  const result = response.data;
  console.log(result);
  return result.prefix;
};
