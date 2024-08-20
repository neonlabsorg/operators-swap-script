const { Web3 } = require('web3');
const { isAddress } = require('web3-validator');
require("dotenv").config();
const { config } = require("./config");
const { BigNumber } = require("bignumber.js");
const { amount2Decimal, fetchToken, getErc20TokenContract } = require("iziswap-sdk/lib/base/token/token");
const { getQuoterContract, quoterSwapChainWithExactInput } = require("iziswap-sdk/lib/quoter/funcs");

const web3 = new Web3(config.RPC);
const SIGNER = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY_OWNER);

// script args
const args = process.argv.slice(2);
let amountPercentage = (args[0] > 100) ? 100 : args[0];
if (!amountPercentage) {
    return console.log('Please specify NEON amount to be swapped against WSOL. Value is in percentages and should be between 0.01 and 100 ( from 1% and 100% ).');
}
const receiver = (args[1] != undefined && isAddress(args[1])) ? args[1] : SIGNER[0].address;
let slippage = (args[2] != undefined) ? 1 - (args[2] / 100) : 0.995; // default slippage is 0.05%
if (slippage < 0) {
    slippage = 0;
}

console.log('Percentage of the total balance to be swapped:', amountPercentage, '%');
console.log('Receiver of SOL tokens:', receiver);
console.log('Swap slippage:', (100 - (100 * slippage)).toFixed(2), '%');

const QUOTER = getQuoterContract(config.VIBR.ADDRESSES.QUOTER, web3);
const SWAP = new web3.eth.Contract(
    config.VIBR.ABIs.SWAP,
    config.VIBR.ADDRESSES.SWAP
);

async function swap() {
    const blockNumber = await web3.eth.getBlockNumber();
    const timestamp = (await web3.eth.getBlock(blockNumber)).timestamp;

    const swapDeadline = (new BigNumber(timestamp).plus(new BigNumber(1800))).toFixed(0); // 30 minutes deadline
    const swapPath = web3.utils.encodePacked(
        {value: config.TOKENS.ADDRESSES.WNEON, type: 'address'},
        {value: 3000, type: 'uint24'},
        {value: config.TOKENS.ADDRESSES.USDC, type: 'address'},
        {value: 3000, type: 'uint24'},
        {value: config.TOKENS.ADDRESSES.WSOL, type: 'address'}
    );

    // estimating how much would the swap cost with some dummy data
    const swapGasEstimation = await SWAP.methods.swapAmount(
        {
            path: swapPath,
            recipient: receiver,
            amount: web3.utils.toWei(1, 'ether'), // 1 NEON
            minAcquired: 0,
            deadline: swapDeadline
        }
    ).estimateGas({
        from: SIGNER[0].address,
        to: config.VIBR.ADDRESSES.SWAP,
        value: web3.utils.toWei(1, 'ether') // 1 NEON
    });

    // calculate the swap input amount without the swap fee multiplited by the amountPercentage
    const currentGasPrice = await web3.eth.getGasPrice();
    const feeForSwapInWei = new BigNumber(swapGasEstimation).times(new BigNumber(currentGasPrice));
    const balanceMinusSwapFee = new BigNumber(await web3.eth.getBalance(SIGNER[0].address)).minus(feeForSwapInWei);
    const swapAmount = (amountPercentage == 100) ? Number(balanceMinusSwapFee) : (Number(balanceMinusSwapFee) * amountPercentage) / 100;

    const WNEON = await fetchToken(config.TOKENS.ADDRESSES.WNEON, config.CHAIN_ID, web3);
    const USDC = await fetchToken(config.TOKENS.ADDRESSES.USDC, config.CHAIN_ID, web3);
    const WSOL = await fetchToken(config.TOKENS.ADDRESSES.WSOL, config.CHAIN_ID, web3);

    console.log('NEON amount to be swapped: ', swapAmount / 10 ** WNEON.decimal);

    // calculate the swap output
    const {outputAmount} = await quoterSwapChainWithExactInput(QUOTER, {
        tokenChain: [WNEON, USDC, WSOL],
        feeChain: [3000, 3000],
        inputAmount: swapAmount
    });
    console.log('Estimated SOL amount to be received out of the swap: ', outputAmount / 10 ** WSOL.decimal);

    const swapTxData = SWAP.methods.swapAmount(
        {
            path: swapPath,
            recipient: receiver,
            amount: swapAmount,
            minAcquired: (outputAmount * slippage).toFixed(0),
            deadline: swapDeadline
        }
    ).encodeABI();

    await web3.eth.sendTransaction({
        from: SIGNER[0].address,
        to: config.VIBR.ADDRESSES.SWAP,
        value: swapAmount,
        type: BigInt(0),
        data: swapTxData,
        gas: swapGasEstimation
    })
    .on('transactionHash', async (hash) => {
        console.log(hash, 'swap hash');
        process.exit();
    });
}
swap();