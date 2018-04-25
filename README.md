# Microservices

Things I wrote that do stuff. These are all run via [hook.io](https://hook.io/) on subpaths of `https://hook.io/geo1088`.

Parameters don't necessarily have to be defined via the routes. If a route parameter is optional, it can be set via the query string (`?param=value&otherparam=othervalue`) instead. Parameters which have no place in the route can *only* be defined in the query string.

---

## `/discord-badge(/:guildId(/:invite))`

Generates a Discord badge in SVG format via [shields.io](http://shields.io), which can be customized with an online user count and an invite link.

Note: This documentation refers to Discord servers as their internal name of "guild".

### Parameters

Parameter | Description | Default
---------:|:------------|:-------
`guildId` | The ID of a guild to get the online user count for. The guild must have its widget enabled, as this relies on the widget JSON API.
`invite` | An invite ID. People clicking the badge will be redirected to this URL. This is not the full URL; if you have an invite link like `discord.gg/JkasDjQ`, you would specify `JkasDjQ` for this parameter.
`left` | Custom text for the left side of the badge. Also see the next section for how to include guild statistics in this text.
`right` | Custom text for the right side of the badge. Also see the next section for how to include guild statistics in this text.
`style` | Sets the style of the badge. Can be any of the shields.io values: `flat`, `flat-square`, `plastic`, `social`, or `for-the-badge`. If nothing is passed, nothing is passed to shields.io, which means whatever their default is will be used.
`color` | Sets the background color for the badge's right side. Can be set as a raw hex color (no `#` prefix) or one of the shields.io names defined [here](https://github.com/badges/shields/blob/master/colorscheme.json). The default value is `7289DA`, Discord's brand color.

### Tokens for `left`, `right`

If the left or right text includes any of these tokens, they will be replaced with a piece of information about the guild as long as the provided `guildId` is correct and the server in question has its widget enabled.

Token | Substituted value
-----:|:-----------------
`{members}` or `{}` | The number of online members of the guild.
`{name}` | The name of the guild.
`{channels}` | The number of public voice channels in the guild.

### Examples

- `https://hook.io/geo1088/discord-badge`  
  A basic badge.  
  ![Example 1](https://hook.io/geo1088/discord-badge)

- `https://hook.io/geo1088/discord-badge/136501988941758464/JkasDjQ`  
  A badge that displays a server's online count and is linked to an invite.  
  ![Example 2](https://hook.io/geo1088/discord-badge/136501988941758464/JkasDjQ)

- `https://hook.io/geo1088/discord-badge?left=nerd%20chat&right=join%20us&color=orange`  
  A badge that displays custom text and a custom color.  
  ![Example 3](https://hook.io/geo1088/discord-badge?left=nerd%20chat&right=join%20us&color=orange)

- `https://hook.io/geo1088/discord-badge/81384788765712384/discord-api?style=flat-square&left=api%20chat`  
  A badge for the Discord API server with a custom style and invite. (The Discord API server has a custom invite URL of discord.gg/discord-api).  
  ![Example 4](https://hook.io/geo1088/discord-badge/81384788765712384/discord-api?style=flat-square&left=api%20chat)

- `https://hook.io/geo1088/discord-badge/81384788765712384?left={name}&right={members}%20talking`  
  A badge which uses the tokens to substitute the server's name and online count on the left and right side.  
  ![Example 5](https://hook.io/geo1088/discord-badge/81384788765712384?left={name}&right={members}%20talking)

---

## `/silly-cc-badge/:user/:repo`

Generates a silly CodeClimate badge with a phrase based on the GPA of the given repository. Optionally includes the numeric GPA as well.

### Parameters

Parameter | Description
---------:|:-----------
`user` | The case-sensitive username of the repository owner according to Code Climate. If the repository has switched owners or the owher has changed their username since the repo was added to Code Climate, this value may not be the same as the owner's GitHub name.
`repo` | The case-sensitive name of the repository according to CodeClimate. Again, if the repository has been renamed since being added, this may not be the GitHub name.
`showgpa` | If this is set to any value, the repo's GPA will be shown in parentheses after the phrase in the badge.
`style` | Sets the style of the badge. Can be any of the shields.io values: `flat`, `flat-square`, `plastic`, `social`, or `for-the-badge`. If nothing is passed, nothing is passed to shields.io, which means whatever their default is will be used.

### Examples

- https://hook.io/geo1088/silly-cc-badge/sferik/rails_admin  
  A basic badge that only shows the silly text.

- https://hook.io/geo1088/silly-cc-badge/codeclimate/codeclimate?showgpa=1&style=flat-square  
  A badge in the `flat-square` style that also includes the repository's actual GPA.
  
