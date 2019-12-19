import { ATTEMPT_LOGIN } from "constants/action-types";

export function attemptLogin(payload) {
  return { type: ATTEMPT_LOGIN, payload }
}
