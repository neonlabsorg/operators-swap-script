# NEON -> SOL swap at [Vibr](https://vibr.finance/trade/swap)

### Commands
- Rename `.env.example` to `.env` and place valid EVM private key
- Run in the terminal `npm i` to download the required script packages
- To perform a swap run in the terminal `node swap.js <AMOUNT_PERCENTAGE> <SLIPPAGE_PERCENTAGE>`. Placing `<AMOUNT_PERCENTAGE>` is required, for example if you set value of 100 then 100% of your NEON balance will be used as swap input amount. `<SLIPPAGE_PERCENTAGE>` is not required, if you don't define it then the slippage used in the swap will be 0.05%. Sample command performing a swap with 100% of the NEON balance inside the wallet with 10% slippage:
```
node swap.js 100 10
```