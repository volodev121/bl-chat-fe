"use client"; // This is a client component 👈🏽

import useStyles from "./components/styles.tsx";
import { useState } from "react";
import ToolTip from "./components/toolTip.tsx";
import { useEffect } from "react";
import { getToken } from "./utils/authorization.tsx";
import { getConfig } from "./utils/authorization.tsx";
import ChatWidget from "./components/chatWidget.tsx";
import { createRoot } from "react-dom/client";
import React from "react";

export default function App() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const styles = useStyles();
  const config = {
    logo_url: "",
  };

  const [hasConfig, setHasConfig] = useState(false);
  const [fetchedConfig, setFetchedConfig] = useState<any>(config);

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
    <div className={styles.chatWidget}>
      {
        // tooltip
      }
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
        //chat widget
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
    </div>
  );
}

// make the component available for the window
const navDomNode = document.querySelector("#bl-chat-widget-bubble-button");
if (navDomNode != null) {
  const navRoot = createRoot(navDomNode);
  navRoot.render(React.createElement(App, {}));
}
