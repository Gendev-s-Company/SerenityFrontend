import { CallMethod } from "@/types/enums";

const basePath = "http://localhost:8000/api";


const apiCall = async<T>(path: string, body?: unknown, method = CallMethod.get): Promise<T> => {
  const config: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  };
  if (body !== undefined && method !== CallMethod.get) {
    config.body = JSON.stringify(body);
  }

  const uri = basePath + path;
  console.log(uri);
  const response = await fetch(uri, config);
  if (!response.ok)
    throw new Error(` ${await response.text()}`);

  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    return text as unknown as T;
  }


};

export const getCall = async<T>(path: string): Promise<T> => {
  return await apiCall(path, undefined, CallMethod.get)
}
export const postCall = async<T>(path: string, body: unknown): Promise<T> => {
  return await apiCall(path, body, CallMethod.post)
}

export const putCall = async<T>(path: string, body: unknown): Promise<T> => {
  return await apiCall(path, body, CallMethod.put)
}
export const deleteCall = async<T>(path: string): Promise<T> => {
  return await apiCall(path, undefined, CallMethod.delete)
}


export const apiCallImage = async<T>(path: string, body?: unknown, method = CallMethod.get): Promise<T> => {
  const config: RequestInit = {
    method: method
  };
  if (body !== undefined && method !== CallMethod.get) {
    config.body = body as FormData;
  }

  const uri = basePath + path;
  console.log(uri);
  const response = await fetch(uri, config);
  if (!response.ok)
    throw new Error(` ${await response.text()}`);

  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch (err) {
    return text as unknown as T;
  }
  
};

export const postCallImage = async<T>(path: string, body: unknown): Promise<T> => {
  return await apiCallImage(path, body, CallMethod.post)
}