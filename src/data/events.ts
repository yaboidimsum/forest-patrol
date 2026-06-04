import type { RadioEvent } from "@/types/game";

export const radioEvents: RadioEvent[] = [
  {
    day: 1,
    index: 0,
    transcript:
      "All units, this is Ranger Base. Lockdown remains in effect. Do not approach the north perimeter. Repeat: do not approach the north perimeter.",
    creatureDescription:
      "Reports from the north perimeter describe a tall figure, roughly humanoid, observed between tree lines after sundown.",
  },
  {
    day: 1,
    index: 1,
    transcript:
      "Survivor located three kilometers south of the post. Requesting immediate extraction. Condition: critical.",
    creatureDescription:
      "The survivor reports a guttural clicking sound preceding each sighting. The pattern repeats every 14 seconds.",
  },
  {
    day: 2,
    index: 0,
    transcript:
      "South patrol has gone silent. Last transmission: 'It walks like us. It talks like us. Don't let it in.'",
    creatureDescription:
      "The creature has been observed mimicking human voices. It repeats the names of those it has already taken.",
  },
  {
    day: 2,
    index: 1,
    transcript:
      "MDP units are on standby. Awaiting confirmation from the ranger post before engaging.",
    creatureDescription:
      "Field agents describe the creature's skin as grey, mottled. Nails appear darker than human, possibly elongated.",
  },
  {
    day: 3,
    index: 0,
    transcript:
      "The pattern has shifted. It is no longer avoiding the cabin. It is approaching.",
    creatureDescription:
      "Multiple witnesses confirm the creature does not cast a shadow under direct moonlight.",
  },
  {
    day: 3,
    index: 1,
    transcript:
      "Three more disappearances overnight. The chain of sightings now spans the entire park.",
    creatureDescription:
      "The creature's behavior suggests intelligence. It chooses its targets. It knows the layout.",
  },
  {
    day: 4,
    index: 0,
    transcript:
      "MDP is requesting permission to breach. Holding for ranger post confirmation. Confirm or deny.",
    creatureDescription:
      "Field report: the creature attempted to mimic a survivor's voice to gain entry. The mimicry was nearly perfect.",
  },
  {
    day: 4,
    index: 1,
    transcript:
      "Survivor count inside the cabin is the highest it has been all week. Be cautious of newcomers.",
    creatureDescription:
      "The creature has been observed standing perfectly still for hours at a time, observing the cabin.",
  },
  {
    day: 5,
    index: 0,
    transcript:
      "This is the final broadcast. The perimeter is collapsing. Whatever you do, do not let it in.",
    creatureDescription:
      "All sightings now originate from directly outside the cabin. The creature is waiting.",
  },
];

export const getRadioEvent = (day: number, index: number): RadioEvent | undefined =>
  radioEvents.find((e) => e.day === day && e.index === index);
