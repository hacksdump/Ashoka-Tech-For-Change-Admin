import { ATTEMPT_LOGIN, ATTEMPT_LOGOUT, FETCH_COMPLAINTS, CLEAR_COMPLAINTS } from "constants/action-types";

export function attemptLogin(payload) {
  return { type: ATTEMPT_LOGIN, payload }
}

export function attemptLogout() {
  return { type: ATTEMPT_LOGOUT }
}

export function fetchComplaints() {
  return { type: FETCH_COMPLAINTS }
}

export function clearComplaints() {
  return { type: CLEAR_COMPLAINTS }
}
