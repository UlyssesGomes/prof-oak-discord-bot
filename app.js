import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
import { getShuffledOptions, getResult } from './game.js';
import { boostCalculator } from './service/boost/boost-service.js';
import { heldFusion, heldInfo, heldRemove } from './service/held/held-service.js';
import { whereIsDuke, whereIsMerchant } from './service/npc/npc-service.js';
import { readProfessorCraftFile } from './service/job/professor-service.js';

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  console.log('Recebeu: ', data);
  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
  
    if (name === 'about') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'This bot was made by Ulysses.\n Email: ulysses.d3v@gmail.com',
        },
      });
    }
    
    if (name === 'challenge'){
      const userId = req.body.member.user.id;
      // User's object choice
      const objectName = req.body.data.options[0].value;

      // Create active game using message ID as the game ID
      activeGames[id] = {
        id: userId,
        objectName,
      };

      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: `Rock papers scissors challenge from <@${userId}>`,
          components: [
            {
              type: MessageComponentTypes.ACTION_ROW,
              components: [
                {
                  type: MessageComponentTypes.BUTTON,
                  // Append the game ID to use later on
                  custom_id: `accept_button_${req.body.id}`,
                  label: 'Accept',
                  style: ButtonStyleTypes.PRIMARY,
                },
              ],
            },
          ],
        },
      });
    }

    if(name === 'boost1') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: boostCalculator(req, false),
        },
      });
    }

    if(name === 'boost2') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: boostCalculator(req, true),
        },
      });
    }

    // ------------------------------------------------------------------
    // MODAL TEST IMPLEMENTATION
    // ------------------------------------------------------------------
  
    // if(name === 'boost-test') {
    //   console.log('recebeu modal...');
    //   console.log('enviando modal...');
    //   return res.send({
    //     type: InteractionResponseType.APPLICATION_MODAL,
    //     data: {
    //       custom_id: 'my_modal',
    //       title: 'Modal title',
    //       components: [
    //         {
    //           // Text inputs must be inside of an action component
    //           type: MessageComponentTypes.ACTION_ROW,
    //           components: [
    //             {
    //               // See https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
    //               type: MessageComponentTypes.INPUT_TEXT,
    //               custom_id: 'my_text',
    //               style: 1,
    //               label: 'Type some text',
    //             },
    //           ],
    //         },
    //         {
    //           type: MessageComponentTypes.ACTION_ROW,
    //           components: [
    //             {
    //               type: MessageComponentTypes.INPUT_TEXT,
    //               custom_id: 'my_longer_text',
    //               // Bigger text box for input
    //               style: 2,
    //               label: 'Type some (longer) text',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   });
    // }

    // if (type === InteractionType.APPLICATION_MODAL_SUBMIT) {
    //   console.log('Recebendo result do modal')
    //   // custom_id of modal
    //   const modalId = data.custom_id;
    //   // user ID of member who filled out modal
    //   const userId = req.body.member.user.id;
  
    //   if (modalId === 'my_modal') {
    //     console.log('Modal encontrando, gerando resposta do modal.')
    //     let modalValues = '';
    //     // Get value of text inputs
    //     for (let action of data.components) {
    //       let inputComponent = action.components[0];
    //       modalValues += `${inputComponent.custom_id}: ${inputComponent.value}\n`;
    //     }
  
    //     return res.send({
    //       type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    //       data: {
    //         content: `<@${userId}> typed the following (in a modal):\n\n${modalValues}`,
    //       },
    //     });
    //   }
    // }

    if(name === 'held-info') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: heldInfo(req),
        },
      });
    }

    if(name === 'held-remove') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: heldRemove(req),
        },
      });
    }

    if(name === 'held-fusion') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: heldFusion(req),
        },
      });
    }

    if(name === 'merchant-today') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: whereIsMerchant(),
        },
      });
    }

    if(name === 'duke-today') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: whereIsDuke(),
        },
      });
    }

    if(name === 'professor-craft') {
      readProfessorCraftFile();
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'look on console.',
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
