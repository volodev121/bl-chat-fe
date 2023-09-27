import Image from 'next/image'
import useStyles from './components/styles.tsx'
import { useState } from 'react'
import ToolTip from './components/toolTip.tsx'

export default function App() {
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const styles = useStyles();
  const config = {
    logo_url: ''
  }

  return (
    <div className={styles.chatWidget}>
      {showToolTip ? ( <ToolTip setShowChatWidget={setShowChatWidget} setShowToolTip={setShowToolTip} config={config}/> ) }
    </div>
  )
}
