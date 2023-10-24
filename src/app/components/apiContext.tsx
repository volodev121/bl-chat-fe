import { createContext } from 'react';
import { mockApiClient } from "../utils/mocks.tsx"

const ApiClientContext = createContext(mockApiClient);

export default ApiClientContext;
