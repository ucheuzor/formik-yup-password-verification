import React from "react";
import ReactDOM from "react-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import "./styles.css";

const Schema = Yup.object().shape({
  password: Yup.string().required("This field is required"),
  changepassword: Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    )
  })
});

function App() {
  return (
    <Formik
      initialValues={{
        password: "",
        changepassword: ""
      }}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => {
        return (
          <form onSubmit={handleSubmit}>
            <label for="passowrd">Password</label>
            <input
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
            <span class="error" style={{ color: "red" }}>
              {errors.password}
            </span>

            <label for="passowrd">Confirm Password</label>
            <input
              type="password"
              name="changepassword"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.changepassword}
            />
            <span class="error" style={{ color: "red" }}>
              {errors.changepassword}
            </span>
          </form>
        );
      }}
    </Formik>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
