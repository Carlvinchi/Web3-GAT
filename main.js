import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";

import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

const ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "AntiWhaling",
        type: "uint256",
      },
    ],
    name: "AntiWhale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "LiquidityAmount",
        type: "uint256",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "Contributed",
        type: "uint256",
      },
    ],
    name: "MiningPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "Issued",
        type: "uint256",
      },
    ],
    name: "Minted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "AccumFlush",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "AccumulatedBonus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "MineOperatorAddress", type: "address" },
      { internalType: "string", name: "Email_", type: "string" },
      { internalType: "uint256", name: "Calibrate", type: "uint256" },
      { internalType: "uint256", name: "SeasonGen", type: "uint256" },
      { internalType: "address", name: "MinerAddress", type: "address" },
      { internalType: "uint256", name: "Rounds", type: "uint256" },
    ],
    name: "AddPresaleMiner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Arrear",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Caliber",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CalibratedCoins",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "CountFor",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "DirectRefferal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Dollartransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Email",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "FlushCal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MentorBonus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MineMax",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MineMin",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MiningBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MiningMentorOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MiningNetwork",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MiningPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MiningRounds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "MonthEnd",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "NetworkRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Now",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "RegisteredMiners",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "Season",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "SellAlready",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "rVolume", type: "uint256" }],
    name: "SoftwareAddCalibrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "rVolume", type: "uint256" }],
    name: "SoftwareCalibrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "MineOperatorAddress", type: "address" },
      { internalType: "string", name: "Email_", type: "string" },
    ],
    name: "SoftwareJoin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "rAmount", type: "uint256" }],
    name: "SoftwareStartMining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "SoftwareWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "SubscribeMechant",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "TotalMentorBonus",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "WithdrawalBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "Xamout",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "Z_Consfiscate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_CowryAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_DevTeam",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_LiquiditypairAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_TotalMinedCoins",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_TreasuryVault",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_wallet", type: "address" },
      { internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "addAllowedWallet",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_adminUser", type: "address" },
      { internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "addContractAdmin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "Owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "allowedWallet",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_from", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokens", type: "uint256" }],
    name: "buyToken",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "contractAdmin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "account", type: "address" },
      { internalType: "bool", name: "ExcludeStatus", type: "bool" },
    ],
    name: "excludeFromFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "finishAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "gatspersecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCirculatingSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openTrade",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pivateSaleIsOpen",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "privateLimitWallet",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "pvR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "recallOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
    ],
    name: "rescueBEP20Tokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "PV1", type: "uint256" },
      { internalType: "uint256", name: "PV2", type: "uint256" },
      { internalType: "uint256", name: "PV3", type: "uint256" },
      { internalType: "uint256", name: "PV4", type: "uint256" },
      { internalType: "uint256", name: "PV5", type: "uint256" },
      { internalType: "uint256", name: "PV6", type: "uint256" },
      { internalType: "uint256", name: "PV7", type: "uint256" },
      { internalType: "uint256", name: "PV8", type: "uint256" },
      { internalType: "uint256", name: "PV9", type: "uint256" },
      { internalType: "uint256", name: "PV10", type: "uint256" },
    ],
    name: "setDVariable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "DevAddress", type: "address" }],
    name: "setDevWalletAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "PV21", type: "uint256" },
      { internalType: "uint256", name: "PV22", type: "uint256" },
      { internalType: "uint256", name: "PV23", type: "uint256" },
      { internalType: "uint256", name: "PV24", type: "uint256" },
      { internalType: "uint256", name: "PV25", type: "uint256" },
      { internalType: "uint256", name: "PV26", type: "uint256" },
      { internalType: "uint256", name: "PV27", type: "uint256" },
      { internalType: "uint256", name: "PV28", type: "uint256" },
      { internalType: "uint256", name: "PV29", type: "uint256" },
      { internalType: "uint256", name: "PV30", type: "uint256" },
    ],
    name: "setLVariable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "CowryAddress", type: "address" },
      { internalType: "address", name: "LiquidityAddress", type: "address" },
    ],
    name: "setLiquidityWalletAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "isOpen", type: "bool" }],
    name: "setPrivateSaleStatus",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_usdt", type: "address" }],
    name: "setUSDTaddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "PV11", type: "uint256" },
      { internalType: "uint256", name: "PV12", type: "uint256" },
      { internalType: "uint256", name: "PV13", type: "uint256" },
      { internalType: "uint256", name: "PV14", type: "uint256" },
      { internalType: "uint256", name: "PV15", type: "uint256" },
      { internalType: "uint256", name: "PV16", type: "uint256" },
      { internalType: "uint256", name: "PV17", type: "uint256" },
      { internalType: "uint256", name: "PV18", type: "uint256" },
      { internalType: "uint256", name: "PV19", type: "uint256" },
      { internalType: "uint256", name: "PV20", type: "uint256" },
    ],
    name: "setVariable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "startAt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Nuggets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeIsOpen",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  /*{
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "TokentransferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },*/
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "yearEnd",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const CONTRACT_ADDRESS = "0xab9Fb9c5E6EB10826E8513AbB3A8fafa30699152"; 
const USDTCONTRACT_ADDRESS = "0x4fa5f3A2fBA6bd7271a8Cf983bA04476818376Ac"; 
const {
  configureChains,
  createConfig,
  getAccount,
  readContract,
  prepareWriteContract,
  writeContract,
} = WagmiCore;
const { bscTestnet } = WagmiCoreChains;
const chains = [bscTestnet];
const projectId = ""; // Wallet Connect Project ID
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);
const web3modal = new Web3Modal({ projectId }, ethereumClient);

let account = null;


const e = 1000000000000000000;

var capital = 0; // Will be set by user input

var currentSeconds = 0;
var result = 0;
var MinCapital = 0;
var MaxCapital = 0;
var miningInProgress = false;

var withdrawalBalance = 0;
var SoliditysecondsPerRound = 0;
var xAmount = 0;

var currentSeconds = 0;

const minimumGAT = 0.000001;

const maximumGAT = 500;

var ExpectedMiningReturn = 0;
var ApproximateNuggets = 0;
var miningDuration = 0;
var GATUSDT = 0;

var finishingtime = 0; // 60s 60m 24hr 25day 100rate
var WorkDone = 0;

const disconnectCheckbox = document.getElementById("disconnectCheckbox");

const disconnectLabel = document.getElementById("disconnectLabel");

disconnectCheckbox.addEventListener("change", () => {
  var disconnectLabel = document.getElementById("disconnectLabel");
  if (disconnectCheckbox.checked) {
    disconnectLabel.textContent = "CONNECTED";
  } else {
    disconnectLabel.textContent = "CONNECT";
  }
});

// Listener for connecting your wallet
document
  .getElementById("disconnectCheckbox")
  .addEventListener("click", async () => {
    let checkBox = document.getElementById("disconnectCheckbox");
    if (checkBox.checked) {
      await web3modal.openModal();
      account = await getAccount();

      if (account != null) {
        alert("Welcome to our revolutionary Global Access Token mining/Staking protocol, kindly wait while the system fetch your information, this may take a few seconds");
        //document.getElementById("walletAddress").value = account.address;

        const res = await getSupply();

        document.getElementById("totalSupply").value = (
          Number(BigInt(res.totalSupply)) / e
        ).toFixed(8);

        document.getElementById("circulation").value = (
          Number(BigInt(res.circulate)) / e
        ).toFixed(8);
        document.getElementById("Gatminingtotal").value = (
          Number(BigInt(res.totalMinedCoins)) / e
        ).toFixed(12);
        document.getElementById("USDpriceGAT").textContent = (
          Number(BigInt(res.gatPrice)) / e
        ).toFixed(2);

        document.getElementById("ApproximatePrice").value = (
          Number(BigInt(res.AvailableNugget)) / e
        ).toFixed(7);

        const data = await getMinMax(account.address);

        document.getElementById("Generation").textContent = data.season;
        document.getElementById("MinMine").value = (
          Number(BigInt(data.min)) / e
        ).toFixed(7);
        document.getElementById("MaxMine").value = (
          Number(BigInt(data.max)) / e
        ).toFixed(6);

        document.getElementById("refBonus").textContent = (
          Number(BigInt(data.mentBonus)) / e
        ).toFixed(10) + " GAT";
        document.getElementById("MiningRounds").value =
          data.miningRound + " Mining Rounds";

        document.getElementById("ExpectedMineReturn").textContent = (
          Number(BigInt(data.withBal)) /
          e /
          100000
        ).toFixed(12) + " GAT";

        withdrawalBalance = data.withBal; 

        ExpectedMiningReturn = (Number(BigInt(data.withBal))/e/100000); //ExpectedMiningReturn

        //xAmount = (Number(BigInt(data.ConstBal))/e/100000); // xAmount 

        GATUSDT = (
          Number(BigInt(res.gatPrice)) / e
        ).toFixed(2);

        finishingtime = (Number(BigInt(data.minePeriod))*100); //ExpectedMiningReturn

        document.getElementById("user_balance").textContent = (
          Number(BigInt(data.userBalance)) / e
        ).toFixed(7) + " GAT"; // 
        
        
        document.getElementById("MiningCapital").textContent = (
          Number(BigInt(data.miningBal)) / e
        ).toFixed(10) + " GAT";

        document.getElementById("balanceofTreasury").value = (
          Number(BigInt(data.balOfAccount)) / e
        ).toFixed(12);

        document.getElementById("myNetwork").value = data.referal;

        document.getElementById("GroupNetwork").value = data.teamReferal;

        alert("Your information has been loaded successfully!");
      }
    } else {
      account = null;
      //document.getElementById("disconnectLabel").textContent = "CONNECT";
      document.getElementById("walletAddress").value = account;
    }
  });


// Listener SoftwareJoin function
document.getElementById("join").addEventListener("click", async () => {
  if (disconnectLabel.textContent === "CONNECTED") {
    alert("Please ensure that you have filled the address portion with an existing miner's address and also provide an active email from which you can verify ownership of this miner address");
    var email = document.getElementById("email").value;
    var walletAddress = document.getElementById("walletAddress").value;

    if (walletAddress !== "" && email !== "") {

      alert("You are expected to have at least $100 worth of GAT to pay for your miner permit");
      try {

        alert("You will receive a pop-up when the information you submited has been verified. This may take a few seconds, Please wait... ");
        const config = await prepareWriteContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "SoftwareJoin",
          args: [walletAddress, email],
        });
  
        const { hash } = await writeContract(config);

        if(hash != null){
  
          var myCurrentBal = await readContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "balanceOf",
            args: [walletAddress],
          });
    
          document.getElementById("user_balance").textContent = (
            Number(BigInt(myCurrentBal)) / e
          ).toFixed(7) + " GAT"; // 
          
        
          alert("Joined mining successfully!, transaction: " + hash);
          alert("Congratulations on securing a lifetime miner, you can proceed to Calibrate and Start mining. Enter 5050 and click on calibrate to see how much you can use for calibration");
        }

        
      } catch (error) {

        var err = JSON.stringify(error, null, '  ');

        err = JSON.parse(err);

        alert("Error from interacting with GAT Smart Contract: " + err.shortMessage);
        
      }

      
    } else {
      alert("Kindly provide wallet and email address");
    }
  } else {
    alert("GAT's mining requires no complex machines or software, ensuring accessibility through everyday devices like computers and phones. With a one-time cost of $100, it offers an affordable entry into the mining network, contrasting with protocols that demand high initial investments. GAT's network rewards encourage expansion, through incentives for miners who refer new participants. To join the mining network, the address of an existing miner is needed as well as an active email address. GAT mining is a cost effective and innovative approach to token staking. Join now and start mining");
  }
});

// Listener SoftwareAddCalibration function
document.getElementById("add_cal").addEventListener("click", async () => {
  if (disconnectLabel.textContent === "CONNECTED") {
    // Get the user input from the "item4-price" input field
    var userInput = document.querySelector(".item4-price").value;

    result = parseFloat(userInput);

    var currentMineMax = document.getElementById("MaxMine").value;
    alert("You are about to add calibration, NOTE: You can not add more than "+ (500 - currentMineMax/2) +" GAT");

    var result1 = result + (currentMineMax/2);

    if (result >= minimumGAT && result1 <= maximumGAT) {

      var MineMinInput = document.getElementById("MinMine");
      var MineMaxInput = document.getElementById("MaxMine");
      var addr = account.address;

      result = result * e;


      try {

        alert("You will receive a pop-up in a few seconds, please confirm to add "+ (result/e).toFixed(6)+" GAT to your existing Calibration");
        const config = await prepareWriteContract({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: "SoftwareAddCalibrate",
          args: [result],
        });
  
        const { hash } = await writeContract(config);
   

        if (hash != null) {
          const min = await readContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "MineMin",
            args: [addr],
          });
  
          const max = await readContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "MineMax",
            args: [addr],
          });
  
          var myCurrentBal = await readContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "balanceOf",
            args: [addr],
          });
    
          document.getElementById("user_balance").textContent = (
            Number(BigInt(myCurrentBal)) / e
          ).toFixed(8); // 
  
          MineMinInput.value =  (
            Number(BigInt(min)) / e
          ).toFixed(7);  
  
          MineMaxInput.value =  (
            Number(BigInt(max)) / e
          ).toFixed(7); 
  
  
  
          alert("Caliberation added successfully, please wait for your Mine Minimum and Maximum to update, check your transaction hash: "+hash);
  
        }

        
      } catch (error) {

        var err = JSON.stringify(error, null, '  ');

        err = JSON.parse(err);

        alert("Error from interacting with GAT Smart Contract: " + err.shortMessage);
        
      }


    } else {
      if (result1 > 500){
        alert("You can not add calibration such that your overall calibration will be more than 500 GAT, the maximum you can add at the moment is "+ (500 - currentMineMax/2) +" GAT");
      }
      if (result < 0.000001){
        alert("You can not add calibration less than 0.000001 GAT, Enter a value greater than 0.000001 GAT");
      }
    }

   
  } else {
    alert("Please connect before you can add to your Calibration.");
  }
});

// Listener SoftwareCaliberate function
document.getElementById("sf_caliberate").addEventListener("click", async () => {
  var userInput = document.querySelector(".item4-price").value;
  //var Code = document.querySelector(".item4-price").textContent;
  var userWalletbalance = parseFloat(document.getElementById("user_balance").textContent.split(" ")[0]);
    if (userWalletbalance != 0 && userInput == 5050) {
      alert("With a wallet balance of " +userWalletbalance.toFixed(7) + " GAT, if you want to clibrate and still mine, use a minimum of "+ (userWalletbalance/3).toFixed(7) +" GAT or a maximum of "+(userWalletbalance/2.2).toFixed(7) + " GAT");
    } else {
      if (disconnectLabel.textContent === "CONNECTED") {
    
        alert("You are about to Calibrate your software, ensure that you are qualified to mine. If you arent a miner join any of our existing miners");
        // Get the user input from the "item4-price" input field
    
        if (miningInProgress) {
          alert("Mining is already in progress. You cannot Calibrate until all your 15 rounds are completed. Try using the AddCal Option");
          return;
        }
        result = parseFloat(userInput);
    
        if (result >= 0.000001 && result <= 500) {
          var MineMinInput = document.getElementById("MinMine");
          var MineMaxInput = document.getElementById("MaxMine");
          var addr = account.address;
    
          result = result * e;
    
    
          try {
    
            alert("You will receive a pop-up, kindly confirm to complete your Calibration");
            const config = await prepareWriteContract({
              address: CONTRACT_ADDRESS,
              abi: ABI,
              functionName: "SoftwareCalibrate",
              args: [result],
            });
      
            const { hash } = await writeContract(config);
      
    
            if (hash != null) {
              const min = await readContract({
                address: CONTRACT_ADDRESS,
                abi: ABI,
                functionName: "MineMin",
                args: [addr],
              });
      
              const max = await readContract({
                address: CONTRACT_ADDRESS,
                abi: ABI,
                functionName: "MineMax",
                args: [addr],
              });
      
              var myCurrentBal = await readContract({
              address: CONTRACT_ADDRESS,
              abi: ABI,
              functionName: "balanceOf",
              args: [addr],
            });
      
            document.getElementById("user_balance").textContent = (
              Number(BigInt(myCurrentBal)) / e
            ).toFixed(8); // 
      
      
              MineMinInput.value = (
                Number(BigInt(min)) / e
              ).toFixed(7);;
      
              MineMaxInput.value = (
                Number(BigInt(max)) / e
              ).toFixed(7);;
            }
    
            alert("Caliberation was successful, transaction hash: "+hash);
            
          } catch (error) {
    
            var err = JSON.stringify(error, null, '  ');
    
            err = JSON.parse(err);
    
            alert("Error from interacting with GAT Smart Contract: " + err.shortMessage);
            
          }
    
         
        } else {
          if (result > 500){
            alert("You can not calibrate more than 500 GAT, Enter a value less than 500 GAT");
          }
          if (result < 0.000001){
            alert("You can not calibrate less than 0.000001 GAT, Enter a value greater than 0.000001 GAT");
          }
        }
    
        
      } else {
        alert("GAT calibration is a crucial step in the mining process that allows miners to customize their participation. During calibration, miners set their minimum and maximum mining capitals and establish the duration of each round. This innovative feature provides flexibility, enabling miners to take advantage of each mining season and its features as they adapt their strategy based on individual preferences and goals. The calibration mechanism enhances user control over the dynamic seasonal variations, tailoring the mining experience to meet the specific needs of each participant.");
      }

    }
});

// Listener SoftwareStartMining function
document.getElementById("sf_stmining").addEventListener("click", async () => {
  if (disconnectLabel.textContent === "CONNECTED") {
    alert("Your request to mine has been received, please wait as the system check if you are eligible to mine");
    MinCapital = document.getElementById("MinMine").value;

    MaxCapital = document.getElementById("MaxMine").value;
    var investedValue = parseFloat(
      document.getElementById("item1-price").value
    );
    if (miningInProgress) {
      alert(
        "You are already mining. You cannot start a new mining round. Please wait ..."
      );
      return;
    }

    //NewCode
    var RoundsCount = parseFloat(document.getElementById("MiningRounds").value);

    var USDprice = await readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "tokenPrice",
    });

    USDprice = Number(USDprice);
    console.log("gat price " + USDprice + " and minCapital " + MinCapital);

    var addr = account.address;
    SoliditysecondsPerRound = await readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "MiningPeriod",
      args: [addr],
    });

    //totalSeconds = Number(SoliditysecondsPerRound) * 100;

    if (!isNaN(investedValue) && investedValue > 1 / e) {
      capital = Number(investedValue);
      //NewCode
      var userWalletbalance = parseFloat(document.getElementById("user_balance").textContent);
      if ( capital > userWalletbalance) {
        alert(
          "Please check your GAT Wallet balance, your balance is "+ userWalletbalance + " GAT which is insufficient to pay for"+ capital + " GAT, you will need to top up with "+ capital - userWalletbalance + " GAT"
        );
      }
      if (MinCapital <= capital && MaxCapital >= capital) {
        investedValue = investedValue * e;
        
        try {

          alert(
            "You will receive a pop-up in a few seconds, please confirm the transaction to Start mining"
          );
          const config = await prepareWriteContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "SoftwareStartMining",
            args: [investedValue],
          });
  
          const { hash } = await writeContract(config);
  
          if(hash !=null){

            miningInProgress = true;
  
          var myCurrentBal = await readContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "balanceOf",
            args: [addr],
          });
    
          document.getElementById("user_balance").textContent = (
            Number(BigInt(myCurrentBal)) / e
          ).toFixed(8); // 
  
          alert(
            "Start mining was successful, check tranasaction here: https://testnet.bscscan.com/tx/" +
              hash
          );
  
          }
          
        } catch (error) {

          var err = JSON.stringify(error, null, '  ');

          err = JSON.parse(err);
  
          alert("Error from interacting with GAT Smart Contract: " + err.shortMessage);
          if ( RoundsCount < 1) {
            alert(
              "Please proceed to calibrate and try again, you can enter the code 5050 and then click calibrate to see how much of your balance can be used. Thank you!"
            );
          }
          
        }

        
        
      }
      else {
        if (capital> MaxCapital){
          alert(
            "You can not mine more than your maximum of " +
              MaxCapital + " GAT"
          );
        }
        if (capital < MinCapital){
          alert(
            "You can not mine more than your maximum of " +
              MinCapital + " GAT"
          );
        }
      }
    } // second if statment
    else {
      alert("Please enter a valid invested value greater than "+minimumGAT);
    }
  } // first if statment
  else {
    alert(
      "Mining GAT is a highly rewarding way to earn long-term sustainable passive income as compared to holding. The mining process do not attract the regular transaction charges but rather provides a subsidy fee paid in USDT BEP20 at the end of each mining Round, Connect to continue"
    );
  }
});

// Update Display Function: Use the Two variables, ExpectedMiningReturn and Miningduration
async function updateDisplay() {
 
    var newBalance = 0;
      var balanceSpan = document.getElementById("balance");
    //var currentBalance = parseFloat(balanceSpan.textContent.split(" ")[0]); // Get current balance

    //USDT PRICE DISPLAY
    var userWalletbalance = parseFloat(document.getElementById("user_balance").textContent.split(" ")[0]);
    document.getElementById("user_balanceUSD").textContent = "USD " + (GATUSDT * userWalletbalance).toFixed(3);
    var AmountCapital = parseFloat(document.getElementById("MiningCapital").textContent.split(" ")[0]);
    document.getElementById("MiningcapitalUSD").textContent = "USD " + (GATUSDT * AmountCapital).toFixed(3);
    var ReturnsAmount = parseFloat(document.getElementById("ExpectedMineReturn").textContent.split(" ")[0]);
    document.getElementById("ReturnsUSD").textContent = "USD " + (GATUSDT * ReturnsAmount).toFixed(3);
    var RefNetworkBonus = parseFloat(document.getElementById("refBonus").textContent.split(" ")[0]);
    document.getElementById("RefUSD").textContent = "USD " + (GATUSDT * RefNetworkBonus).toFixed(3);
      
    
    if (xAmount < ExpectedMiningReturn) {
      var currentBalance = parseFloat(balanceSpan.textContent.split(" ")[0]); // Get current balance
    }
    if (xAmount >= ExpectedMiningReturn){
      currentBalance = xAmount.toFixed(15);
    }
    if (account != null) {
        if (currentBalance < ExpectedMiningReturn) {
          //balanceSpan.textContent = xAmount.toFixed(15);
          /*if (currentBalance > ExpectedMiningReturn) {
            currentBalance = xAmount.toFixed(15);
          }*/
          newBalance = currentBalance + (ExpectedMiningReturn / finishingtime);
          if (newBalance> ExpectedMiningReturn){
            newBalance = xAmount.toFixed(15);
          }
          balanceSpan.textContent = newBalance.toFixed(15);
          balanceSpan.style.fontWeight = "bold";
          var ApproxPriceInput = document.getElementById("ApproximatePrice");
          //ApproxPriceInput.value = (ApproximateNuggets).toFixed(7) + " Usdt";
          WorkDone = currentBalance.toFixed(18);
          
          //document.querySelector("minerAnimate").setAttribute('src', "images\frzmachine.png");
          //document.getElementById("minerAnimate").alt = ("miner gif");
        } 
        if (currentBalance >= ExpectedMiningReturn) {
          //var currentBalance = parseFloat(balanceSpan.textContent.split(" ")[0]);
          if (xAmount>=ExpectedMiningReturn) {
            balanceSpan.textContent = ExpectedMiningReturn.toFixed(15);
          }
          balanceSpan.style.fontWeight = "bold";
          var ApproxPriceInput = document.getElementById("ApproximatePrice");
          //ApproxPriceInput.value = (ApproximateNuggets).toFixed(7)+ " Usdt";
          WorkDone = xAmount; //NewCode
          //document.querySelector("minerAnimate").setAttribute('src', "images\frzmachine.png");
        }
        
      }
      if (account == null) {
          var currentBalance = 0;
          balanceSpan.textContent = currentBalance.toFixed(15);
          balanceSpan.style.fontWeight = "bold";
          // NewCode
          var ApproxPriceInput = document.getElementById("ApproximatePrice");
          //ApproxPriceInput.value = (ApproximateNuggets).toFixed(7);
          document.getElementById("user_balance").textContent = (0).toFixed(7) + " GAT";
          document.getElementById("MiningCapital").textContent = (0).toFixed(10) + " GAT";
          document.getElementById("ExpectedMineReturn").textContent = (0).toFixed(12) + " GAT";
          document.getElementById("refBonus").textContent = (0).toFixed(10) + " GAT";
          document.getElementById("MiningRounds").value = 0 + " Mining Rounds";
          document.getElementById("MinMine").value = (0).toFixed(7);
          document.getElementById("MaxMine").value = (0).toFixed(6);
          document.getElementById("myNetwork").value = 0;
          document.getElementById("GroupNetwork").value = 0;
          document.getElementById("Generation").textContent = 0;
          //document.getElementById("minerAnimate").img = "images\frzmachine.png";
      } 
      

  console.log("this is updateDisplay");
  console.log(newBalance);

}


// Listener SoftwareWithdraw function
document.getElementById("withdraw").addEventListener("click", async () => {
  if (disconnectLabel.textContent === "CONNECTED") {
    alert("Your withdrawal request has been received.");
    if (miningInProgress) {
      alert("You can only withdraw after mining is completed. Please try again when the current mining is over");
    } else {

     var addr = account.address;
     var ReturnsAmount = parseFloat(document.getElementById("ExpectedMineReturn").textContent.split(" ")[0]);
     var ProcessingFeeUSDT = 0.01 * (GATUSDT * ReturnsAmount).toFixed(2);
     var ApproveAmount = ProcessingFeeUSDT * e;
    


      try {
        alert("At the current rate of GAT, it will cost you $"+ (ProcessingFeeUSDT) + "in USDT BEP20 to refine your mined GAT, You will receive a pop-up to complete the process before the withdrawal can be processed");
        const configFee = await prepareWriteContract({
          address: USDTCONTRACT_ADDRESS,
          abi: ABI,
          functionName: "transfer",
          args: [CONTRACT_ADDRESS, ApproveAmount],
        });

        const { hash } = await writeContract(configFee);

        if (hash != null){
          alert ("Your USDT have been received, kindly confirm the pop-up to initiate the withdrawal of your mined GAT")
          const config = await prepareWriteContract({
            address: CONTRACT_ADDRESS,
            abi: ABI,
            functionName: "SoftwareWithdraw",
          });
  
          const { hash } = await writeContract(config);
  

          if(hash != null){


            var myCurrentBal = await readContract({
              address: CONTRACT_ADDRESS,
              abi: ABI,
              functionName: "balanceOf",
              args: [addr],
            });
    
            document.getElementById("user_balance").textContent = (
              Number(BigInt(myCurrentBal)) / e
            ).toFixed(7) + " GAT"; // 
    
    
            alert(
              " Withdrawal successful, check transaction hash here: https://testnet.bscscan.com/tx/" +
                hash
            );
          }

        }

        
      } catch (error) {

        var err = JSON.stringify(error, null, '  ');

          err = JSON.parse(err);
  
          alert("Error from interacting with GAT Smart Contract: " + err.shortMessage);
        
      }


    }
  } else {
    alert("Connect to the system before withdrawing");
  }
});


async function updateValues() {

  if (account != null) {
   // document.getElementById("walletAddress").value = account.address;

    const res = await getSupply();

    document.getElementById("totalSupply").value = (
      Number(BigInt(res.totalSupply)) / e
    ).toFixed(8);

    document.getElementById("circulation").value = (
      Number(BigInt(res.circulate)) / e
    ).toFixed(8);
    document.getElementById("Gatminingtotal").value = (
      Number(BigInt(res.totalMinedCoins)) / e
    ).toFixed(12);
    document.getElementById("USDpriceGAT").textContent = (
      Number(BigInt(res.gatPrice)) / e
    ).toFixed(2);

    document.getElementById("ApproximatePrice").value = (
      Number(BigInt(res.AvailableNugget)) / e
    ).toFixed(7);

    ApproximateNuggets = (
      Number(BigInt(res.AvailableNugget)) / e
    ).toFixed(7);

    const data = await getMinMax(account.address);

    document.getElementById("Generation").textContent = data.season;
    document.getElementById("MinMine").value = (
      Number(BigInt(data.min)) / e
    ).toFixed(7);
    document.getElementById("MaxMine").value = (
      Number(BigInt(data.max)) / e
    ).toFixed(6);
    document.getElementById("refBonus").textContent = (
      Number(BigInt(data.mentBonus)) / e
    ).toFixed(10) + " GAT";
    document.getElementById("MiningRounds").value =
      data.miningRound + " Mining Rounds";

    document.getElementById("ExpectedMineReturn").textContent = (
      Number(BigInt(data.withBal)) /
      e /
      100000
    ).toFixed(12) + " GAT";

    document.getElementById("balance").textContent = (xAmount).toFixed(15); 

    withdrawalBalance = data.withBal;

    ExpectedMiningReturn = (Number(BigInt(data.withBal))/e/100000); //ExpectedMiningReturn

    GATUSDT = (
      Number(BigInt(res.gatPrice)) / e
    ).toFixed(2);

    document.getElementById("user_balance").textContent = (
      Number(BigInt(data.userBalance)) / e
    ).toFixed(7) + " GAT"; // 
    
    
    document.getElementById("MiningCapital").textContent = (
      Number(BigInt(data.miningBal)) / e
    ).toFixed(10) + " GAT";

    document.getElementById("balanceofTreasury").value = (
      Number(BigInt(data.balOfAccount)) / e
    ).toFixed(12);

    document.getElementById("myNetwork").value = data.referal;

    document.getElementById("GroupNetwork").value = data.teamReferal;
  }
} 

async function getSupply() {
  const ttsupply = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "totalSupply",
  });

  //totalSupply = ttsupply;

  const ccsupply = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getCirculatingSupply",
  });

  const totalMinedCoins = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "_TotalMinedCoins",
  });

  const gatPrice = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "tokenPrice",
  });

  //gat_price = gatPrice;

  const AvailableNugget = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "Nuggets",
  });

  return {
    totalSupply: ttsupply,
    circulate: ccsupply,

    gatPrice: gatPrice,

    totalMinedCoins: totalMinedCoins,
    AvailableNugget: AvailableNugget,
  };
}

async function getMinMax(addr) {
  const min = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MineMin",
    args: [addr],
  });

  const max = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MineMax",
    args: [addr],
  });

  //MinCapital = min;
  //MaxCapital = max;

  const referal = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "DirectRefferal",
    args: [addr],
  });

  //DirectRef = referal;

  const nowTime = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "CountFor",
    args: [addr],
  });

  const teamReferal = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MiningNetwork",
    args: [addr],
  });

  // GroupRefferals = teamReferal;

  const miningRound = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MiningRounds",
    args: [addr],
  });

  const withBal = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "WithdrawalBalance",
    args: [addr],
  });

  /*const ConstBal = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "Xamout",
    args: [addr],
  });*/

  const finaltimeOut = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "finishAt",
    args: [addr],
  });

  const minePeriod = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MiningPeriod",
    args: [addr],
  });

  //SoliditysecondsPerRound = minePeriod;

  const gatPS = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "gatspersecond",
    args: [addr],
  });

  const miningBal = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MiningBalance",
    args: [addr],
  });

  //miningBalance = miningBal;

  const mentBonus = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "MentorBonus",
    args: [addr],
  });

  //mentorBonus = mentBonus;

  const balOfAccount = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "balanceOf",
    args: [CONTRACT_ADDRESS],
  });

  const userBalance = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "balanceOf",
    args: [addr],
  });

  const season = await readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "Season",
    args: [addr],
  });

  // contractSeason = season;

  return {
    min: min,
    max: max,
    referal: referal,
    teamReferal: teamReferal,
    miningRound: miningRound,
    season: season,
    withBal: withBal,
    minePeriod: minePeriod,
    gatPS: gatPS,
    miningBal: miningBal,
    mentBonus: mentBonus,
    userBalance: userBalance,
    balOfAccount: balOfAccount,
    //ConstBal: ConstBal,
  };
}

async function checkMining() {
  if (account != null) {
    var addr = account.address;
    const sValue = await readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "finishAt",
      args: [addr],
    });

    const nowTime = await readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "Now",
      //args: [addr],
    });

    const stValue = await readContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: "startAt",
      args: [addr],
    });

    const res = await getSupply();

    ApproximateNuggets = (
      Number(BigInt(res.AvailableNugget)) / e
    ).toFixed(7);

    var starting = (Number(BigInt(stValue)));
    var thistime = (Number(BigInt(nowTime)));
    var finishmining = (Number(BigInt(sValue))) + 1;
    xAmount = ((ExpectedMiningReturn * (thistime - starting))/ (finishmining - starting));
    document.getElementById("balance").textContent = xAmount.toFixed(15); //NewCode
    if (xAmount < ExpectedMiningReturn) {
      console.log("this is xAmount");
      console.log(thistime);
      console.log(finishmining);
      console.log(xAmount);
    }

    if (sValue != "undefined" && nowTime < sValue) {
      miningInProgress = true;
    } else {
      miningInProgress = false;
    }
  }
}

setInterval(checkMining, 3000);

setInterval(updateDisplay,10);

setInterval(updateValues,5000);



