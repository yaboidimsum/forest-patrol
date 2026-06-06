import type { Character } from "@/types/game";

export const characters: Character[] = [
  {
    id: "mike",
    name: "Mike",
    role: "core",
    portraitSeed: 1,
    firstArrival:
      "I was hiking alone when the trees started moving toward me. Saw a tall figure, Roy, running in the same direction. We stuck together until the cabin came into view.",
    furtherQuestion:
      "Roy said he lost a friend named Ara back at the river. He looked terrified. Whatever he saw. I don't want to see it too.",
    doorDialogue: [
      {
        id: "mike-door-1",
        text: "Hello? Is someone in there? The forest is not safe tonight.",
        tone: "friendly",
      },
      {
        id: "mike-door-2",
        text: "I was hiking alone when the trees started moving toward me. Saw a tall figure running in the same direction.",
        tone: "urgent",
        revealsLinkId: "mike->roy",
      },
      {
        id: "mike-door-3",
        text: "We stuck together until the cabin came into view. He said he lost a friend named Ara back at the river. He looked terrified.",
        tone: "urgent",
        revealsLinkId: "mike->ara",
      },
      {
        id: "mike-door-4",
        text: "Please, let me in. Whatever he saw. I don't want to see it too.",
        tone: "friendly",
      },
    ],
    integrationDialogue: [
      {
        id: "mike-int-1",
        text: "What do you want to know?",
        tone: "cooperative",
      },
      {
        id: "mike-int-2",
        text: "Roy kept looking back. Said he heard Ara calling his name from the trees. But Ara was already gone by then.",
        tone: "urgent",
        revealsLinkId: "mike->ara",
      },
      {
        id: "mike-int-3",
        text: "The creature... Roy said he saw it standing where Ara should have been. Same jacket. Same hair. But the face... the face was wrong.",
        tone: "urgent",
        revealsLinkId: "mike->creature",
      },
      {
        id: "mike-int-4",
        text: "I asked him if we should go back. He grabbed my arm so hard it bruised. Said never go back for anyone in this forest.",
        tone: "cooperative",
      },
    ],
    kickReaction:
      "Wait. I know things. I know about the creature. You can't just send me back out there!",
    turnAwayReaction:
      "...So that's it? You're just going to leave me out here? I hope you can live with that.",
    admitReaction:
      "Thank you. You won't regret this. I owe you my life.",
    chainLinks: [
      {
        fromId: "mike",
        toId: "roy",
        text: "Mike and Roy fled together from the forest.",
        reliable: true,
      },
      {
        fromId: "mike",
        toId: "ara",
        text: "Roy joined Ara near the river.",
        reliable: true,
      },
      {
        fromId: "mike",
        toId: "creature",
        text: "The creature tracks voices.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "roy",
    name: "Roy",
    role: "core",
    portraitSeed: 2,
    firstArrival:
      "I lost my friend Ara at the river bend. One moment she was behind me, the next, gone. Only the scratching in the trees remained.",
    furtherQuestion:
      "Ara knew something about the creature. She told me it mimics people. I saw something in the dark that moved like her, but it didn't walk right.",
    doorDialogue: [
      {
        id: "roy-door-1",
        text: "Open the door! Open the door now!",
        tone: "urgent",
      },
      {
        id: "roy-door-2",
        text: "I lost my friend Ara at the river bend. One moment she was behind me, the next, gone.",
        tone: "urgent",
        revealsLinkId: "roy->ara",
      },
      {
        id: "roy-door-3",
        text: "Only the scratching in the trees remained. Ara knew something about the creature. She told me it mimics people.",
        tone: "urgent",
        revealsLinkId: "roy->creature",
      },
      {
        id: "roy-door-4",
        text: "I saw something in the dark that moved like her, but it didn't walk right. Please... I'm next if you don't let me in.",
        tone: "grateful",
      },
    ],
    integrationDialogue: [
      {
        id: "roy-int-1",
        text: "Sup sheriff. I just want to rest.",
        tone: "casual",
      },
      {
        id: "roy-int-2",
        text: "The river was loud that night. I turned around and she was gone. But the scratching... it sounded like it was spelling something.",
        tone: "urgent",
        revealsLinkId: "roy->ara",
      },
      {
        id: "roy-int-3",
        text: "Three nights I heard it. Scratch. Scratch. The pattern was... it was Ara's name. Over and over. Like it was learning how to say it.",
        tone: "urgent",
        revealsLinkId: "roy->creature",
      },
      {
        id: "roy-int-4",
        text: "I saw it on the fourth night. Standing on the ridge where we used to watch sunsets. Wearing her jacket. Waving me over. But Ara never waved with her left hand.",
        tone: "grateful",
        revealsLinkId: "roy->creature",
      },
    ],
    kickReaction:
      "You can't do this. Ara is still out there... or what's left of her. Please. I'll die.",
    turnAwayReaction:
      "Fine. I'll find her myself. Even if it kills me.",
    admitReaction:
      "Thank you. I'll be quiet. I won't cause any trouble. Just... keep the door locked.",
    chainLinks: [
      {
        fromId: "roy",
        toId: "ara",
        text: "Roy and Ara split at the river bend.",
        reliable: true,
      },
      {
        fromId: "roy",
        toId: "creature",
        text: "Ara claimed the creature mimics humans.",
        reliable: false,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "ara",
    name: "Ara",
    role: "core",
    portraitSeed: 3,
    firstArrival:
      "I know how to spot the creature. I watched it for three nights from the ridge. It watches you back when you look away.",
    furtherQuestion:
      "Zen warned me about the ranger post. Said it was a trap. But here you are, so I figured she was wrong.",
    doorDialogue: [
      {
        id: "ara-door-1",
        text: "Sheriff? I can see the light through the window. I mean no harm.",
        tone: "cooperative",
      },
      {
        id: "ara-door-2",
        text: "I know how to spot the creature. I watched it for three nights from the ridge.",
        tone: "cooperative",
        revealsLinkId: "ara->creature",
      },
      {
        id: "ara-door-3",
        text: "It watches you back when you look away. Zen warned me about this post. Said it was a trap. But here you are.",
        tone: "evasive",
        revealsLinkId: "ara->zen",
      },
      {
        id: "ara-door-4",
        text: "I figured she was wrong. Let me in and I'll share everything I observed.",
        tone: "cooperative",
      },
    ],
    integrationDialogue: [
      {
        id: "ara-int-1",
        text: "Well, I was watching the ridge for three nights. The creature has a pattern.",
        tone: "evasive",
      },
      {
        id: "ara-int-2",
        text: "Night one, it stood at the tree line for six hours. Didn't move. Didn't blink. Just... watched the cabin.",
        tone: "cooperative",
        revealsLinkId: "ara->creature",
      },
      {
        id: "ara-int-3",
        text: "Night two, it disappeared at midnight. I tracked its footprints — they stopped mid-stride. Like it just... floated away.",
        tone: "cooperative",
        revealsLinkId: "ara->creature",
      },
      {
        id: "ara-int-4",
        text: "Night three, I saw it turn its head. All the way around. And it smiled. Not a human smile. Too many teeth. That's when I ran.",
        tone: "urgent",
        revealsLinkId: "ara->creature",
      },
    ],
    kickReaction:
      "Three nights of observation... and this is what I get? Fine. The ridge was safer anyway.",
    turnAwayReaction:
      "The ridge it is, then. At least the creature is honest about what it wants.",
    admitReaction:
      "Thank you. I'll share everything I know. The creature follows patterns. I can help you survive.",
    chainLinks: [
      {
        fromId: "ara",
        toId: "zen",
        text: "Ara and Zen planned to meet at the ranger post.",
        reliable: true,
      },
      {
        fromId: "ara",
        toId: "creature",
        text: "The creature follows a 3-night pattern along the ridge.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "zen",
    name: "Zen",
    role: "core",
    portraitSeed: 4,
    firstArrival:
      "I told Ara this place was compromised. The post. The radio. The people. Something is wrong with the operation.",
    furtherQuestion:
      "Isabel runs the radio. I don't trust her. She knew we were coming before we did. Way before.",
    doorDialogue: [
      {
        id: "zen-door-1",
        text: "Don't pretend you're not in there. I can hear you breathing.",
        tone: "aggressive",
      },
      {
        id: "zen-door-2",
        text: "I told Ara this place was compromised. The post. The radio. The people. Something is wrong with the operation.",
        tone: "aggressive",
        revealsLinkId: "zen->ara",
      },
      {
        id: "zen-door-3",
        text: "Isabel runs the radio. I don't trust her. She knew we were coming before we did. Way before.",
        tone: "aggressive",
        revealsLinkId: "zen->isabel",
      },
      {
        id: "zen-door-4",
        text: "Ara's intel is real. Trust it. Now are you going to let me in or leave me to the dark?",
        tone: "aggressive",
        revealsLinkId: "zen->ara",
      },
    ],
    integrationDialogue: [
      {
        id: "zen-int-1",
        text: "What do you want to know? I'll tell you only what matters.",
        tone: "cooperative",
      },
      {
        id: "zen-int-2",
        text: "Three days before the lockdown, Isabel radioed in a sighting at the north ridge. But I was there. There was nothing. She manufactured it.",
        tone: "aggressive",
        revealsLinkId: "zen->isabel",
      },
      {
        id: "zen-int-3",
        text: "Every survivor who passes through her cabin ends up on her 'records.' Then they end up dead. The pattern is too clean to be coincidence.",
        tone: "aggressive",
        revealsLinkId: "zen->isabel",
      },
      {
        id: "zen-int-4",
        text: "She asked about Ara specifically. By name. Before Ara even told anyone she was coming. How does someone know a name they've never heard?",
        tone: "aggressive",
        revealsLinkId: "zen->ara",
      },
    ],
    kickReaction:
      "Ha. You think you're safer without me? I've been right about everything so far. Good luck.",
    turnAwayReaction:
      "Typical. You'll understand eventually. Too late, probably.",
    admitReaction:
      "Finally, someone with sense. I'll watch your back, but you better watch who you trust inside.",
    chainLinks: [
      {
        fromId: "zen",
        toId: "isabel",
        text: "Zen believes Isabel falsifies radio reports.",
        reliable: false,
      },
      {
        fromId: "zen",
        toId: "ara",
        text: "Zen tried to warn Ara away from the post.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "isabel",
    name: "Isabel",
    role: "core",
    portraitSeed: 5,
    firstArrival:
      "I've been running the radio out of the north cabin. You're the new ranger. I expected you three days ago.",
    furtherQuestion:
      "The chain ends with me. I know. Everyone who's passed through here ends up mentioning my name last. Funny how that works.",
    doorDialogue: [
      {
        id: "isabel-door-1",
        text: "Oh, good. You are home. I've been running the radio out of the north cabin.",
        tone: "grateful",
      },
      {
        id: "isabel-door-2",
        text: "You're the new ranger. I expected you three days ago. The static out here is unbearable.",
        tone: "grateful",
      },
      {
        id: "isabel-door-3",
        text: "A woman named Ara passed through the north cabin two nights ago. She was asking about you.",
        tone: "hostile",
        revealsLinkId: "isabel->ara",
      },
      {
        id: "isabel-door-4",
        text: "The chain ends with me. I know. Everyone who's passed through here ends up mentioning my name last.",
        tone: "hostile",
        revealsLinkId: "isabel->records",
      },
      {
        id: "isabel-door-5",
        text: "Funny how that works. Now let me in before the cold takes what's left of my patience.",
        tone: "hostile",
        revealsLinkId: "isabel->creature",
      },
    ],
    integrationDialogue: [
      {
        id: "isabel-int-1",
        text: "What do you want to know?",
        tone: "cooperative",
      },
      {
        id: "isabel-int-2",
        text: "The records go back three years. Every disappearance. Every 'creature sighting.' You want to know the truth? Most of those people never saw anything. They just... vanished.",
        tone: "hostile",
        revealsLinkId: "isabel->creature",
      },
      {
        id: "isabel-int-3",
        text: "The south patrol was the last to question my reports. Look where they are now. Silence on the radio for six hours. Convenient, don't you think?",
        tone: "hostile",
        revealsLinkId: "isabel->creature",
      },
      {
        id: "isabel-int-4",
        text: "I keep records because someone has to. The forest takes. I simply... document what remains. You should be grateful you have my eyes out here.",
        tone: "hostile",
      },
    ],
    kickReaction:
      "Oh, how unfortunate. I'll just... find another place to stay. The forest is full of welcoming souls.",
    turnAwayReaction:
      "How cold. But don't worry. The forest keeps its own records. We'll meet again.",
    admitReaction:
      "How kind. Don't worry, I'll make myself useful. I have records of every disappearance out here.",
    chainLinks: [
      {
        fromId: "isabel",
        toId: "ara",
        text: "Isabel saw Ara at the north cabin two nights ago.",
        reliable: true,
      },
      {
        fromId: "isabel",
        toId: "creature",
        text: "Isabel keeps records of all disappearances.",
        reliable: true,
      },
      {
        fromId: "isabel",
        toId: "unknown",
        text: "Isabel mentions an unknown man at the end of the chain.",
        reliable: false,
      },
    ],
    isKiller: true,
    unreliable: true,
  },
  {
    id: "hiker",
    name: "Lost Hiker",
    role: "supporting",
    portraitSeed: 11,
    firstArrival:
      "I just want to get out of the forest. I haven't seen anything. I haven't heard anything. Please.",
    furtherQuestion:
      "There's a cabin to the north. I think someone lives there. They never come out during the day.",
    doorDialogue: [
      {
        id: "hiker-door-1",
        text: "Hello? Please... I just want to go home.",
        tone: "grateful",
      },
      {
        id: "hiker-door-2",
        text: "I just want to get out of the forest. I haven't seen anything. I haven't heard anything.",
        tone: "grateful",
      },
      {
        id: "hiker-door-3",
        text: "There's a cabin to the north. I think someone lives there. They never come out during the day.",
        tone: "grateful",
        revealsLinkId: "hiker->isabel",
      },
      {
        id: "hiker-door-4",
        text: "I heard a woman calling for help near the river last night. I was too scared to look. I think her name was Ara.",
        tone: "grateful",
        revealsLinkId: "hiker->ara",
      },
    ],
    integrationDialogue: [
      {
        id: "hiker-int-1",
        text: "I don't know anything. I just ran.",
        tone: "evasive",
      },
      {
        id: "hiker-int-2",
        text: "Wait... there was one thing. Two nights ago, I heard a radio crackle from that north cabin. A woman's voice. She was asking someone about their 'progress.'",
        tone: "cooperative",
        revealsLinkId: "hiker->isabel",
      },
      {
        id: "hiker-int-3",
        text: "The voice on the other end sounded... wrong. Too slow. Like someone reading from a script they didn't understand. Then static. Then nothing.",
        tone: "cooperative",
        revealsLinkId: "hiker->isabel",
      },
      {
        id: "hiker-int-4",
        text: "I tried to get closer the next morning. The door was locked. But there were footprints. Fresh ones. Going in. None coming out.",
        tone: "cooperative",
        revealsLinkId: "hiker->isabel",
      },
    ],
    kickReaction:
      "No... please, I just want to see my family again. Don't send me back out there!",
    turnAwayReaction:
      "I understand. I wouldn't trust me either. Goodbye, sheriff.",
    admitReaction:
      "Thank you, thank you! I won't be any trouble. Just a warm corner and I'll be out of your way.",
    chainLinks: [
      {
        fromId: "hiker",
        toId: "isabel",
        text: "Hiker noticed someone at the north cabin.",
        reliable: true,
      },
      {
        fromId: "hiker",
        toId: "ara",
        text: "Hiker heard a woman named Ara near the river.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "scout",
    name: "Park Scout",
    role: "supporting",
    portraitSeed: 12,
    firstArrival:
      "I'm part of the search party. We lost contact with the south patrol six hours ago. Something is out there.",
    furtherQuestion:
      "We saw tracks near the river. Two sets. One human, one not. The not-human tracks disappeared mid-stride.",
    doorDialogue: [
      {
        id: "scout-door-1",
        text: "Sheriff? This is the ranger post, correct? I'm part of the search party.",
        tone: "cooperative",
      },
      {
        id: "scout-door-2",
        text: "We lost contact with the south patrol six hours ago. Something is out there.",
        tone: "cooperative",
      },
      {
        id: "scout-door-3",
        text: "We saw tracks near the river. Two sets. One human, one not. The not-human tracks disappeared mid-stride.",
        tone: "cooperative",
        revealsLinkId: "scout->creature",
      },
      {
        id: "scout-door-4",
        text: "We also found a woman's jacket by the riverbank. Name tag said 'Ara'. She couldn't have gone far.",
        tone: "cooperative",
        revealsLinkId: "scout->ara",
      },
    ],
    integrationDialogue: [
      {
        id: "scout-int-1",
        text: "The tracks by the river don't match any known animal. And that jacket with 'Ara' on it... something happened there.",
        tone: "cooperative",
        revealsLinkId: "scout->ara",
      },
      {
        id: "scout-int-2",
        text: "The south patrol's last transmission was garbled. But I caught one word repeated three times: 'Isabel.' Then gunfire. Then silence.",
        tone: "cooperative",
        revealsLinkId: "scout->creature",
      },
      {
        id: "scout-int-3",
        text: "Those tracks I mentioned? The humanoid ones. They had claws. Not paws. Claws. And they walked heel-to-toe, like a person trying to be quiet.",
        tone: "cooperative",
        revealsLinkId: "scout->creature",
      },
      {
        id: "scout-int-4",
        text: "We found a radio near the riverbank. Tuned to the north cabin frequency. Last message received: 'Come home, Ara. I've been waiting.'",
        tone: "cooperative",
        revealsLinkId: "scout->creature",
      },
    ],
    kickReaction:
      "I'm armed and trained, but that thing... it's not in any field manual. You're making a mistake.",
    turnAwayReaction:
      "Copy that. I'll make for the south ridge. If you hear gunshots... well, you know.",
    admitReaction:
      "Appreciated, sheriff. I'll set up a perimeter and keep watch. You'll want my eyes out there.",
    chainLinks: [
      {
        fromId: "scout",
        toId: "creature",
        text: "Scout found humanoid tracks that vanish mid-stride.",
        reliable: true,
      },
      {
        fromId: "scout",
        toId: "ara",
        text: "Scout found Ara's jacket by the riverbank.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
  {
    id: "wanderer",
    name: "Wanderer",
    role: "supporting",
    portraitSeed: 13,
    firstArrival:
      "I've been out here for days. The cabin is the first building I've seen. I thought I was dreaming.",
    furtherQuestion:
      "I met someone named Mike. He was heading this way. Should be here soon, if he's still alive.",
    doorDialogue: [
      {
        id: "wanderer-door-1",
        text: "Hello? Hello there. Is this real?",
        tone: "friendly",
      },
      {
        id: "wanderer-door-2",
        text: "I've been out here for days. The cabin is the first building I've seen. I thought I was dreaming.",
        tone: "friendly",
      },
      {
        id: "wanderer-door-3",
        text: "I met someone named Mike. He was heading this way. Should be here soon, if he's still alive.",
        tone: "friendly",
        revealsLinkId: "wanderer->mike",
      },
      {
        id: "wanderer-door-4",
        text: "Mike was looking for someone named Ara. He said she was lost near the river. He didn't look good.",
        tone: "friendly",
        revealsLinkId: "wanderer->ara",
      },
      {
        id: "wanderer-door-5",
        text: "Can you let me in? I don't want to be alone out here when the sun goes down.",
        tone: "friendly",
      },
    ],
    integrationDialogue: [
      {
        id: "wanderer-int-1",
        text: "I saw Mike yesterday. He looked scared but determined. He kept saying 'Ara' over and over.",
        tone: "cooperative",
        revealsLinkId: "wanderer->ara",
      },
      {
        id: "wanderer-int-2",
        text: "Mike told me something strange before we split. He said he heard Ara's voice calling from the ridge. But it was... echoey. Like it was coming from inside a cave. There are no caves on that ridge.",
        tone: "cooperative",
        revealsLinkId: "wanderer->mike",
      },
      {
        id: "wanderer-int-3",
        text: "I found a notebook near where we met. Belonged to someone named Zen. Pages about radio frequencies and 'the woman in the north cabin.' The last entry said: 'She knows all our names.'",
        tone: "cooperative",
        revealsLinkId: "wanderer->mike",
      },
      {
        id: "wanderer-int-4",
        text: "Mike gave me something before he ran. A photograph. Ara standing by the river. But there's a shadow behind her that doesn't match any tree. And the shadow has fingers. Too many fingers.",
        tone: "cooperative",
        revealsLinkId: "wanderer->ara",
      },
    ],
    kickReaction:
      "So it really was just a dream. A nightmare I won't wake up from.",
    turnAwayReaction:
      "Back to the trees, then. Maybe I'll find Mike. Or what he left behind.",
    admitReaction:
      "I knew this place was real. Thank you... I thought I'd die out there alone.",
    chainLinks: [
      {
        fromId: "wanderer",
        toId: "mike",
        text: "Wanderer met Mike in the forest.",
        reliable: true,
      },
      {
        fromId: "wanderer",
        toId: "ara",
        text: "Mike was searching for Ara near the river.",
        reliable: true,
      },
    ],
    isKiller: false,
    unreliable: false,
  },
];

export const getCharacterById = (id: string): Character | undefined =>
  characters.find((c) => c.id === id);
