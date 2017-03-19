# Microservices

Things I wrote that do stuff. These are all hosted on [hook.io](https://hook.io/) and can be accessed as subpaths of `https://hook.io/geo1088`.

In the parameter lists, if a parameter isn't seen in the route, it can be used via query string instead. (`?param=value&otherparam=othervalue`)

## [`/discord-badge(/:guildId(/:invite))`](https://hook.io/geo1088/discord-badge)

Generates a Discord badge via [shields.io](http://shields.io), which can be customized with an online user count.

Parameter | Description
---------:|:-----------
`guildId` | The ID of a guild to get the online user count for. The guild must have its widget enabled, as this relies on the widget JSON API.
`invite` | An invite ID to use as a link on the badge. This is not the full URL; if you have an invite link like `discord.gg/JkasDjQ`, you would specify `JkasDjQ` for this parameter. This uses the `xlink` SVG 
`left` | Custom text for the left side of the badge. If `guildId` points to a valid guild, any instance of `{}` will be replaced with the online guild member count.
`right` | Custom text for the right side of the badge. If `guildId` points to a valid guild, any instance of `{}` will be replaced with the online guild member count.
`style` | Sets the style of the badge. Can be any of the shields.io values: `flat` (default), `flat-square`, `plastic`, or `social`.
`color` | Sets the background color for the badge's right side. Can be set as a raw hex color (`00FF6B`) or one of the shields.io names defined [here](https://github.com/badges/shields/blob/master/colorscheme.json).


## [`/silly-cc-badge/:user/:repo`](http://hook.io/geo1088/silly-cc-badge/sferik/rails_admin)

Generates a silly CodeClimate badge with a phrase based on the GPA of the given repository. Oprionally includes the numeric GPA as well.

Parameter | Description
---------:|:-----------
`user` | The case-sensitive username of the repository owner according to Code Climate. If the repository has switched owners or the owher has changed their username since the repo was added to Code Climate, this value may not be the same as the owner's GitHub name.
`repo` | The case-sensitive name of the repository according to CodeClimate. Again, if the repository has been renamed since being added, this may not be the GitHub name.
`showgpa` | If this is set to any value, the repo's GPA will be shown in parentheses after the phrase in the badge.
`style` | Sets the style of the badge. Can be any of the shields.io values: `flat` (default), `flat-square`, `plastic`, or `social`.
