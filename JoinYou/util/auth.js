import axios from "axios";

const API_KEY = "AIzaSyAwHLovveAci3BMdA1Pkq1YsUhe-74pYX0";

export async function createUser(email, password) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
}
