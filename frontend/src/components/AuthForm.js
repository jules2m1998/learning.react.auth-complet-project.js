import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { useMemo } from "react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const data = useActionData();
  const navigation = useNavigation();
  const isLogin = useMemo(() => {
    return searchParams.get("mode") === "login";
  }, [searchParams]);
  const mode = useMemo(() => {
    return `?mode=${isLogin ? "signup" : "login"}`;
  }, [isLogin]);

  const displayError = useMemo(() => {
    if (!data) return null;
    const { errors, message } = data;
    const errAr = Object.entries(errors);
    return (
      <>
        {message && <h2 style={{ color: "red" }}>{message}</h2>}
        {errAr && errAr.length && (
          <ul>
            {errAr.map(([key, value]) => (
              <li style={{ color: "red" }} key={key}>
                {value}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }, [data]);
  const isSubmitting = useMemo(
    () => navigation.state === "submitting",
    [navigation.state]
  );

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {displayError}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            autoComplete=""
          />
        </p>
        <div className={classes.actions}>
          <Link to={mode} disabled={navigation.state === "submitting"}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
