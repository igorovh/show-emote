# show-emote

Simple !showemote command for Twitch with some extra features.  
**Newly added emotes can't be shown until scene is refreshed or `!reloademotes` is used.**

### Config

```
https://showemote.igor.ovh/?channel=igor_ovh
    &service=twitch
    &showEmoteTime=4
    &showEmoteCooldown=60
    &multiShowEmoteCooldown=180
    &multiShowEmotesAmount=5
    &allowList=igor_ovh,igor
    &showEmoteSizeMultiplier=1.25
```

- `channel` - channel to which bot will connect (**just your channel name**),
- `service` - service which script will be using (`twitch` or `kick`),
- `showEmoteTime` - how much emote will stay on screen (in seconds),
- `showEmoteCooldown` - cooldown for command `!showemote` (in seconds),
- `multiShowEmoteCooldown` - cooldown for command `!multishowemote` (in seconds),
- `multiShowEmotesAmount` - maximum amount for emotes used in `!multishowemote` command,
- `allowList` - list of users (seperated by `,`), which will be allowed to use moderators command (without having moderator role) such as `!forceshowemote` (**moderator usernames do not have to be here, they will can use these commands anyway**),
- `showEmoteSizeMultiplier` - size multiplier for emote on screen.

You don't have to use every parameter, values shown there are deafult and if you dont use some paramater the default value will be used.  
So the URL can be even this: `https://showemote.igor.ovh/?channel=igor_ovh&allowList=igor_ovh&showEmoteTime=5&service=kick`

### Commands

Moderator commands will have an ★ after the name.

- `!showemote <emote>` - displays emote on screen,
- `!fshowemote` (★) - displays emote on screen without cooldown,
- `!mshowemote <emotes>` - display all of the emotes seperated by **space** (example: `!mshowemote emote1 emote2 emote3 emote4`)
- `!fmshowemote` (★) - display all of the emotes seperated by **space** without cooldown,
- `!reloademotes` (★) - reload emotes cache (you should be using this after adding new emote).

### Work in progress

- Script for StreamElement overlay,
- `!dvd <emote>` command.
- Fix `!fmshowemote` on Kick (idk why it sometimes doesn't work)

### Building / Development

Add latest version of [tmi.js](https://tmijs.com/) as `src/js/twitch/tmi.js`.
