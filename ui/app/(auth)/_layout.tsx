import React, { createContext, useContext } from "react";
import { Stack } from "expo-router";
import { authClient, Session } from "@/utils/auth-client";
import LoadingComponent from "@/components/ui/Loading";

// Define the type for our context
export type AuthContextType = {
  session: Session | null;
  isPending: boolean;
};

// Create the context
export const AuthContext = createContext<AuthContextType>({
  session: null,
  isPending: true,
});

// Create a custom hook to use this context
export const useAuth = () => useContext(AuthContext);

const AuthLayout = () => {
  const { data: sessionResp, isPending } = authClient.useSession();

  // Prepare user data from session
  const session = sessionResp;

  // Show loading indicator while session is being fetched
  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <AuthContext.Provider value={{ session, isPending }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};

export default AuthLayout;
