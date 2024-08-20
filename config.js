const config = {
    RPC: 'https://neon-proxy-mainnet.solana.p2p.org',
    //RPC: 'https://neon-mainnet.everstake.one/',
    CHAIN_ID: 245022934,
    TOKENS: {
        ADDRESSES: {
            WNEON: '0x202C35e517Fa803B537565c40F0a6965D7204609',
            WSOL: '0x5f38248f339bf4e84a2caf4e4c0552862dc9f82a',
            USDC: '0xEA6B04272f9f62F997F666F07D3a974134f7FFb9'
        }
    },
    VIBR: {
        ADDRESSES: {
            SWAP: '0x04830cfced9772b8acbaf76cfc7a630ad82c9148',
            QUOTER: '0x2C6Df0fDbCE9D2Ded2B52A117126F2Dc991f770f'
        },
        ABIs: {
            SWAP: [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_weth","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenX","type":"address"},{"internalType":"address","name":"tokenY","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"}],"name":"pool","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"uint256","name":"minAcquired","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapAmountParams","name":"params","type":"tuple"}],"name":"swapAmount","outputs":[{"internalType":"uint256","name":"cost","type":"uint256"},{"internalType":"uint256","name":"acquire","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"desire","type":"uint128"},{"internalType":"uint256","name":"maxPayed","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapDesireParams","name":"params","type":"tuple"}],"name":"swapDesire","outputs":[{"internalType":"uint256","name":"cost","type":"uint256"},{"internalType":"uint256","name":"acquire","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenX","type":"address"},{"internalType":"address","name":"tokenY","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"boundaryPt","type":"int24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"uint256","name":"maxPayed","type":"uint256"},{"internalType":"uint256","name":"minAcquired","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapParams","name":"swapParams","type":"tuple"}],"name":"swapX2Y","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swapX2YCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenX","type":"address"},{"internalType":"address","name":"tokenY","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"boundaryPt","type":"int24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"uint256","name":"maxPayed","type":"uint256"},{"internalType":"uint256","name":"minAcquired","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapParams","name":"swapParams","type":"tuple"}],"name":"swapX2YDesireY","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenX","type":"address"},{"internalType":"address","name":"tokenY","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"boundaryPt","type":"int24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"uint256","name":"maxPayed","type":"uint256"},{"internalType":"uint256","name":"minAcquired","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapParams","name":"swapParams","type":"tuple"}],"name":"swapY2X","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"},{"internalType":"uint256","name":"y","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swapY2XCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenX","type":"address"},{"internalType":"address","name":"tokenY","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"boundaryPt","type":"int24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint128","name":"amount","type":"uint128"},{"internalType":"uint256","name":"maxPayed","type":"uint256"},{"internalType":"uint256","name":"minAcquired","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"internalType":"struct Swap.SwapParams","name":"swapParams","type":"tuple"}],"name":"swapY2XDesireX","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"minAmount","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]
        }
    }
};
  
module.exports = { config };
  