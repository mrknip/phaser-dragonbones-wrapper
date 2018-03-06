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
        type: "json",
        key: name + '_ske',
        url: path + name + "_ske.json"
      },
      {
        type: "json",
        key: name + '_tex',
        url: path + name + "_tex.json"
      },
      {
        type: "image",
        key: name + '_tex',
        url: path + name + "_tex.png"
      }
    ]
  };

  game.load.pack(packName, null, JSON.stringify(pack), this);

  game.load.onLoadComplete.add(() => {
    const dbFactory = dragonBones.PhaserFactory.factory;
    dbFactory.parseDragonBonesData(game.cache.getJSON(name + "_ske"));
    dbFactory.parseTextureAtlasData(
       game.cache.getJSON(name + "_tex"),
       (game.cache.getImage(name + "_tex", true)).base
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
    }

    Phaser.GameObjectCreator.prototype.dragonbones = (key, armatureName = "Armature") => {
      const dbFactory = dragonBones.PhaserFactory.factory;
      return dragonBones.PhaserFactory.factory.buildArmatureDisplay(armatureName, key);
    }

    Phaser.GameObjectFactory.prototype.dragonbones = (key, armatureName = "Armature") => {
      return this.game.world.add(dragonBones.PhaserFactory.factory.buildArmatureDisplay(armatureName, key));
    }
  }

  update () {
    dragonBones.PhaserFactory.factory.dragonBones.advanceTime(-1.0); // TODO: delta time needed?!
  }
}
