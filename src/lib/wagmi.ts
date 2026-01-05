import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Test Blog',
  projectId: '64997d22a31ba28f00a58cd2c9aa0a16', 
  chains: [sepolia],
  ssr: true, 
});



// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
// import { http } from 'wagmi';
// import { mainnet, sepolia } from 'wagmi/chains';
// export const config = getDefaultConfig({
//   appName: 'Test Blog',
//   projectId: '64997d22a31ba28f00a58cd2c9aa0a16',
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http('https://eth-mainnet.g.alchemy.com/v2/...'),
//     [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
//   },
// });
 