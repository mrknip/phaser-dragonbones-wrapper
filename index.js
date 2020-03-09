/**
 * Loads three files for dragonbones armature.  All in the same folder, and needs one skeleton file (NAME_ske.json)
 * and two texture files (NAME_tex.json and .png).  Will be given the key NAME
 * @param  {string} path
 * @param  {string} name
 */
function loadDragonbonesArmature (game, path, name) {
  const packName = `${name}`+'dragonbonesData';
  const pack = {
    [packName]: [
      {
        type: 'json',
        key: name + '_ske',
        url: path + name + '_ske.json'
      },
      {
        type: 'json',
        key: name + '_tex',
        url: path + name + '_tex.json'
      },
      {
        type: 'image',
        key: name + '_tex',
        url: path + name + '_tex.png'
      }
    ]
  };

  game.load.pack(packName, null, JSON.stringify(pack), this);

  game.load.onLoadComplete.add(() => {
    const dbFactory = dragonBones.PhaserFactory.factory;
    dbFactory.parseDragonBonesData(game.cache.getJSON(name + '_ske'));
    dbFactory.parseTextureAtlasData(
      game.cache.getJSON(name + '_tex'),
      (game.cache.getImage(name + '_tex', true)).base
    );
  });
}


export default class PhaserDragonbonesWrapperPlugin extends Phaser.Plugin {
  constructor (game, parent) {
    super(game, parent);

    this.game.plugins.dragonbones = this;

    dragonBones.PhaserFactory.init(this.game);

    Phaser.Loader.prototype.dragonbones = (path, name) => {
      loadDragonbonesArmature(this.game, path, name);
    };

    Phaser.GameObjectCreator.prototype.dragonbones = (key, armatureName = 'Armature') => {
      const dbFactory = dragonBones.PhaserFactory.factory;
      const armature = dbFactory.buildArmatureDisplay(armatureName, key);

      armature.onAnimationComplete = ((handler, context) => {
        armature.addEvent(dragonBones.EventObject.COMPLETE, () => {
          handler.call(context);
        });
      });

      /**
       * For changing texture on a given slot
       */
      armature.updateSlotDisplay = (slotName, newSlotTextureName, displayIndex) => {
        dragonBones.PhaserFactory.factory.replaceSlotDisplay(
          key,
          armatureName,
          slotName,
          newSlotTextureName,
          armature._armature.getSlot(slotName),
          displayIndex,
        );

        armature._armature.getSlot(slotName).invalidUpdate(); // To force rerender in case changing back to default display
      };

      return armature;
    };

    Phaser.GameObjectFactory.prototype.dragonbones = (key, armatureName = 'Armature') => {
      const dbFactory = dragonBones.PhaserFactory.factory;
      const armature = dbFactory.buildArmatureDisplay(armatureName, key);

      return this.game.world.add(armature);
    };
  }

  update () {
    dragonBones.PhaserFactory.factory.dragonBones.advanceTime(-1.0); // TODO: delta time needed?!
  }

}
