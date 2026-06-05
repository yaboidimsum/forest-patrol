# Forest Watch — Game Script

> **Theme:** Chain of Information

---

## Day 1

**Chief:**  
Thanks for being here on a short notice. As you might have heard, the previous sheriff had an accident while on patrol. He is on the town clinic for now, and he should be back in 5 days.

**You:** What a poor fella.

**Chief:** Yes, it is unfortunate.

**You:** So, what will I be doing?

**Chief:**  
Your job is to watch the area, day and night. There might be hikers here and there who goes into the forest sometimes. Keep them safe, and offer shelter when they need it. And for you, we can't afford you to have an accident. Godspeed, sheriff.

**You:** Thanks, Chief.

**Radio:**  
Sunny day in Forester Hills! The weather is sure nice to take in the forest air. But be careful, hikers! With recent accidents happening at night, we urge you to not stay too late in the forest. If you need assistance, the forest sheriff will help you at his post.

> Day passes with no visitors.

**[Button: Next Day]**

---

## Day 2 (1 Point)

**Radio:**  
Cloudy day in Forester Hills! And we think it's a great day to explore the forest! The air is cool and crisp, you can really smell the pine trees in the forest. But be careful, as you might not know what you might encounter in the forest.

**You:** Huh, there's a report book from the previous sheriff. I should look around.

**[Button: Open report book]**

**You:** I… can't really read what he wrote. I guess there's some frequent visitor names. Mike's been here a lot. Isabel, Roy… I guess I'm supposed to write down the visitors' name too.

**Visitor:** Hello, are you the sheriff's replacement?

**You:** Yeah, and you are?

**Visitor:** I'm Mike. I like to go here a lot after school.

**You:** You're a student in Forester High?

**Mike:** Yep, the only high school in this rural area, I guess. I'm gonna continue on my walk. I guess I'll see you around?

**You:** Sure. I'll be here until the actual sheriff comes back. In 5 days.

**Mike:** Oh, that's great. I was really worried about what happened to him. I heard he slipped and fell on something after being chased by I don't know what.

**You:** Chased? By who?

**Mike:** Or by what? I don't know. I'll be going now. I will go home before sundown.

**You:** Okay… take care. And if you see something out of place, let me know.

**Mike:** Sure, bye.

**[Button: Night Time]**

**You:** Mike? What happened to your face?

**Mike?:** Oh this? It's nothing. Can I stay here for a while? I promise I won't be a bother.

**[Choice]**
- **No, it is late, you should go home.** → `+1 Point`
- **Uh… sure. you can sit there.** → `-1 Point`

### If "No" (+1)

**Mike?:** Please, I need to call my parents to get me here.

**[Button: Get out of here or I will kill you.]**  
*(Mike(?) leaves)*

### If "Yes" (-1)

**Mike?:** Thank you!

**You:** You don't look okay. Are you really Mike?

**Mike?:** …

Who seemed like Mike turns into a skinwalker.

> You passed out.

**[Button: Next Day]**

---

## Day 3 (3 Points)

### If you let skinwalker in last night:

You woke up in the tent. You feel alright physically, but you feel that something weird happened last night.

> What happened last night? I can't shake the feeling that something strange is going on. I should stay alert.

### If you didn't let skinwalker in last night:

It was hard falling asleep last night. Was that really Mike last night? I can't shake the feeling that something strange is going on. I should stay alert.

**Radio:**  
It's misty in Forester Hills. The air is crisp and cold for a walk in the forest. Attention everyone, we have a public service announcement. Please refrain from going to the forest. We received a report of disappearances and sightings of… [static noise]. If you see something, say something. And with that, have a good day, folks!

**You:** Sightings… of what?

**Visitor:** Hey, you're the new sheriff in town?

**You:** Yes ma'am, anything you need?

**Visitor:** I'm Isabel, and I need help. My friend Ara disappeared in the woods. Can you help me find her?

**You:** I can't leave my post right now. But the townspeople will organize a search party. I hope we find her soon. If I hear more, I'll let you know.

**Isabel:** Sigh, okay. Can I stay here a bit to rest? I've been walking for hours.

**[Choice]**
- **Sure, you can stay here.** → `+2 Points`
- **I'm sorry, we're not accepting visitors right now.** → `-1 Point`

### If "Yes" (+2)

**Isabel:** Thanks. I won't be here long.

**You:** Take your time.

After resting for a bit, she seemed to regain her strength.

**Isabel:** Ara said something that disturbed me the last time I saw her.

**You:** What about it?

**Isabel:** She said something about seeing strange human-like figures at night, but she knows they're not human. She loves going to the forest at night, and even after seeing those figures, it didn't scare her. She even tries looking for them and studying their features. She said the figures may be taller than the tallest person in town, present weird features like scaly skin, weird face.

**You:** What?

**Isabel:** Oh no, I don't mean to scare you. But be careful, and if you see "people" like that, don't let them near you.

**You:** Thank you for the information. I'll take note of what you said.

**Isabel:** Great. I'll be going now. Actually I might go home, I'm too tired to continue looking for her.

### If "No" (-1)

**Isabel:** Hmph, fine. I'll just find a place outside.

> Isabel is visibly angry.

**[Button: Night Time]**

**Isabel?:** Sheriff… Let me in.

**[Choice]**
- **No** → `+1 Point`
- **Yes** → `-2 Points`

#### If "No" (+1)

**Isabel?:** I don't feel so good. Let me rest here.

**[Button: You're one of them. Get out of here or I will kill you.]**  
*(Isabel(?) leaves)*

#### If "Yes" (-2)

**Isabel?:** Tha-ank… yo-ou… *hiss*

> You passed out.

**[Button: Next Day]**

---

## Day 4 (2 Points)

### If you let skinwalker in last night:

You woke up in the tent. You feel alright physically, but you feel that something sinister is going on.

> Was that… not Isabel? I should stay alert.

### If you didn't let skinwalker in last night:

I cannot sleep at all at this point. Did I just see what they meant by the sightings?

**Radio:**  
Sunny day in Forester Hills! PSA: Stay in town and limit going to the forest. We have received reports of sightings of human-like creatures that are not actually human. If you decide to go to the forest, exercise caution and ask for assistance in the sheriff's post. If you see something, say something. And with that, have a good day, folks!

**Visitor:** Good day, Sheriff. Oh, I forgot the sheriff had an accident. You must be new here. I'm Roy.

**You:** Good day, Roy. How may I help you?

**Roy:** I'm with the search party, and I came here to talk about the girl who disappeared, Ara. I hope you have information that might help us look for her.

**You:** I can't really leave my post, so I couldn't look around. But yesterday her friend, Isabel, went here and told me about what Ara found about the sightings.

**Roy:** Oh? Would you tell us about it?

**You:** For sure. Be on the lookout for people who looks like people. They might be taller than a normal person, or have a scaly skin or a face that doesn't look right.

**Roy:** Oh, we already knew that. In fact, we have more information about the sightings. They come out at night. They make weird noises like hissing and screeching. Hmm, what else… Anyways, I'll get going and look for more clues. I hope we find her soon.

**You:** Yes, I hope we find her soon. If you have more information, you know where to find me. I'll pass them on to the next person.

**[Button: Night Time]**

**Visitor?:** Let… me… in…

**You:** Who… what… are you?

**Visitor?:** *Smile* I won't… hurt you…

**[Button: Kill entity]** → `+2 Points`

---

## Day 5 (10 Points)

> You cannot sleep at all last night. You cannot believe what you saw.

**Radio:**  
ALERT! ALERT! We have received reports of entities in the forest. DO NOT GO INTO THE FOREST. If you are stuck in the forest, report to the sheriff immediately and seek shelter.

> **[HIGH INTENSITY OF VISITORS]**

**[Night Time]**

- **Visitor (Human):** Sheriff, thank the Lord I found you! Let me stay here.
- **Visitor (Entity):** Let… me… in…
- **Visitor (Human - false negative):** Howdy sheriff, can I stay here for tonight?
- **Visitor (Entity - false positive):** It's cold tonight, please let me stay here.
- **Visitor (Human - bruised):** Sheriff, please I don't want them to chase me anymore!

### Player Options:

| Option | Human | Entity | Points |
|--------|-------|--------|--------|
| **Option 1: Stay here and be safe.** | +2 | -2 | — |
| **Option 2: Get out or I'll kill you.** | -1 | +1 | — |
| **Option 3: Kill.** | -2 | +2 | — |

---

## Day 6 — Epilogue

### Good Ending (13–16 Points)

> You provided shelter to the hikers and protected them from the entities. Are they gone for good, or are they preparing for something?

### Neutral Ending (7–12 Points)

> You provided shelter to the hikers, but they are not safe yet. The entities can still be sighted at night.

### Bad Ending (0–6 Points)

> You failed to protect the hikers. More entities have appeared and are seemingly more active, even at daytime.
