# NEON -> SOL swap at [Vibr](https://vibr.finance/trade/swap)

### Commands
- Rename `.env.example` to `.env` and place valid EVM private key with a valid Neon EVM RPC endpoint
- Run in the terminal `npm i` to download the required script packages
- To perform a swap run in the terminal `node swap.js <AMOUNT_PERCENTAGE> <RECEIVER> <SLIPPAGE_PERCENTAGE>`. Parameters details:
    - `<AMOUNT_PERCENTAGE>` is required, this is the percentage of the total address balance that will be used as the swap input value. For example if you set value of 100 then 100% of the address's NEON balance will be used for the swap logic.
    - `<RECEIVER>` is optional, this parameter can be used if the receiver of the SOL swap has to be different than the swap initiator. If an invalid address is being passed then the script fallback to use the swap initiator as the swap output receiver. If this parameter is not being passed then again the swap initiator is being used as the swap output receiver.
    - `<SLIPPAGE_PERCENTAGE>` is optional, if you don't define it then the slippage used in the swap will be 0.05%. 
    
Sample command performing a swap with 100% of the NEON balance inside the address 0xAB1c34b53F12980a4fa9043B70c864CEE6891c0C with 10% slippage:

    node swap.js 100 0xAB1c34b53F12980a4fa9043B70c864CEE6891c0C 10
    