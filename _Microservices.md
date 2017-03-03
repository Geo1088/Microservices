# Microservices

Things I wrote that do stuff. These are all hosted on [hook.io](https://hook.io/) and can be .

In the parameter lists, if a parameter isn't seen in the route, it is used via query string (`?params=value&otherparam=othervalue`).

## [`/discord-badge(/:guildId(/:invite))`](https://hook.io/geo1088/discord-badge)

Generates a Discord badge via [shields.io](http://shields.io), which can be customized with an online user count.

Parameter | Description
---------:|:-----------
`guildId` | The ID of a guild to get the online user count for. The guild must have its widget enabled, as this relies on the widget JSON API.
`invite` | An invite ID to use as a link on the badge. This is not the full URL; if you have an invite link like `discord.gg/JkasDjQ`, you would specify `JkasDjQ` for this parameter.
`left` | Custom text for the left side of the badge. If `guildId` points to a valid guild, any instance of `{}` will be replaced with the online guild member count.
`right` | Custom text for the right side of the badge. If `guildId` points to a valid guild, any instance of `{}` will be replaced with the online guild member count.
`style` | Sets the style of the badge. Can be one of the shields.io values `flat` (default), `flat-square`, or `plastic`.
`color` | Sets the background color for the badge's right side. Can be set as a raw hex color (`00FF6B`) or one of the shields.io names.
