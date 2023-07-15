# show-emote

Simple !showemote command for Twitch with some extra features.  
**Newly added emotes can't be shown until scene is refreshed or `!reloademotes` is used.**

### Config

```
https://showemote.igor.ovh/?channel=igor_ovh
    &showEmoteTime=4
    &showEmoteCooldown=60
    &multiShowEmoteCooldown=180
    &multiShowEmotesAmount=5
    &allowList=igor_ovh,igor
    &showEmoteSizeMultiplier=1.25
```

- `channel` - channel to which bot will connect (**just your channel name**),
- `showEmoteTime` - how much emote will stay on screen (in seconds),
- `showEmoteCooldown` - cooldown for command `!showemote` (in seconds),
- `multiShowEmoteCooldown` - cooldown for command `!multishowemote` (in seconds),
- `multiShowEmotesAmount` - maximum amount for emotes used in `!multishowemote` command,
- `allowList` - list of users (seperated by `,`), which will be allowed to use moderators command (without having moderator role) such as `!forceshowemote` (**moderator usernames do not have to be here, they will can use these commands anyway**),
- `showEmoteSizeMultiplier` - size multiplier for emote on screen.  
  You don't have to use every parameter, values shown there are deafult and if you dont use some paramater the default value will be used.  
  So the URL can be even this: `https://showemote.igor.ovh/?channel=igor_ovh&allowList=igor_ovh&showEmoteTime=5`

### Commands

Moderator commands will have an ★ after the name.

- `!showemote <emote>` - displays emote on screen,
- `!fshowemote` (★) - displays emote on screen without cooldown,
- `!mshowemote <emotes>` - display all of the emotes seperated by **space** (example: `!mshowemote emote1 emote2 emote3 emote4`)
- `!fmshowemote` (★) - display all of the emotes seperated by **space** (example: `!mshowemote emote1 emote2 emote3 emote4`) without cooldown,
- `!reloademotes` (★) - reload emotes cache (you should be using this after adding new emote).
