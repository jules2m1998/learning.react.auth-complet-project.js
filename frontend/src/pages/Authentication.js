import { json, redirect } from "react-router-dom/dist";

import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup")
    throw json({ message: "Unsupported mode." }, { status: 422 });

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 422 || response.status === 401) return response;
  if (!response.ok)
    throw json({ message: "Could not authenticate error" }, { status: 500 });

  const resData = await response.json();
  const token = resData.token;
  if (token) localStorage.setItem("token", token);
  return redirect("/");
}
