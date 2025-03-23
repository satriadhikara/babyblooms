import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

// const getBaseUrl = () => {
// 	if (Platform.OS === "android") {
// 		return "http://10.0.2.2:3000";
// 	}
// 	return "http://localhost:3000";
// };

export const authClient = createAuthClient({
  baseURL: "http://babyblooms-api-mhtx1y-ea3f25-91-108-110-101.traefik.me",
  plugins: [
    expoClient({
      scheme: "babyblooms",
      storagePrefix: "babyblooms",
      storage: SecureStore,
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;
