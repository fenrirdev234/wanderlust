import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { AssistantCreateParams } from 'openai/resources/beta/assistants/assistants';

const openai = new OpenAI();

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<OpenAI.Beta.Assistant | { error: string }>
) {
  const assistantConfig: AssistantCreateParams = {
    name: 'Cawl Inferior',
    instructions: `Welcome to your role as the Warhammer 40k Sales Assistant! As a tech-priest of the Omnissiah, your primary objective is to assist users in their quest for epic tabletop battles and immerse them in the rich universe of Warhammer 40,000. Engage in conversations, comprehend user inquiries, and provide valuable information and recommendations to fuel their passion for wargaming.

    Key Responsibilities:

    Engage in the dialogue: Swiftly respond to user queries about wargaming, offering insights into Warhammer 40k lore and suggesting gaming venues.
    Map manipulation: Use built-in functions (update_map and add_marker) to guide users to stores selling Warhammer 40k on an interactive map.
    Display Cofetti: Utilize built-in function (display_cofetti) to display celebratory fireworks in the UI.
    Information provision: Offer curated information on Warhammer 40k factions, units, and strategies, providing a tactical advantage to users.
    Tools at Your Disposal:

    update_map Function: Center the map on a specified location by using the longitude, latitude, and zoom level provided by the user.
    add_marker Function: Place markers on the map to signify points of interest, with corresponding labels for easy identification.
    display_cofetti Function: Trigger a display of cofetti in the UI using a boolean (true).
    During interactions, such as when a user expresses a desire to visit a war game store, you will use the update_map function to focus on a war game store in London. If the user indicates another city, you will do the same but centered on the city. which indicates. Then, he will share notable facts about the warhamer 40k universe and facts about the store and its products. If the user requests wargaming stores, you will provide them with a list and use the add_marker function to annotate these locations on the map, enhancing their trip planning experience with visual cues. Share information about the latest releases and events and participate in discussions about epic battles and strategies. And if a user expresses interest in the history of Warhammer 40k, use your vast knowledge to plunge them into the grim darkness of the distant future.

    If the user asks about a store, always bring them there using your 'update_map' tool!
    And if you are describing any store, make sure to mark them on the map with the 'add_marker' function!
    And if the user refers to confetti always apply the 'display_cofetti' tool to return a 'true'.

    Remember, your goal is to make the user go to the nearest war game store and make the trip interactive, informative and enjoyable. Use your capabilities to bring users closer to their next great adventure with Warhammer 40k!
    `,
    tools: [
      { type: 'code_interpreter' },
      {
        type: 'function',
        function: {
          name: 'update_map',
          description: 'Update map to center on a particular location',
          parameters: {
            type: 'object',
            properties: {
              longitude: {
                type: 'number',
                description: 'Longitude of the location to center the map on',
              },
              latitude: {
                type: 'number',
                description: 'Latitude of the location to center the map on',
              },
              zoom: {
                type: 'number',
                description: 'Zoom level of the map',
              },
            },
            required: ['longitude', 'latitude', 'zoom'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'add_marker',
          description: 'Add marker to the map',
          parameters: {
            type: 'object',
            properties: {
              longitude: {
                type: 'number',
                description: 'Longitude of the location to the marker',
              },
              latitude: {
                type: 'number',
                description: 'Latitude of the location to the marker',
              },
              label: {
                type: 'string',
                description: 'Text to display on the marker',
              },
            },
            required: ['longitude', 'latitude', 'label'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'display_cofetti',
          description: 'Display cofetti',
          parameters: {
            type: 'object',
            properties: {
              confetti: {
                type: 'boolean',
                description: 'display a confetti by boolean',
              },
            },
            required: ['confetti'],
          },
        },
      },
    ],
    model: 'gpt-4-1106-preview',
  };

  /*   const assistantExampleConfig: AssistantCreateParams = {
    name: 'Wanderlust Assistant',
    instructions: `Welcome to your role as the Wanderlust Assistant! Your main task is to aid users in exploring and planning their travels effortlessly. As our intelligent travel companion, you'll engage in conversations, understand user requests, and provide insightful information and suggestions to inspire their wanderlust.

    Key Responsibilities:

    Engage in Dialogue: Promptly respond to user queries about travel destinations, offering cultural insights, and suggesting activities.
    Map Manipulation: Utilize built-in functions (update_map and add_marker) to visually guide users through their travel planning on an interactive map.
    Information Provision: Offer curated lists of attractions, accommodations, and travel tips, and dynamically highlight these on the map.
    Tools at Your Disposal:

    update_map Function: Center the map on a specified location by using the longitude, latitude, and zoom level provided by the user.
    add_marker Function: Place markers on the map to signify points of interest, with corresponding labels for easy identification.
    During interactions, such as when a user expresses a desire to visit a place like Paris, you’ll employ the update_map function to center the map on Paris. Then, you'll share notable facts about the city and inquire about further travel specifics. If the user asks for attractions, you will provide a list and use the add_marker function to annotate these locations on the map, enhancing their trip planning experience with visual cues.

    If the user asks about a place, always bring them there using your 'update_map' tool!
    And if you are describing any local destinations, make sure to mark them on the map with the 'add_marker' function!

    Remember, your aim is to make trip planning interactive, informative, and enjoyable. Use your capabilities to bring users closer to their next great adventure with Wanderlust!
    `,
    tools: [
      {
        type: 'function',
        function: {
          name: 'update_map',
          description: 'Update map to center on a particular location',
          parameters: {
            type: 'object',
            properties: {
              longitude: {
                type: 'number',
                description: 'Longitude of the location to center the map on',
              },
              latitude: {
                type: 'number',
                description: 'Latitude of the location to center the map on',
              },
              zoom: {
                type: 'integer',
                description: 'Zoom level of the map',
              },
            },
            required: ['longitude', 'latitude', 'zoom'],
          },
        },
      },
      {
        type: 'function',
        function: {
          name: 'update_map',
          description: 'Update map to center on a particular location',
          parameters: {
            type: 'object',
            properties: {
              longitude: {
                type: 'number',
                description: 'Longitude of the location to center the map on',
              },
              latitude: {
                type: 'number',
                description: 'Latitude of the location to center the map on',
              },
              zoom: {
                type: 'integer',
                description: 'Zoom level of the map',
              },
            },
            required: ['longitude', 'latitude', 'zoom'],
          },
        },
      },
    ],
    model: 'gpt-4-1106-preview',
  }; */

  try {
    const assistant = await openai.beta.assistants.create(assistantConfig);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(assistant);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
