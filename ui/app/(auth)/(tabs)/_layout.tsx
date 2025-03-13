import React from "react";
import {Tabs} from "expo-router";

const TabsLayout = () => {  
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                display: "none",
            },
        }}
        >
            <Tabs.Screen name="index" options={{ title: "Home" }} />
            <Tabs.Screen name="jurnal" options={{ title: "Settings" }} />
        </Tabs>
    );
};

export default TabsLayout;
