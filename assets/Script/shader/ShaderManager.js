import ShaderLab from "./ShaderLab";
import ShaderMaterial from "./ShaderMaterial";

export const ShaderType = cc.Enum({
    Default : 0,
    Gray:1,
    GrayScaling : 100,
    Stone:101,
    Ice:102,
    Frozen:103,
    Mirror:104,
    Poison:105,
    Banish:106,
    Vanish:107,
    Invisible:108,
    Blur:109,
    GaussBlur:110,
    Dissolve:111,
    Fluxay:112,
    FluxaySuper:113,
});
const ShaderName = {
    '0':'Default',
    '1':'Gray',
    '100':'GrayScaling',
    '101':'Stone',
    '102':'Ice',
    '103':'Frozen',
    '104':'Mirror',
    '105':'Poison',
    '106':'Banish',
    '107':'Vanish',
    '108':'Invisible',
    '109':'Blur',
    '110':'GaussBlur',
    '111':'Dissolve',
    '112':'Fluxay',
    '113':'FluxaySuper',
}

export const ShaderManager = cc.Class({
    statics: {
        useShader(sprite, shader){
            if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
                console.warn('Shader not surpport for canvas');
                return;
            }
            if (!sprite || !sprite.spriteFrame || sprite.getState() === shader) {
                return;
            }
            if (shader > ShaderType.Gray) {
                let name = ShaderName[shader];
                let lab = ShaderLab[name];
                if (!lab) {
                    console.warn('Shader not defined', name);
                    return;
                }
                cc.dynamicAtlasManager.enabled = false;
                let material = new ShaderMaterial().create(name, lab.vert, lab.frag, lab.defines || []);
                let texture = sprite.spriteFrame.getTexture();
                material.setTexture(texture);
                material.updateHash();
                let sp = sprite;
                sp._material = material;
                sp._renderData._material = material;
                sp._state = shader;
                return material;
            }
            else {
                sprite.setState(shader);
            }
        },
    }
});

