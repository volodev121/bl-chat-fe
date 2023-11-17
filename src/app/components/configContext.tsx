import { createContext } from 'react';
import { mockConfig } from "../utils/mocks.tsx"

const ConfigContext = createContext(mockConfig);

export default ConfigContext;

