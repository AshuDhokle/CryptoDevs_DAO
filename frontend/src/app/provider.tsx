'use client'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import React from 'react';

export const config = getDefaultConfig({
    appName: 'Suprabhat_Mitro',
    projectId: process.env.APP_ID || 'ff442c27a8135c24e931212895c19453' ,
    chains: [sepolia],
    ssr: true, 
  });

export const queryClient = new QueryClient();

export default function({children}:{children : React.ReactNode}) {
    return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    );
  };  