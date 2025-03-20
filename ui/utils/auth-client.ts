import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { customSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
	plugins: [
		expoClient({
			scheme: "babyblooms",
			storagePrefix: "babyblooms",
			storage: SecureStore,
		}),
	],
});
