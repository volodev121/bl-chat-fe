"use client"; // This is a client component 👈🏽

import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createRoot } from "react-dom/client";
import ToolTip from "./components/toolTip.tsx";
import { getToken } from "./utils/authorization.tsx";
import { getConfig } from "./utils/authorization.tsx";
import ChatWidget from "./components/chatWidget.tsx";

export default function App() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const config = {
    logo_url: "",
  };

  const [hasConfig, setHasConfig] = useState(false);
  const [fetchedConfig, setFetchedConfig] = useState<any>(config);
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    // ... other theme customization
  });

  useEffect(() => {
    const fetchConfig = async () => {
      const authResponse = await getToken(
        "https://llm-storage.brandslisten.com/api/v1/auth/",
        {}
      );

      if (authResponse.status === 200) {
        const headers = {
          headers: {
            Authorization: authResponse.data.auth_token,
          },
        };

        const configResponse = await getConfig(
          "https://llm-storage.brandslisten.com/config",
          {},
          headers
        );
        if (configResponse.status === 200) {
          setFetchedConfig(configResponse.data);
          setHasConfig(true);
        } else {
          console.error("Failed to fetch config:", configResponse.data);
        }
      } else {
        console.error("Failed to authenticate:", authResponse.data);
      }
    };

    fetchConfig();
  }, []);

  // don't show the chat widget until we have the config
  if (!hasConfig) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      {showToolTip ? (
        <ToolTip
          setShowChatWidget={setShowChatWidget}
          setShowToolTip={setShowToolTip}
          config={fetchedConfig}
        />
      ) : (
        <></>
      )}
      {
        showChatWidget ? (
          <ChatWidget
            setShowChatWidget={setShowChatWidget}
            setShowToolTip={setShowToolTip}
            config={fetchedConfig}
          />
        ) : (
          <></>
        )
      }
    </ThemeProvider>
  );
}

// make the component available for the window
if (document != null) {
  const navDomNode = document.querySelector("#bl-chat-widget-bubble-button");
  if (navDomNode != null) {
    const navRoot = createRoot(navDomNode);
    navRoot.render(<App />);
  }
}
