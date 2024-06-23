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
const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
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

const ALL_COMMANDS = [TEST_COMMAND, CHALLENGE_COMMAND, NORMAL_BOOST_COMMAND, SPECIAL_BOOST_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);