import 'dotenv/config';
import { getRPSChoices } from './game.js';
import { capitalize, InstallGlobalCommands } from './utils.js';

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Simple test command
const ABOUT_COMMAND = {
  name: 'about',
  description: 'About this bot.',
  type: 1,
};

// Command containing options
const CHALLENGE_COMMAND = {
  name: 'challenge',
  description: 'Challenge to a match of rock paper scissors',
  options: [
    {
      type: 3,
      name: 'object',
      description: 'Pick your object',
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

// Simple test command
const NORMAL_BOOST_COMMAND = {
  name: 'boost1',
  description: 'Calculate boost for normal stones like feather, fire, ice...',
  type: 1,
  options: [
    {
      name: 'current-boost',
      description: 'Starting pokemon boost.',
      type: 4,
      required: true
    },
    {
      name: 'desired-boost',
      description: 'Boost that you want to apply.',
      type: 4,
      required: true
    },
    {
      name: 'boost-value',
      description: 'Pokemon boost value.',
      type: 4,
      required: true
    },
    {
      name: 'stone-price',
      description: 'Stone price of pokemon you want to boost.',
      type: 4,
      required: false
    },
    {
      name: 'boost-stone-price',
      description: 'Boost stone price.',
      type: 4,
      required: false
    },
  ],
};

// Simple test command
const SPECIAL_BOOST_COMMAND = {
  name: 'boost2',
  description: 'Calculate boost for special stones like ancient, metal and crystal.',
  type: 1,
  options: [
    {
      name: 'current-boost',
      description: 'Starting pokemon boost.',
      type: 4,
      required: true
    },
    {
      name: 'desired-boost',
      description: 'Boost that you want to apply.',
      type: 4,
      required: true
    },
    {
      name: 'boost-value',
      description: 'Pokemon boost value.',
      type: 4,
      required: true
    },
    {
      name: 'stone-price',
      description: 'Stone price of pokemon you want to boost.',
      type: 4,
      required: false
    },
    {
      name: 'boost-stone-price',
      description: 'Boost stone price.',
      type: 4,
      required: false
    },
  ],
};

const HELD_INFO_COMMAND = {
  name: 'held-info',
  description: 'Get held info by tier',
  type: 1,
  options: [
    {
      name: 'name',
      description: 'Held name.',
      type: 3,
      required: true
    },
    {
      name: 'tier',
      description: 'Held tier.',
      type: 4,
      required: true
    },
  ]
};

const HELD_REMOVE_COMMAND = {
  name: 'held-remove',
  description: 'Get held remove price by tier.',
  type: 1,
  options: [
    {
      name: 'tier',
      description: 'Held tier.',
      type: 4,
      required: true
    },
  ]
};

const HELD_FUSION_COMMAND = {
  name: 'held-fusion',
  description: 'Get held fusion price by tier that you have.',
  type: 1,
  options: [
    {
      name: 'tier',
      description: 'The tier of the 3 helds you have.',
      type: 4,
      required: true
    },
  ]
};

const MERCHANT_TODAY_COMMAND = {
  name: 'merchant-today',
  description: 'Get today location of npc Merchant.',
  type: 1,
};

const ALL_COMMANDS = [
  ABOUT_COMMAND, 
  CHALLENGE_COMMAND, 
  NORMAL_BOOST_COMMAND, 
  SPECIAL_BOOST_COMMAND, 
  HELD_INFO_COMMAND, 
  HELD_REMOVE_COMMAND, 
  HELD_FUSION_COMMAND, 
  MERCHANT_TODAY_COMMAND
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);