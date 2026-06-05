export type GameScreen =
  | "menu"
  | "prologue"
  | "window-transition"
  | "night"
  | "radio"
  | "people-list"
  | "integration"
  | "pause"
  | "gameover";

export type GamePhase = "day" | "night";

export type Tone =
  | "friendly"
  | "urgent"
  | "grateful"
  | "aggressive"
  | "casual"
  | "cooperative"
  | "evasive"
  | "hostile";

export type CharacterRole = "core" | "supporting";

export type CabinStatus = "absent" | "inside" | "kicked" | "killed";

export interface ChainLink {
  fromId: string;
  toId: string;
  text: string;
  reliable: boolean;
}

export interface DialogueNode {
  id: string;
  text: string;
  tone: Tone;
  revealsLinkId?: string;
  requiresLinkId?: string;
}

export interface Character {
  id: string;
  name: string;
  role: CharacterRole;
  portraitSeed: number;
  firstArrival: string;
  furtherQuestion: string;
  doorDialogue: DialogueNode[];
  integrationDialogue: DialogueNode[];
  kickReaction: string;
  turnAwayReaction: string;
  admitReaction: string;
  chainLinks: ChainLink[];
  isKiller: boolean;
  unreliable: boolean;
}

export interface CabinOccupant {
  characterId: string;
  joinedOnDay: number;
  status: CabinStatus;
  revealedLinkIds: string[];
  furtherQuestionRevealed: boolean;
}

export interface NightVisitor {
  characterId: string;
  outcome: "let-in" | "turned-away" | "pending";
}

export interface RadioEvent {
  day: number;
  index: number;
  transcript: string;
  creatureDescription: string;
}

export type EndingType = "good" | "bad" | "cabin-empty" | "killer-survived";

export interface GameState {
  screen: GameScreen;
  phase: GamePhase;
  day: number;
  maxDays: number;
  nightVisitorIndex: number;
  currentVisitorId: string | null;
  selectedCharacterId: string | null;
  isPaused: boolean;
  ending: EndingType | null;
  cabin: CabinOccupant[];
  nightQueue: NightVisitor[];
  killerRevealed: boolean;
}
