// This is the data you expect back from your backend after a successful login
// or when fetching the current user. Adjust properties as needed.
export interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user properties, like roles
}

// Payload for the POST /Auth/Register endpoint
export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
}

// Payload for the POST /Auth/Login endpoint
export interface LoginPayload {
  username: string;
  password: string;
}
