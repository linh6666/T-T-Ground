
import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter"; // Đảm bảo đã khai báo REGISTER

export async function registerUser(
  
  full_name: string,
  email: string,
    phone:string,
  password: string,

) {
  const payload = {
    
    full_name,
     email,
    phone,
    password,
    
 
  };

  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  const data = await res.json();
  return data;
}
