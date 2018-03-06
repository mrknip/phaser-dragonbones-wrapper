##Simple Phaser DragonBones wrapper

This does nothing exciting - it's just a wrapper to make loading, adding and playing DragonBones animations syntactically nicer.

###Usage
You need the [DragonBonesJS runtime](https://github.com/DragonBones/DragonBonesJS)

Add this plugin: `yarn add -D {{GIT REPO LINK}}`

In boot state:
Load dragonbones runtime in preload: `this.game.load.script('dragonbonesJs', 'vendor/dragonBones.js')`
Import plugin: `import PhaserDragonbonesWrapperPlugin from 'phaser-dragonbones-wrapper'`
Add plugin in create: `  this.game.add.plugin(PhaserDragonbonesWrapperPlugin)`

And you're away.

To load: `this.game.load.dragonbones(PATH_TO_FOLDER, DRAGONBONES_KEY)`
(Dragonbones needs three files in the same folder: {DRAGONBONES_KEY}_tex.json, {DRAGONBONES_KEY}_tex.png and {DRAGONBONES_KEY_ske.json)

To set a state to use dragonbones animations: `this.game.plugins.dragonbones.active = true`

To make/add: `const dragonbonesAnimation = this.game.make.dragonbones(DRAGONBONES_ANIMATION_NAME)`

To play (am yet to wrap!): `dragonbonesTestSprite.animation.gotoAndPlayByProgress(ANIMATION_NAME)`
